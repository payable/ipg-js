import React, { useState } from 'react';
import payable from '@payable/ipg-js'

import logo from './logo.svg';
import './App.css';

function App() {

  const [logs, setLogs] = useState([]);

  const [notifyUrl, setNotifyUrl] = useState("https://yoursite.org/payment/notify");
  const [returnUrl, setReturnUrl] = useState("https://yoursite.org/payment/return");
  const [cancelUrl, setCancelUrl] = useState("https://yoursite.org/payment/cancel");

  const console = {
    log: (message) => {
      window.console.log(message);
      setLogs(prevState => [...prevState, message])
    }
  }

  payable.sandboxMode = true

  payable.onCompleted = function onCompleted(data) {
    console.log("Payment Process Completed");
  };

  payable.onDismissed = function onDismissed() {
    console.log("Payment Process Canceled");
  };

  payable.onError = function onError(error) {
    if (error.code === 3009) { // field validation error
      error.fields.forEach((field) => {
        console.log(field.error)
      });
    }
    if (error.code === 3008) {
      console.log(error.error)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input placeholder="notify_url" onChange={e => setNotifyUrl(e.target.value)} value={notifyUrl} type="text" />
        <input placeholder="return_url" onChange={e => setReturnUrl(e.target.value)} value={returnUrl} type="text" />
        <input placeholder="cancel_url" onChange={e => setCancelUrl(e.target.value)} value={cancelUrl} type="text" />
        <button onClick={callPayable}>TEST</button>
        <div className="logs">
          {logs.map((item, key) => {
            return <div key={key}>{key + 1}. {item}</div>;
          })}
        </div>
      </header>
    </div >
  );

  function callPayable() {

    console.log('callPayable')

    var payment = {
      cancel_url: cancelUrl,
      return_url: returnUrl,
      notify_url: notifyUrl,
      merchant_key: "D7XXXXXXXXX",               
      check_value: "C6FXXXXXXXXXXXXXXXXXXXXXX",
      amount: "59.91",
      invoice_id: "INVvw5EA0d1pH",            
      order_description: "Payment for ABC Fashion Shop",
      currency_code: "LKR",
      custom_1: "customYuDSFk5Z1O",
      custom_2: "test2",
      customer_email: "testmail@gmail.com",
      customer_first_name: "Shakthi",
      customer_last_name: "Elon",
      customer_mobile_phone: "07XXXXXXXX",
      customer_phone: "07XXXXXXXX",
      billing_address_city: "Vavuniya",
      billing_address_company: "Pay Shop",
      billing_address_country: "LKA",
      billing_address_postcode: "43000",
      billing_address_province: "North Province",
      billing_address_street: "154",
      billing_address_street2: "Koomankulam", 
      shipping_address_city: "Colombo",
      shipping_address_company: "Payable",
      shipping_address_country: "LKA",
      shipping_address_postcode: "43000",
      shipping_address_province: "western province",
      shipping_address_street: "Main street",
      shipping_address_street2: "Temple road",
      shipping_contact_email: "testshipmail@gmail.com",
      shipping_contact_first_name: "Kumaran",
      shipping_contact_last_name: "Test Lastname",
      shipping_contact_mobile: "07XXXXXXXX",
      shipping_contact_phone: "07XXXXXXXX"
    };

    payable.startPayment(payment);
  }
}

export default App;
