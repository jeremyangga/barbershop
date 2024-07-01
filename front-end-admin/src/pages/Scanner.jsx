import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2';
import {Scanner} from '@yudiel/react-qr-scanner';
import axios from '../config/instance';
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
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() =>{
        console.log("-->", dataFromDB);
        let result = dataFromDB.map((el) => {
           if(el?.name === scannedResult){
                return{...el, isArrive: true};
           }
           return el;
        });
        console.log(result, '<--result');
        
    }, [scannedResult])
    return(
        <>
            <Navbar/>
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <Scanner onScan={(result) => setScannedResult(result[0].rawValue)}></Scanner>
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