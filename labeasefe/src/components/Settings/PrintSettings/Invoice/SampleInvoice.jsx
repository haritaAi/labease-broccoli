import React from 'react';


const invoice = 
    {
        "_id": {
          "$oid": "61aaf9dee3cee3db4def42ff"
        },
        "invoiceNo": "000003",
        "invoiceDate": {
          "$date": "2021-12-04T05:16:06.909Z"
        },
        "clientId": {
          "$oid": "617a85dd1274d67741c1136d"
        },
        "client": " pankaj pansara",
        "ordersList": [
          "619232586d5a38ba095315f5",
          "61aaf6dfe3cee3db4def42ef"
        ],
        "amount": 8200,
        "dueDate": {
          "$date": "2021-12-04T05:16:06.909Z"
        },
        "paid": 5000,
        "balance": 3000,
        "cancelled": false,
        "createdAt": {
          "$date": "2021-12-04T05:17:18.357Z"
        },
        "updatedAt": {
          "$date": "2021-12-07T13:42:08.407Z"
        },
        "__v": 0,
        "adjustmentNo": "000001",
        "discount": 200
      }

const sampleInvoice  = {
    _id: "61aaf9dee3cee3db4def42ff",
    invoiceNo : "000003",
    invoiceDate :"2021-12-04T05:16:06.909Z",
    clientId : "617a85dd1274d67741c1136d",
      client : " pankaj pansara",
      ordersList: [
        "619232586d5a38ba095315f5",
        "61aaf6dfe3cee3db4def42ef"
      ],
      amount: 8200,
      dueDate : "2021-12-04T05:16:06.909Z",
      paid: 5000,
      balance: 3000,
      cancelled : false,      
      adjustmentNo: "000001",
      discount: 200
}

const sampleClient = {
    _id:"617a85dd1274d67741c1136d",
    name:"pankaj pansara",
    salutation:"Mr.",
    contactPerson:"nljnnlj",
    code:"",
    emailPrimary:"panka@gmail.com",
    emailSecondary:"",
    phoneO:845646797,
    phoneM:155484545135,
    phoneR:2254864864,
    address1:"njkhf",
    address2:"ndjefe",
    area:"bay",
    city:"goa",
    state:"MAHARASHTRA",
    pincode:798754,
    emailOption:false,
    smsOption:true,
    deliveryMethod:"Delivery Boy",
    route:"",
    priceBand:"",
    billTo:"",
    gstin:"",
    creditLimit:0,
    taxEx:false,
    isLab:false,
    paymentTerms:null,
    notes:"",
    category:"",
    workHours:"jhsuka",
    acmanager:"Jayesh Jain",
    dcireg:"87845465",
    regDate:"2021-10-27T18:30:00.000Z",
    balance:8488,
    drcr:false,
    addDoc:[],
    address:[]
}

function SampleInvoice(props) {
    return (
        <div>
            
        </div>
    );
}

export default SampleInvoice;