import Button from "react-bootstrap/Button";

const Airdrop = (props) => {
  const { isConnected, handleAirdrop } = props;

  return (
    <Button
      className="btn btn-success"
      onClick={handleAirdrop}
      disabled={!isConnected}
    >
      <h3>Airdrop</h3>
    </Button>
  );
};

export default Airdrop;
