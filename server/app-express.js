if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const User = require("./models/user");
  const { compare } = require("./helper/bcrypt");
  const { createToken } = require("./helper/jwt");
  const { connect, getDb } = require("./config/mongodb");
  
  app.use(cors());
  // body parser
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  
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
              serverKey : "SB-Mid-server-w-BCDzqekheFZgd7PLO5Kqcp"
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
  