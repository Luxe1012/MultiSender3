import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
// import Logo from "../../assets/Magic200.png";
//import Logo from "../../assets/logo.png";
import Logo from "../../assets/logo1.jpeg";

const Nav = () => {
  return (
    <Navbar className="bg-body-tertiary navbar">
      <Container style={{ margin: "0" }}>
        <Navbar.Brand className="navbrand">
          <div className="navlogo">
            {/* <img
              src={Logo}
              width={50}
              height={50}
              className="d-inline-block align-top"
            /> */}
          </div>
          <div>
            <h1>Airdrop to Multisender</h1>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
