import Button from "react-bootstrap/Button";

const ConnectWallet = (props) => {
  const { handleConnect, isConnected } = props;

  return (
    <Button
      className={isConnected ? "btn btn-success" : "btn btn-danger"}
      onClick={handleConnect}
    >
      <h3>{isConnected ? "Connected" : "Connect Wallet"}</h3>
    </Button>
  );
};

export default ConnectWallet;
