"use client"
import React, { useState } from "react";
import { MonsterList } from "../MonsterList/MonsterList";
import { Encounter, IEncounterList } from "@/app/types/Ecounter";



export const EncountersPane: React.FC<IEncounterList> = ({ EncounterList }) => {
  const [encounterList, setEncounterList] = useState<Encounter[]>(EncounterList);

  async function addEncounter() {
    try {
       
        // setEncounterList([...encounterList, newEncounter ])
    } catch {

    }
  }

  return (
    <>
    <button onClick={addEncounter}>add Encounter</button>
      {encounterList.map((encounter, index) => {
        return <div key={index}>{encounter.EncounterName}</div>;
      })}
      <MonsterList />
      
    </>
  );
};
