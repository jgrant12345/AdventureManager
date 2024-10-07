"use client"
import React from "react";
import { EncounterList } from "../MonsterList/EncounterList";
import { IEncounterList } from "../../types/Ecounter";
import "./encounters-pane.css"




export const EncountersPane: React.FC<IEncounterList> = ({ IEncountersList } : IEncounterList) => {

  return (
    <div id="encounterPane">
      <EncounterList IEncountersList={IEncountersList}  />
      
    </div>
  );
};
