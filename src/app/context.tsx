"use client";
import React, { createContext, useContext, useState } from "react";

interface GameHomeConfixContextType {
  username: string | null;
  gameId: string | null;
  selection: "join" | "host" | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  setGameId: React.Dispatch<React.SetStateAction<string | null>>;
  setSelection: React.Dispatch<React.SetStateAction<"join" | "host" | null>>;
}

const GameHomeConfixContext = createContext<GameHomeConfixContextType>({
  username: null,
  gameId: null,
  selection: null,
  setUsername: () => {},
  setGameId: () => {},
  setSelection: () => {},
});

export const useGameHomeConfix = () => useContext(GameHomeConfixContext);

export const GameHomeConfix = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [selection, setSelection] = useState<"join" | "host" | null>(null);

  return (
    <GameHomeConfixContext.Provider
      value={{
        username,
        selection,
        gameId,
        setGameId,
        setUsername,
        setSelection,
      }}
    >
      {children}
    </GameHomeConfixContext.Provider>
  );
};
