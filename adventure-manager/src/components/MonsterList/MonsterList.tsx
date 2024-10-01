"use client";
import React, { ChangeEvent, useState } from "react";
import { Encounter, IEncounterList } from "../../types/Ecounter";

export const MonsterList: React.FC<IEncounterList> = ({EncounterList} : IEncounterList) => {

  const [encounterList, setEncounterList] = useState<Encounter[]>(EncounterList);
  const [EncounterName, setEncounterName] = useState<string>("");

   function addEncounter() {
    try {
      const newEncounter : Encounter = {EncounterName: EncounterName};
      setEncounterList([...encounterList, newEncounter ]);
      setEncounterName("");

    }  catch {
      console.log("error")
    }
  }

  return (
    <div>
      {" "}
      <input
        value={EncounterName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEncounterName(e.target.value)
        }
      ></input>
      <button onClick={addEncounter}>add Encounter</button>
      {encounterList.map((encounter : Encounter, index: number) => {
        return <div key={index}>{encounter.EncounterName}</div>;
      })}
    </div>
  );
};
