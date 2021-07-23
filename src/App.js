import { useState } from "react";
import useSound from "use-sound";
import "./styles.css";
import soundEffectFile from "./audio/CashRegister.mp3";

let isBillAmountEntered = false;
let billAmount = "";
let cashGiven = "";
let graphicLink = "";
let showResult = false;
const noteList = [2000, 500, 100, 50, 20, 10, 5, 1];
let minNumberOfNotes;

export default function App() {
  const [message, setMessage] = useState("");
  const [play] = useSound(soundEffectFile);

  const getMinNumberOfNotes = (noteList, amountToBeReturn) => {
    const minNumberOfNotes = noteList.map((note) => {
      if (note <= amountToBeReturn) {
        const numberOfNotes = parseInt(amountToBeReturn / note, 10);
        amountToBeReturn -= note * numberOfNotes;
        return numberOfNotes;
      } else {
        return 0;
      }
    });
    return minNumberOfNotes;
  };

  const submitBtnClickHandler = () => {
    if (billAmount !== "" && billAmount !== 0 && isNaN(billAmount) === false) {
      setMessage("Submitting...");
      setTimeout(() => {
        isBillAmountEntered = true;
        setMessage("");
      }, 800);
    } else {
      setMessage("Enter valid bill amount");
    }
  };

  const calculateBtnClickHandler = () => {
    if (
      billAmount !== "" &&
      billAmount !== 0 &&
      isNaN(billAmount) === false &&
      cashGiven !== "" &&
      cashGiven !== 0 &&
      isNaN(cashGiven) === false
    ) {
      if (cashGiven < billAmount) {
        graphicLink =
          "https://memes.co.in/memes/update/uploads/2021/04/mirzapur_memes-20210420-0001-950x500.jpg";
        showResult = false;
        setMessage("cash given is less than total bill amount !");
      } else if (cashGiven === billAmount) {
        graphicLink = "/";
        showResult = false;
        setMessage("no need to return anything");
      } else {
        graphicLink = "/";
        showResult = false;
        const totalAmountToBeReturn = cashGiven - billAmount;
        minNumberOfNotes = getMinNumberOfNotes(noteList, totalAmountToBeReturn);
        setMessage("calculating...");
        setTimeout(() => {
          showResult = true;
          play();
          setMessage("result below 👇");
        }, 800);
      }
    } else if (isNaN(billAmount) || billAmount === 0) {
      graphicLink = "/";
      showResult = false;
      setMessage("Enter valid bill amount");
    } else {
      graphicLink = "/";
      showResult = false;
      setMessage("Enter valid cash given amount");
    }
  };

  return (
    <div className="App">
      <h1>
        <span role="img" aria-label="rupee symbol">
          ₹
        </span>{" "}
        Cash register manager
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="bill-amt">
          Bill amount
          <input
            onChange={(e) => (billAmount = parseInt(e.target.value, 10))}
            type="number"
            min="1"
            id="bill-amt"
            name="bill-amt"
            placeholder="Enter bill amount"
            required
          />
        </label>
        <button
          style={
            isBillAmountEntered === false
              ? { display: "block" }
              : { display: "none" }
          }
          onClick={submitBtnClickHandler}
          type="button"
        >
          Submit
        </button>
        <label
          style={
            isBillAmountEntered === false
              ? { display: "none" }
              : { display: "block" }
          }
          htmlFor="cash-given"
        >
          Cash given
          <input
            onChange={(e) => (cashGiven = parseInt(e.target.value, 10))}
            type="number"
            min="1"
            id="cash-given"
            name="cash-given"
            placeholder="Enter cash given"
            required
          />
        </label>
        <button
          onClick={calculateBtnClickHandler}
          style={
            isBillAmountEntered === false
              ? { display: "none" }
              : { display: "block" }
          }
          type={isBillAmountEntered === false ? "button" : "submit"}
        >
          Calculate
        </button>
      </form>
      <p>{message}</p>
      <img
        className="graphic"
        src={graphicLink === "" ? "/" : graphicLink}
        alt=""
      />
      <table
        style={
          showResult === false ? { display: "none" } : { display: "block" }
        }
      >
        <thead>
          <tr>
            <th>Note</th>
            <th>Number of note</th>
          </tr>
        </thead>

        <tbody>
          {noteList.map((note, index) => {
            return (
              <tr key={note}>
                <td>{note}</td>
                <td>
                  {minNumberOfNotes === undefined
                    ? ""
                    : minNumberOfNotes[index]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
