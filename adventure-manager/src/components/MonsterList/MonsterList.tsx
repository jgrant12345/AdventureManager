"use client";
import React, { ChangeEvent, useState } from "react";
import { Encounter, IEncounterList } from "../../types/Ecounter";

export const MonsterList: React.FC<IEncounterList> = ({
  EncounterList,
}: IEncounterList) => {
  const [encounterList, setEncounterList] =
    useState<Encounter[]>(EncounterList);
  const [EncounterName, setEncounterName] = useState<string>("");

  function addEncounter(e : React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const newEncounter: Encounter = { EncounterName: EncounterName };
      setEncounterList([...encounterList, newEncounter]);
      setEncounterName("");
    } catch {
      console.log("error");
    }
  }

  return (
    <div>
      {" "}
      <form onSubmit={addEncounter}>
        <label htmlFor="AddMonsterInput">Add Monster</label>
        <input
          id="AddMonsterInput"
          value={EncounterName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEncounterName(e.target.value)
          }
        ></input>
        <button type="submit">add Encounter</button>
      </form>
      {encounterList.map((encounter: Encounter, index: number) => {
        return <div key={index}>{encounter.EncounterName}</div>;
      })}
    </div>
  );
};
