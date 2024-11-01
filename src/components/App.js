import "./App.css";
import Nav from "./Nav/Nav";
import TokenPart from "./Token/Token";
import SenderTable from "./Table";
import Airdrop from "./Airdrop";
import ConnectWallet from "./ConnectWallet";
import Transfer from "./Transfer/Transfer";
import Fee from "./Fee";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { Alert } from "./Toast/Toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { RPC_URL, SECRET_KEY } from "./config";
import {
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  // Token,
} from "@solana/spl-token";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

// =========================== local variable ======================================
const connection = new Connection(RPC_URL, "confirmed");
const from = Keypair.fromSecretKey(bs58.decode(SECRET_KEY));
let sourceAccount;
let numberDecimals;
function App() {
  // ============================ main params ====================================
  const [tokenaddress, setTokenAddress] = useState(
    "7iT1GRYYhEop2nV1dyCwK2MGyLmPHq47WhPGSwiqcUg5"
  );
  const [wallets, setWallets] = useState();
  const [quantity, setQuantity] = useState(10);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [fee, setFee] = useState(0.0001);
  const [loading, setLoading] = useState(false);
  // ============================= other params ==================================
  const [isConnected, setIsConnected] = useState(false);
  const [isAirdrop, setIsAirdrop] = useState(false);
  // ============================= function ======================================

  const handleConnect = () => {
    setIsConnected(
      isConnected
        ? // eslint-disable-next-line no-restricted-globals
          confirm("Do you want to disconnect?")
          ? !isConnected
          : isConnected
        : !isConnected
    );
  };

  useEffect(() => {
    getTokenBalanceofWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenaddress]);
  useEffect(() => {
    if (tokenaddress && wallets && quantity) {
      setIsAirdrop(true);
    }
  }, [tokenaddress, wallets, quantity]);

  const handleAirdrop = async () => {
    if (isAirdrop) {
      setLoading(true);
      numberDecimals = await getNumberDecimals(tokenaddress);
      tokenTransfer(0);
    } else {
      alert("Please check all paramsters again!");
    }
  };

  const tokenTransfer = async (idx) => {
    const destinationAddress = wallets[idx];
    // const destinationAddress = "B4Nv5FjjnDdr5p84xcKBrGTZ7t94bnftnQkpMncUSsj2";
    const tx = new Transaction();
    const tokenMint = new PublicKey(tokenaddress);
    const receiver = new PublicKey(destinationAddress);

    try {
      const fromAccount = getAssociatedTokenAddressSync(
        tokenMint,
        from.publicKey,
        true
      );
      const toAccount = getAssociatedTokenAddressSync(
        tokenMint,
        receiver,
        true
      );
      if ((await connection.getAccountInfo(toAccount)) == null) {
        tx.add(
          createAssociatedTokenAccountInstruction(
            from.publicKey,
            toAccount,
            receiver,
            tokenMint
          )
        );
      }
      tx.add(
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: fee * LAMPORTS_PER_SOL,
        })
      );
      tx.add(
        createTransferInstruction(
          fromAccount,
          toAccount,
          from.publicKey,
          Number(quantity) * 10 ** numberDecimals
        )
      );

      // const signature = await sendAndConfirmTransaction(connection, tx, [from]);

      const signature = await connection.sendTransaction(tx, [from]);
      console.log("signature", signature);

      if (idx + 1 === wallets.length) {
        setBalanceAmount(balanceAmount - quantity * (idx + 1));
        setLoading(false);
        alert("Airdrop is finished!");

        // getTokenBalanceofWallet();
      } else {
        setBalanceAmount(balanceAmount - quantity * (idx + 1));
        tokenTransfer(idx + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transfer = async (idx) => {
    try {
      // const destinationAddress = wallets[idx];
      const destinationAddress = "B4Nv5FjjnDdr5p84xcKBrGTZ7t94bnftnQkpMncUSsj2";
      console.log("wallets=>", destinationAddress, tokenaddress);
      let transaction = new Transaction();
      // =================================================================================================================
      let fromTokenAccount = getAssociatedTokenAddressSync(
        new PublicKey(tokenaddress),
        from.publicKey,
        true
      );
      let toTokenAccount = getAssociatedTokenAddressSync(
        new PublicKey(tokenaddress),
        new PublicKey(destinationAddress),
        true
      );

      if ((await connection.getAccountInfo(toTokenAccount)) == null) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            from.publicKey,
            toTokenAccount,
            new PublicKey(destinationAddress),
            new PublicKey(tokenaddress)
          )
        );
      }

      console.log(
        "info=>",
        fromTokenAccount.toString(),
        toTokenAccount.toString(),
        from.publicKey
      );
      transaction.add(
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 0.00001 * LAMPORTS_PER_SOL,
        })
      );

      // let balance = (await conn.getTokenAccountBalance(fromTokenAccount)).value;
      transaction.add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          from.publicKey,
          quantity * Math.pow(10, numberDecimals)
        )
      );

      console.log("transaction=>", transaction);
      const signature = await connection.sendTransaction(transaction, [from]);
      console.log("signature=>", signature);
      // =================================================================================================================
      // const destinationAccount = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   from,
      //   new PublicKey(tokenaddress),
      //   new PublicKey(destinationAddress)
      // );
      // console.log("destinateionWallet=======>", destinationAccount);
      // =================================================================================================================
      // const tx = new Transaction();
      // tx.add(
      //   ComputeBudgetProgram.setComputeUnitPrice({
      //     microLamports: 0.00001 * LAMPORTS_PER_SOL,
      //   })
      // );
      // tx.add(
      //   createTransferInstruction(
      //     sourceAccount.address,
      //     // destinationAccount.address,
      //     // new PublicKey(destinationAddress),
      //     // destinationAddress,
      //     from.publicKey,
      //     quantity * Math.pow(10, numberDecimals)
      //   )
      // );

      // const latestBlockHash = await connection.getLatestBlockhash("confirmed");
      // tx.recentBlockhash = await latestBlockHash.blockhash;

      // console.log("tx==========>", tx);
      // // const signature = await sendAndConfirmTransaction(connection, tx, [from]);
      // const signature = await connection.sendTransaction(tx, [from]);
      // console.log(`https://solscan.io/tx/${signature}`);
      // return;
      // ==================================================================================================================

      // const toPublicKey = new PublicKey(destinationAddress);
      // const mint = new PublicKey(tokenaddress);
      // const token = new Token(connection, mint, TOKEN_PROGRAM_ID, from);
      // const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(
      //   from.publicKey
      // );
      // const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(
      //   toPublicKey
      // );
      // const tx = new Transaction();
      // tx.add(
      //   Token.createTransferInstruction(
      //     TOKEN_PROGRAM_ID,
      //     fromTokenAccount.address,
      //     toTokenAccount.address,
      //     from.publicKey,
      //     [],
      //     0
      //   )
      // );
      // const signature = await connection.sendTransaction(tx, [from]);

      // ==================================================================================================================
      // console.log("solana ====> ", window.solana);
      // const mintPublicKey = new PublicKey(tokenaddress);
      // const fromPublicKey = from.publicKey;
      // const tokPublicKey = new PublicKey(destinationAddress);

      // let tx = new Transaction();
      // tx.add(
      //   createTransferCheckedInstruction(
      //     fromPublicKey,
      //     mintPublicKey,
      //     tokPublicKey,
      //     fromPublicKey,
      //     quantity,
      //     8
      //   )
      // );
      // const signature = await connection.sendTransaction(tx, [from]);

      // ==================================================================================================================

      if (idx + 1 === wallets.length) {
        alert("Completed!");
        console.log("========finished===========");
      } else {
        await transfer(idx + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenBalanceofWallet = async () => {
    try {
      if (tokenaddress !== "") {
        let fromTokenAccount = getAssociatedTokenAddressSync(
          new PublicKey(tokenaddress),
          from.publicKey,
          true
        );
        const account = await connection.getTokenAccountBalance(
          fromTokenAccount
        );
        setBalanceAmount(account?.value?.uiAmount);
      } else {
        setBalanceAmount(0);
        return;
      }
    } catch (error) {
      alert(
        "There is problem in getting current balance of token!\n Please check that again!"
      );
      setBalanceAmount(0);
    }
  };
  const getNumberDecimals = async (mintAddress) => {
    const info = await connection.getParsedAccountInfo(
      new PublicKey(mintAddress)
    );
    const result = (info?.value).data.parsed.info.decimals;
    return result;
  };
  return (
    <div className="App">
      <Nav />

      <div
        style={{
          opacity: loading ? 0.5 : 1,
          transition: "opacity 0.3s esay-in-out",
        }}
      >
        {loading ? (
          <div className="d-flex just-content-center align-item-center custom-loading">
            <Spinner
              animation="border"
              variant="primary"
              role="status"
            ></Spinner>
          </div>
        ) : (
          <div></div>
        )}
        <div className="connectWallet">
          <ConnectWallet
            handleConnect={handleConnect}
            isConnected={isConnected}
          />
        </div>
        <div className="event">
          <SenderTable
            wallets={wallets}
            setWallets={setWallets}
            isConnected={isConnected}
          />
        </div>
        <div className="main">
          <TokenPart
            tokenaddress={tokenaddress}
            setTokenAddress={setTokenAddress}
            balanceAmount={balanceAmount}
          />
          <Transfer
            quantity={quantity}
            setQuantity={setQuantity}
            totalQuantity={wallets?.length ? wallets.length * quantity : 0}
            balanceAmount={balanceAmount}
          />
          <Fee
            fee={fee}
            setFee={setFee}
            totalFee={wallets?.length ? wallets.length * fee : 0}
            // balanceAmount={balanceAmount}
          />
        </div>
        <div className="airdrop">
          <Airdrop
            isConnected={
              isConnected && wallets?.length
                ? wallets.length * quantity < balanceAmount
                : 0
            }
            handleAirdrop={handleAirdrop}
          />
        </div>
      </div>
      <Alert />
    </div>
  );
}

export default App;
