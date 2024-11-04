"use client";
import React, { useContext, useState } from "react";
import { IEncounterPane } from "../../types/Ecounter";
import "./encounters-pane.css";

export const EncountersPane: React.FC<IEncounterPane> = ({
  EncountersList: EncountersList,
  AddEncounter,
}: IEncounterPane) => {
  const [encounterNameInput, setEncounterNameInput] = useState("");

  return (
    <div id="encounterPane">
      <form
        onSubmit={(e) => {
          AddEncounter(e, encounterNameInput);
          setEncounterNameInput("");
        }}
      >
        <label htmlFor="addEncounterInput">Add Encounter</label>
        <input
          onChange={(e) => setEncounterNameInput(e.target.value)}
          value={encounterNameInput}
          id="addEncounterInput"
        ></input>
         <button type="submit">+</button>
      </form>
     
      {EncountersList.map((Encounter, index) => {
        return (
          <div key={index}>
            <button className="encounterButton">{Encounter.title}</button>
          </div>
        );
      })}
    </div>
  );
};
