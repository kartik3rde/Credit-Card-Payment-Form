import React, { Component } from "react";
import PaymentCard from "./PaymentCard";
import ShowOnCard from "./ShowOnCard"        
export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDetails:  {
        name      :'kartik sharma',
        cardNumber:'6011 0009 9013 9424',
        expDate   :'10/22',
        cvvNo     : '1234'
      },
     };
  }
 
  cardResponse = (response) =>{
   console.log({response});
  }
     
  render() {
    const {cardDetails} = this.state;
    return (
      <div>
        <PaymentCard 
        cvvOnCard={cardDetails.cvvNo} 
        expDateOnCard={cardDetails.expDate} 
        numberOnCard={cardDetails.cardNumber} 
        nameOnCard={cardDetails.name} 
        cardResponse={(response)=>this.cardResponse(response)}/>
        <ShowOnCard 
         cvvOnCard={cardDetails.cvvNo} 
         expDateOnCard={cardDetails.expDate} 
         numberOnCard={cardDetails.cardNumber} 
         nameOnCard={cardDetails.name} 
          />
      </div>
    );
  }
}
