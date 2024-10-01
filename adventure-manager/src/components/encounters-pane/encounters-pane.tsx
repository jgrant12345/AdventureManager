"use client"
import React from "react";
import { MonsterList } from "../MonsterList/MonsterList";
import { IEncounterList } from "../../types/Ecounter";




export const EncountersPane: React.FC<IEncounterList> = ({ EncounterList } : IEncounterList) => {

  return (
    <>
          
      <MonsterList EncounterList={EncounterList}  />
      
    </>
  );
};
