export interface IEncounterList {
    IEncountersList: Encounter[];
  }
  
  export interface Encounter {
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