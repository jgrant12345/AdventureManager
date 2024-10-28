import { FormEvent } from "react";

export interface IEncounterPane {
      EncountersList: Encounter[];
      AddEncounter: (event: any, Encounter: string) => void
  }
  
  export interface Encounter {
    id: number,
    EncounterName: string;
  }

  export interface IEncounterAction{
    type: EncounterActions;
    payload: Encounter;
  }

  export enum EncounterActions{
    ADDENCOUNTER = 1,
    EditEncounter = 2,
    DeleteEncounter = 3,
  }