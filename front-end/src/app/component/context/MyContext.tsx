"use client";

import React, { createContext, useState, useContext } from "react";

// Définition du type pour le contexte
interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

// Création du contexte
const MyContext = createContext<MyContextType | undefined>(undefined);

// Fournisseur de contexte
export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState("Valeur par défaut");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext doit être utilisé dans un MyProvider");
  }
  return context;
};
