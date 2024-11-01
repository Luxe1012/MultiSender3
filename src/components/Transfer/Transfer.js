import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { toast } from "react-toastify";
import { Alert } from "../Toast/Toast";
import "./Transfer.css";
// import axios from "axios";
// import { API_URL } from "../config";

const Transfer = (props) => {
  const { quantity, setQuantity, totalQuantity, balanceAmount } = props;
  return (
    <div className="sol_transfer">
      <div className="_solamount">
        <InputGroup size="lg" className="sol_amount">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Quantity per wallet
          </InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            type="number"
            placeholder="input per quatity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="totalToken">
        <h4
          style={
            balanceAmount <= totalQuantity
              ? { color: "red" }
              : { color: "green" }
          }
        >
          Total :{" "}
          {balanceAmount <= totalQuantity
            ? `${totalQuantity} - insufficient!`
            : totalQuantity}
        </h4>
      </div>
      <Alert />
    </div>
  );
};

export default Transfer;
