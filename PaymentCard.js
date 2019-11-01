//paymentCard.js
import React, { Component } from "react";
import "./Paymnet.scss";
import InputMask from "react-input-mask";
import ReactCardFlip from "react-card-flip";
import { cardNameRegex, getCardDetails } from "./cardRegex";
import { formatCreditCardNumber, frantSvg, backSvg } from "./paymentFun";

export default class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: props.cardNumber,
      cardName: props.name,
      cardDate: props.expDate,
      cardCV: props.cvvNo,
      flip: false,
      cardtype: "",
      maskKey: "9999 9999 9999 9999",
      cardDesingInfo: {
        color: "grey"
      }
    };
  }
  componentDidMount() {
    const { nameOnCard, numberOnCard, expDateOnCard, cvvOnCard } = this.props;
    const formatObjectWithType = formatCreditCardNumber(numberOnCard);
    const nValue =
      formatObjectWithType && formatObjectWithType.val
        ? formatObjectWithType.val
        : numberOnCard;
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
      cardName: nameOnCard,
      cardDate: expDateOnCard,
      cardCV: cvvOnCard,
      cardDesingInfo
    });
  }
  onChangeVlaue(e) {
    const { name, value } = e.target;
    const { cardtype } = this.state;
    if (name === "cardNumber") {
      const formatObjectWithType = formatCreditCardNumber(value);
      const nValue =
        formatObjectWithType && formatObjectWithType.val
          ? formatObjectWithType.val
          : value;
      const nCardtype =
        formatObjectWithType && formatObjectWithType.type
          ? formatObjectWithType.type
          : cardtype;
      const ncardName = cardNameRegex.find(e => e.cardtype === nCardtype);
      const mask =
        ncardName && ncardName.mask ? ncardName.mask : "9999 9999 9999 9999";
      const cardDesingInfo = getCardDetails(nCardtype);
      this.setState({
        [name]: nValue,
        cardtype: nCardtype,
        flip: false,
        maskKey: mask,
        cardDesingInfo
      });
      this.props.cardResponse({
        cardNumber: this.state.cardNumber,
        cardName: this.state.cardName,
        cardDate: this.state.cardDate,
        cardCV: this.state.cardCV
      });
      return;
    }

    this.setState({
      [name]: value,
      cardtype
    });

    if (name === "cardCV") {
      this.setState({
        flip: true
      });
    } else {
      this.setState({
        flip: false
      });
    }

    this.props.cardResponse({
      cardNumber: this.state.cardNumber,
      cardName: this.state.cardName,
      cardDate: this.state.cardDate,
      cardCV: this.state.cardCV
    });
  }
  svgBack = () => {
    const { cardName, cardCV, cardDesingInfo } = this.state;
    const color =
      cardDesingInfo && cardDesingInfo.color ? cardDesingInfo.color : "gray";
    return backSvg(color, cardCV, cardName);
  };
  svgFrant = () => {
    const { cardNumber, cardName, cardDate, cardDesingInfo } = this.state;
    const color =
      cardDesingInfo && cardDesingInfo.color ? cardDesingInfo.color : "gray";
    return frantSvg(color, cardNumber, cardDate, cardName);
  };

  render() {
    const {
      cardNumber,
      cardName,
      cardCV,
      flip,
      maskKey,
      cardDesingInfo,
      cardDate
    } = this.state;
    const logo =
      cardDesingInfo && cardDesingInfo.logo ? cardDesingInfo.logo : "";
    return (
      <div>
        <div className="container preload">
          <div className="creditcard ">
            <ReactCardFlip
              flipSpeedBackToFront={1}
              flipSpeedFrontToBack={1}
              isFlipped={this.state.flip}
              flipDirection="horizontal"
            >
              <div
                className="front"
                key="front"
                onClick={() => {
                  this.setState({ flip: !flip });
                }}
              >
                <div
                  id="ccsingle"
                  dangerouslySetInnerHTML={{ __html: logo }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{ __html: this.svgFrant() }}
                ></div>
              </div>
              <div
                className="back"
                key="back"
                onClick={() => {
                  this.setState({ flip: !flip });
                }}
                dangerouslySetInnerHTML={{ __html: this.svgBack() }}
              ></div>
            </ReactCardFlip>
          </div>
        </div>
        <div className="form-container">
          <div className="field-container">
            <label for="name">Name</label>
            <input
              id="name"
              maxlength="20"
              type="text"
              value={cardName}
              name="cardName"
              onChange={e => this.onChangeVlaue(e)}
            />
          </div>
          <div className="field-container">
            <label for="cardnumber">Card Number</label>

            <InputMask
              mask={maskKey}
              id="cardnumber"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              value={cardNumber}
              name="cardNumber"
              maskChar=" "
              onChange={e => this.onChangeVlaue(e)}
            ></InputMask>
          </div>
          <div className="field-container">
            <label for="expirationdate">Expiration (mm/yy)</label>
            <InputMask
              mask="99/99"
              id="expirationdate"
              type="text"
              inputmode="numeric"
              name="cardDate"
              maskChar=" "
              value={cardDate}
              onChange={e => this.onChangeVlaue(e)}
            ></InputMask>
          </div>
          <div className="field-container">
            <label for="securitycode">Security Code</label>
            <InputMask
              mask="9999"
              id="securitycode"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              value={cardCV}
              name="cardCV"
              maskChar=" "
              onChange={e => this.onChangeVlaue(e)}
            ></InputMask>
          </div>
        </div>
      </div>
    );
  }
}
