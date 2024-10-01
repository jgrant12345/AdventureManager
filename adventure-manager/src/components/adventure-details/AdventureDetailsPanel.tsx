"use client"
import { useState } from "react";
import "./AdventureDetailsPanel.css";
import { EncountersPane } from "../encounters-pane/encounters-pane";

interface IDetailsPaneHeader {
  Title: string;
  isActive: boolean;
}

let DetailsPanelHeader: IDetailsPaneHeader[] = [
  { Title: "Encounters", isActive: true },
  { Title: "Party Members", isActive: false },
];

const AdventureDetailsPanel: React.FC = () => {
  const [detailPanelHeader, setDetailPanelHeader] =
    useState(DetailsPanelHeader);
  function updateActiveHeader(id: number) {
    const newDetailsPanelHeader = detailPanelHeader.map(
      (prevPanelHeader, index) =>
        id === index
          ? { ...prevPanelHeader, isActive: true }
          : { ...prevPanelHeader, isActive: false }
    );
    setDetailPanelHeader(newDetailsPanelHeader);
  }
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
        {detailPanelHeader[0].isActive && <EncountersPane EncounterList={[{EncounterName:"First Boss"}, {EncounterName:"Second boss"}]}/>}
      </div>
    </>
  );
};

export default AdventureDetailsPanel;
