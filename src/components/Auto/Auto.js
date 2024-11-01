import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Run from "./Run";
import "./Auto.css";

const Auto = (props) => {
  const [maxVal, setMaxVal] = useState(0.3);
  const [minVal, setMinVal] = useState(0.9);
  const [timestamp, setTimestamp] = useState(10);
  const [option, setOption] = useState("");

  return (
    <div className="setting">
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1em" }}
      >
        {/* buy sell option */}
        {/* <div className="buy-sell-option">
          <Form>
            <Form.Check
              inline
              label="Buy"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              onChange={() => setOption("buy")}
              value={option}
            />
            <Form.Check
              inline
              label="Sell"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              onChange={() => setOption("sell")}
              value={option}
            />
          </Form>
        </div> */}
        {/* Sol Max and Min value */}

        <div className="max-min-val">
          <InputGroup size="lg" className="maxval">
            <InputGroup.Text id="inputGroup-sizing-lg">Max</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="number"
              placeholder="0"
              value={maxVal}
              onChange={(e) => setMaxVal(e.target.value)}
            />
            <InputGroup.Text>SOL</InputGroup.Text>
          </InputGroup>
          <InputGroup size="lg" className="minval">
            <InputGroup.Text id="inputGroup-sizing-lg">Min</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="number"
              placeholder="0"
              value={minVal}
              onChange={(e) => setMinVal(e.target.value)}
            />
            <InputGroup.Text>SOL</InputGroup.Text>
          </InputGroup>
        </div>

        {/* timestamp */}
        <div className="timestamp">
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-lg">
              TimeStamp
            </InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="number"
              placeholder="0"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <InputGroup.Text>Seconds</InputGroup.Text>
          </InputGroup>
        </div>
      </div>

      {/* Button */}
      <div className="run-btn">
        <Run
          tokenaddress={props.tokenaddress}
          maxVal={maxVal}
          minVal={minVal}
          timestamp={timestamp}
          option={option}
          walletUnit={props.walletUnit}
          walletAmount={props.walletAmount}
        />
      </div>
    </div>
  );
};

export default Auto;
