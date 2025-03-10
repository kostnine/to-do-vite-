import React, { useState, useEffect } from "react";
import "./App.css";

const GuessGame = () => {
  const [randomNumber, setRandomNumber] = useState(null);  // Atsitiktinis skaičius
  const [guess, setGuess] = useState("");  // Vartotojo įvestas spėjimas
  const [message, setMessage] = useState("");  // Žinutė vartotojui
  const [messageColor, setMessageColor] = useState("black");  // Žinutės spalva
  const [attempts, setAttempts] = useState(0);  // Bandymų skaičius
  const [attemptsList, setAttemptsList] = useState([]); // Visų spėjimų sąrašas


  

  // Sugeneruoti atsitiktinį skaičių kai komponentas užsikrauna
  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);
    setAttempts(attempts + 1);

    if (isNaN(userGuess)) {
      setMessage("Įveskite skaičių!");
      setMessageColor("black");
      return;
    }

    setAttempts(attempts + 1);
    setAttemptsList([...attemptsList, userGuess]); // Prideda bandymą į sąrašą
    const difference = Math.abs(userGuess - randomNumber);

    if (userGuess > randomNumber) {
      if (difference <= 5) {
        setMessage("Jau arti, bet bandyk mažiau!");
        setMessageColor("orange");
      } else {
        setMessage("Bandyk mažesnį!");
        setMessageColor("red");
      }
    } else if (userGuess < randomNumber) {
      if (difference <= 5) {
        setMessage("Jau arti, bet bandyk daugiau!");
        setMessageColor("orange");
      } else {
        setMessage("Bandyk didesnį!");
        setMessageColor("blue");
      }
    } else {
      setMessage(`Teisingai! Atspėjai per ${attempts + 1} bandymus.`);
      setMessageColor("green");
    }
  };

  // Atstatyti žaidimą
  const resetGame = () => {
    generateRandomNumber();
    setGuess("");
    setMessage("");
    setMessageColor("black");
    setAttempts(0);
    setAttemptsList([]); // Išvalo bandymų sąrašą
  };

  return (
    <div className="guess-game-container">
      <h2>Skaičių Spėjimo Žaidimas</h2>
      <p>Spėkite skaičių nuo 1 iki 100!</p>
      <form onSubmit={handleGuess} className="guess-form">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Įveskite skaičių"
        />
        <button type="submit" className="guess-btn">Spėti</button>
      </form>
      <p className="message" style={{ color: messageColor }}>{message}</p>
          {/* Rodome bandymus tik kai atspėja skaičių */}
          {messageColor === "green" && attemptsList.length > 0 && (
          <div className="attempts-container">
              <h3>Jūsų bandymai:</h3>
            <p>{attemptsList.join(", ")}</p>
          </div>
)}

      {/* Reset mygtukas */}
      <button onClick={resetGame} className="reset-btn">Žaisti dar kartą</button>
    </div>
  );
};

export default GuessGame;
