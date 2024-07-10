if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const User = require("./models/user");
  const { compare } = require("./helper/bcrypt");
  const { createToken } = require("./helper/jwt");
  const { connect, getDb,db } = require("./config/mongodb");
  const uuid = require('crypto').randomUUID();
  const cloudinary = require('cloudinary').v2;
  const multer = require('multer');
const { ObjectId } = require('mongodb');
  const storage = multer.memoryStorage();
  const upload = multer({storage});

  cloudinary.config({ 
    cloud_name: 'dfz1fzk5q', 
    api_key: '116195383148784', 
    api_secret: 'olQsHLIgXIxXWfUndfvej_JDw0c'
  });

  app.use(cors());
  // body parser
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  const DATABASENAME = "final_project";
  let database;
  app.post("/login", async (req, res) => {
      console.log('nyampek gan');
      const { email, password } = req.body;
      console.log(email, '<--');
      const findUser = await User.findEmail(email);
      if (!findUser) {
        throw new Error("user not found");
      }
      const compared = compare(password, findUser.password);
      if (!compared) {
        throw new Error("not auhtorized");
      }
      const access_token = createToken({
        userId: findUser._id,
      });
  
      res.status(200).json({access_token});
  });
  
  app.post('/payment-status', async(req, res) =>{
    const {invoiceId} = req.body;
    console.log(invoiceId);
    try {
      const filter = { invoice: invoiceId };
      const update = { $set: { status: 'paid' } };
      const result = await getDb().collection("history").updateOne(filter, update);
      res.status(200).json({'success': 'success update'})
    } catch (error) {
      res.status(400).json({'error': 'failed to update status'})
    }
  })

  app.post('/payment', async(req, res) =>{
      const {invoiceId, price, name} = req.body;
      // console.log(invoiceId, price, '<--- body');
        /*Install midtrans-client (https://github.com/Midtrans/midtrans-nodejs-client) NPM package.
      npm install --save midtrans-client*/
      // console.log(process.env.MIDTRANS_SERVER_KEY, '<--server');
      //SAMPLE REQUEST START HERE
  
      const midtransClient = require('midtrans-client');
      // Create Snap API instance
      let snap = new midtransClient.Snap({
              // Set to true if you want Production Environment (accept real transaction).
              isProduction : false,
              serverKey : process.env.MIDTRANS_SERVER_KEY
          });
  
      let parameter = {
          "transaction_details": {
              "order_id": invoiceId,
              "gross_amount": price
          },
          "credit_card":{
              "secure" : true
          },
          "customer_details": {
              "first_name": name,
              "email": "budi.pra@example.com",
          }
      };
  
      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken);
      res.status(200).json(midtransToken);
      
  });
  connect();
  app.listen(3000, () => console.log("halooo express running"));
  let dbConnect = getDb();
  app.get('/api/barbershop', async (req, res)=>{
    try {
      // console.log(await dbConnect.collection("barbershop").find({}).toArray);
        let barbershops = await dbConnect.collection("barbershop").find({}).toArray();
        res.status(200).json(barbershops);
    } catch (error) {
      console.log("An error occurred pulling the records. " + error);
    }
  })

  app.post('/api/barbershop',upload.single('file'), async (req, res)=>{
    try {
      // console.log(await dbConnect.collection("barbershop").find({}).toArray);
      const base64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const uploadedFile = await cloudinary.uploader.upload(dataURI, {
        folder: "skripsi/images",
        public_id: `${req.file.originalname}-${uuid}`
      });
      console.log(uploadedFile.secure_url, "<__")
      const { name, alamat, price } = req.body;
      let queue = 0;
      let services = [{
        service: "Haircut",
        price: 100_000
      }];
      let changeToJSON = {
        name,
        alamat,
        image: uploadedFile.secure_url,
        price,
        queue,
        services
      }
      // let bodyJSON = JSON.parse(changeToJSON); 
      console.log(changeToJSON);
        let barbershops = await dbConnect.collection("barbershop").insertOne(changeToJSON);
        res.status(200).json(barbershops);
    } catch (error) {
      console.log("An error occurred pulling the records. " + error);
    }
  })

  app.put('/api/history', async(req, res)=>{
    const { id, status } = req.body;
    console.log(id,'<--id', status, )
    let history = await dbConnect.collection("history").updateOne({_id: new ObjectId(id)}, {$set: {status}});
    let updated = await dbConnect.collection("history").findOne({_id: new ObjectId(id)});
    console.log(history);
    res.status(200).json(updated);
  })

  app.get('/api/history/:name', async(req, res)=>{
    const {name} = req.params.name;
    console.log(name,'antrian')
    let antrian = await dbConnect.collection("history").find({}, {name:  /.*GoodFellas Barbershop Klampis*/}).toArray();
    console.log(antrian,"<--antrian");
    res.status(200).json(antrian);
  })
  app.get('/api/allhistory', async(req, res)=>{
    // const {name} = req.body;
    // console.log(name,'antrian')
    let antrian = await dbConnect.collection("history").find({}).toArray();
    console.log(antrian,"<--antrian");
    res.status(200).json(antrian);
  })
  