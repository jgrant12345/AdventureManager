"use client";
import { useState, createContext, useEffect } from "react";
import "./AdventureDetailsPanel.css";
import { EncountersPane } from "../encounters-pane/encounters-pane";
import React from "react";
import { Encounter } from "@/types/Ecounter";
import { EncounterContext } from "@/app/adventure/page";


interface IDetailsPaneHeader {
  Title: string;
  isActive: boolean;
}

interface IAdventureDetailsPanel {
  selectedAdventureSession: number
}

const DetailsPanelHeader: IDetailsPaneHeader[] = [
  { Title: "Encounters", isActive: true },
  { Title: "Party Members", isActive: false },
];

const AdventureDetailsPanel: React.FC<IAdventureDetailsPanel> = ({selectedAdventureSession}) => {
  const [detailPanelHeader, setDetailPanelHeader] =
    useState(DetailsPanelHeader);
  const [encounterList, setEncounterList] = useState<Encounter[]>([
    { title: "First Boss", id: 2 },
    { title: "Second boss", id: 3 },
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
      const response = await fetch(`/api/encounters?encountersId=${selectedAdventureSession}`, {
        method: "POST",
        body: JSON.stringify({ Encounter: Encounter }),
      });
      const responsejson: Encounter[] = await response.json();

      const id = responsejson[0].id; // there is only one row we're returning

      setEncounterList([...encounterList, { title: Encounter, id: id }]);
    } catch (error) {}
  }

  useEffect(() => {
    async function fetchEncounters() {
      try {
        const response = await fetch(`api/encounters?encountersId=${selectedAdventureSession}`);
        const encounters: Encounter[] = await response.json();
        setEncounterList(encounters);
      } catch (error) {
        console.log("error getting encounters");
      }
    }

    fetchEncounters();
  }, [selected_adventure_session]);

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
