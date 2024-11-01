import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Alert } from "../Toast/Toast";
import { API_URL } from "../config";
import "./WalletAmounts.css";
import axios from "axios";

const WalletAmounts = (props) => {
  const handleGenerate = async () => {
    try {
      const res = await axios.get(`${API_URL}generate`, {
        params: {
          wallet_amount: props.walletAmount,
        },
      });
      if (res) toast.success(`${props.walletAmount} Wallets are generated now`);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="wallet_amount">
      <InputGroup size="lg" className="walletamount">
        <InputGroup.Text id="inputGroup-sizing-lg">
          Wallet Amounts
        </InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="number"
          placeholder="0"
          value={props.walletAmount}
          onChange={(e) => props.setWalletAmount(e.target.value)}
        />
      </InputGroup>
      <Button className="generate" onClick={handleGenerate}>
        Generate
      </Button>
      <Alert />
    </div>
  );
};

export default WalletAmounts;
