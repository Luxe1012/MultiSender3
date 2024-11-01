import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Alert } from "../Toast/Toast";
import axios from "axios";
import { API_URL } from "../config";

const Run = (props) => {
  const [isRunning, setRunning] = useState(false);
  const tokenaddress = props.tokenaddress;
  const maxVal = props.maxVal;
  const minVal = props.minVal;
  const timestamp = props.timestamp;
  const option = props.option;
  const walletUnit = props.walletUnit;
  const walletAmount = props.walletAmount;

  const handleClickStart = async () => {
    setRunning(true);
    try {
      const res = await axios.get(`${API_URL}start`, {
        params: {
          tokenaddress: tokenaddress,
          option: option,
          maxVal: maxVal,
          minVal: minVal,
          timestamp: timestamp,
          walletUnit: walletUnit,
          walletAmount: walletAmount,
        },
      });

      console.log(res.data);
      if (res.data) {
        setRunning(false);
        //toast.success(`Success`);
      }
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <Button
      variant={isRunning ? "danger" : "primary"}
      onClick={handleClickStart}
      style={{
        marginTop: "0",
        width: "160px",
        height: "54px",
        fontSize: "25px",
      }}
      disabled={isRunning ? true : false}
    >
      {isRunning ? "Running" : "Start Bot"}
    </Button>
  );
};

export default Run;
