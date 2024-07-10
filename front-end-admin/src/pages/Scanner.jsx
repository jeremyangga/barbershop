import { useEffect, useRef, useState } from "react";
// import Navbar from "../components/Navbar";
import Swal from 'sweetalert2';
import {Scanner} from '@yudiel/react-qr-scanner';
import axios from '../config/instance';
// import Navbar from "../components/navbar";
function QRScanning() {
    const [scannedResult, setScannedResult] = useState("");
    const [dataFromDB, setDataFromDB] = useState([]);
    async function fetchData(){
        const {data} = await axios.get("/users");
        setDataFromDB(data);
        console.log(data, '<--data');
    }
    // async function changeStatusOnArrive(status) {
    //     await axios.post()
    // }
    // console.log(data, '<--data');
    // useEffect(() => {
    //     fetchData();
    // }, []);
    // useEffect(() =>{
    //     console.log("-->", dataFromDB);
    //     let result = dataFromDB.map((el) => {
    //        if(el?.name === scannedResult){
    //             return{...el, isArrive: true};
    //        }
    //        return el;
    //     });
    //     console.log(result, '<--result');
        
    // }, [scannedResult]);

    async function handleScan(result){
      setScannedResult(result[0].rawValue);
      let id = result[0].rawValue.toString();
      console.log(id,">id")
      let {data} = await axios.put('/api/history',{
        id: id,
        status: 'cutting hair'
      });
      console.log(data, '<-- data');
      Swal.fire({
        title: "Success Scan",
        html: `<p>Customer: ${data.orderBy}</p> <p>Barbershop: ${data.name} </p> <p>Di tanggal: ${data.date} </p> `,
        icon: "success"
      }).then(function(result){
        if(result.value){
            window.location = '/';
        }
      });
    }
    return(
        <>
            {/* <Navbar/> */}
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <Scanner onScan={handleScan}></Scanner>
            </div>
            {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
        </>
    )
}

export default QRScanning;