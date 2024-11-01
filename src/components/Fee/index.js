import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { toast } from "react-toastify";
import { Alert } from "../Toast/Toast";
import "./style.css";
// import axios from "axios";
// import { API_URL } from "../config";

const Fee = (props) => {
  const { fee, setFee, totalFee, balanceAmount } = props;
  return (
    <div className="sol_transfer">
      <div className="_solamount">
        <InputGroup size="lg" className="sol_amount">
          <InputGroup.Text id="inputGroup-sizing-lg">Fee</InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            type="number"
            placeholder="input per quatity"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="totalToken">
        <h4
          style={
            balanceAmount <= totalFee ? { color: "red" } : { color: "green" }
          }
        >
          tx total fee :{" "}
          {balanceAmount <= totalFee
            ? `${totalFee} - insufficient!`
            : totalFee.toFixed(6)}{" "}
          sol
        </h4>
      </div>
      <Alert />
    </div>
  );
};

export default Fee;
