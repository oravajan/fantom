import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid"; // Pro generování unikátního kódu pro hru

function GameLobby() {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const createGame = async () => {
    const newGameCode = nanoid(6); // Vytvoříme unikátní kód pro novou hru

    // Vytvoříme novou hru v Firestore s tímto kódem
    await setDoc(doc(db, "games", newGameCode), {
      createdAt: new Date(),
      players: [],
      state: "waiting", // Hra čeká na hráče
    });

    // Připojíme hráče jako detektiva k nové hře
    await addDoc(collection(db, "games", newGameCode, "players"), {
      name: playerName,
      role: "detective",
      createdAt: new Date(),
    });

    alert(`Hra byla vytvořena! Kód: ${newGameCode}`);
  };

  const joinGame = async () => {
    if (!playerName || !gameCode) return alert("Vyplň jméno a kód hry!");

    // Zkontrolujeme, jestli hra s tímto kódem existuje
    const gameDoc = await getDocs(collection(db, "games"));
    const gameExists = gameDoc.docs.some((doc) => doc.id === gameCode);

    if (!gameExists) return alert("Hra s tímto kódem neexistuje!");

    // Připojíme hráče jako detektiva do existující hry
    await addDoc(collection(db, "games", gameCode, "players"), {
      name: playerName,
      role: "detective",
      createdAt: new Date(),
    });

    alert("Úspěšně připojeno k hře!");
  };

  return (
    <div>
      <h2>Připojit se do hry nebo vytvořit novou</h2>
      <input
        type="text"
        placeholder="Tvoje jméno"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div>
        <button onClick={createGame}>Vytvořit novou hru</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Kód hry"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
        />
        <button onClick={joinGame}>Připojit se</button>
      </div>
    </div>
  );
}

export default GameLobby;
