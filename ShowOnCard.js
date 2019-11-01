//paymentCard.js
import React, { Component } from "react";
import "./Paymnet.scss";
import { cardNameRegex, getCardDetails } from "./cardRegex";
import { formatCreditCardNumber, frantSvg } from "./paymentFun";

export default class ShowOnCard extends Component {
  constructor(props) {
    super(props);
    const { nameOnCard, numberOnCard, expDateOnCard, cvvOnCard } = this.props;
    this.state = {
      cardNumber: numberOnCard,
      cardName: nameOnCard,
      cardDate: expDateOnCard,
      cardCV: cvvOnCard,
      maskKey: "9999 9999 9999 9999",
      cardDesingInfo: {
        color: "grey",
        logo :''
      }
    };
  }
  componentDidMount() {
    const { cardNumber } = this.state;
    const formatObjectWithType = formatCreditCardNumber(cardNumber);
    const nValue =
      formatObjectWithType && formatObjectWithType.val
        ? formatObjectWithType.val
        : cardNumber;
    const nCardtype =
      formatObjectWithType && formatObjectWithType.type
        ? formatObjectWithType.type
        : "";
    const ncardName = cardNameRegex.find(e => e.cardtype === nCardtype);
    const mask =
      ncardName && ncardName.mask ? ncardName.mask : "9999 9999 9999 9999";
    const cardDesingInfo = getCardDetails(nCardtype);
    this.setState({
      maskKey: mask,
      cardNumber: nValue,
      cardDesingInfo
    });
  }

  svgfront = () => {
    const { cardNumber, cardName, cardDate, cardDesingInfo } = this.state;
    const color =
      cardDesingInfo && cardDesingInfo.color ? cardDesingInfo.color : "gray";
    return frantSvg(color, cardNumber, cardDate, cardName);
  };

  render() {
    const { cardDesingInfo } = this.state;
    const logo =
      cardDesingInfo && cardDesingInfo.logo ? cardDesingInfo.logo : "";
    return (
      <div>
          <div className="creditcard ">
            <div className="front">
              <div
                id="ccsingle"
                dangerouslySetInnerHTML={{ __html: logo }}
              ></div>
              <div dangerouslySetInnerHTML={{ __html: this.svgfront() }}></div>
            </div>
          </div>
        </div>
      
    );
  }
}
