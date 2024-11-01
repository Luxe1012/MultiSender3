import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Token.css";

const TokenPart = (props) => {
  const { balanceAmount, tokenaddress, setTokenAddress } = props;
  return (
    <div className="tokenaddr">
      <InputGroup size="lg" className="inputgroup">
        <InputGroup.Text id="inputGroup-sizing-lg">
          Token Address
        </InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={tokenaddress}
          value={tokenaddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
      </InputGroup>
      <div className="balanceToken">
        <h4>Balance : {balanceAmount.toFixed(3)}</h4>
      </div>
    </div>
  );
};

export default TokenPart;
