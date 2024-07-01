import { useEffect, useState } from 'react'
import './App.css'
import SuccessLogo from './SuccessLogo'
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import FailedLogo from './FailedLogo';
import axios from 'axios';
function App() {  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');
  const transaction_status = queryParams.get('transaction_status');
  // console.log(searchParams, '<--'); // 
  const updateStatus = async () =>{
    try {
      await axios.post('http://localhost:3000/payment-status',{invoiceId: orderId});
    } catch (error) {
      console.log(error);
    }
  }
  console.log(orderId, '<-- order id', transaction_status);
  updateStatus();
  return (
    <>
      <div className="payment-success-container">
      <div className="payment-success-content">
        {transaction_status !== 'capture' ? <FailedLogo/> : <SuccessLogo/>}
        <h1>Payment {transaction_status !== 'capture' ? "Failed" : "Successful!"}</h1>
        {transaction_status !== 'capture' ? <p>Unfortunately your transaction is failed, please try again.</p> : <p>Thank you for your payment. Your transaction was successful.</p>}
        {transaction_status !== 'capture' ?'': orderId && 
        <>
          <p>Order ID: {orderId}</p>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "80%", width: "80%" }}
            value={orderId}
            viewBox={`0 0 256 256`}
            />
          <p>Show the QR Code to the Front Office</p>
        </>}
        {/* You can add more information or actions based on your requirements */}
      </div>
    </div>
    </>
  )
}

export default App
