"use client";
import { useState, createContext, useEffect } from "react";
import "./AdventureDetailsPanel.css";
import { EncountersPane } from "../encounters-pane/encounters-pane";
import React from "react";
import { Encounter } from "@/types/Ecounter";

interface IDetailsPaneHeader {
  Title: string;
  isActive: boolean;
}

const DetailsPanelHeader: IDetailsPaneHeader[] = [
  { Title: "Encounters", isActive: true },
  { Title: "Party Members", isActive: false },
];

export const encounterContext = createContext<any>(null);

const AdventureDetailsPanel: React.FC = () => {
  const [detailPanelHeader, setDetailPanelHeader] =
    useState(DetailsPanelHeader);
  const [encounterList, setEncounterList] = useState<Encounter[]>([
    { EncounterName: "First Boss", id: 2 },
    { EncounterName: "Second boss", id: 3 },
  ]);

  function updateActiveHeader(id: number) {
    const newDetailsPanelHeader = detailPanelHeader.map(
      (prevPanelHeader, index) =>
        id === index
          ? { ...prevPanelHeader, isActive: true }
          : { ...prevPanelHeader, isActive: false }
    );

    setDetailPanelHeader(newDetailsPanelHeader);
  }

  async function addEncounter(
    event: React.FormEvent<HTMLFormElement>,
    Encounter: string
  ) {
    event.preventDefault();
    try {
      const response = await fetch(`/api/encounters`, {
        method: "POST",
        body: JSON.stringify({ Encounter: Encounter }),
      });
      const responsejson: Encounter[] = await response.json();
      console.log(responsejson);
      const id = responsejson[0].id; // there is only one row we're returning
      console.log(id);
      setEncounterList([
        ...encounterList,
        { EncounterName: Encounter, id: id },
      ]);
    } catch (error) {}
  }

  useEffect(() => {
    async function fetchEncounters() {
      try {
        const response = await fetch("api/encounters");
      } catch (error) {
        console.log("error getting encounters");
      }
    }

    fetchEncounters();
  });

  return (
    <>
      <div>
        <div className="AdventureDetailsPanelHeaders">
          {detailPanelHeader.map((header, index) => {
            return (
              <button
                onClick={() => updateActiveHeader(index)}
                style={
                  header.isActive ? { borderBottom: "2px solid black" } : {}
                }
                className="headerKeys"
                key={index}
              >
                {header.Title}
              </button>
            );
          })}
        </div>

        {detailPanelHeader[0].isActive && (
          <EncountersPane
            EncountersList={encounterList}
            AddEncounter={addEncounter}
          />
        )}
      </div>
    </>
  );
};

export default AdventureDetailsPanel;
