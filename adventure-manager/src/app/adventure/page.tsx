"use client";
import dynamic from "next/dynamic";
import "../index.css";
import "../app.css";
const Editor = dynamic(() => import("../../components/editor/editor"), {
  ssr: false,
});
import "../adventure-dashboard.css";
import AdventureDetailsPanel from "../../components/adventure-details/AdventureDetailsPanel";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";



export const EncounterContext = createContext<number>(0);
export default function AdventureDashboard() {
  const [adventure_sessions, setAdventureSessions] = useState<
    IAdventureSession[]
  >([]);
  const [selectedAdventure_session, setSelectedAdventure_session] = useState<number>(1);
 


  useEffect(() => {
    getEncounters();
    async function getEncounters() {
      const response = (
        await axios.get("/api/adventure_session")
      );   
      setSelectedAdventure_session(response.data[0].id);
    }
  }, []);

  return (
      <div className="AdventureDashboardContainer">
        <div>testing my header here content</div>

        <main id="editorContainer">
          <div style={{ display: "flex", justifyContent: "center" }}>
            Adventure Notes
          </div>
          <hr></hr>
          <div id="editor">
            <Editor />
          </div>
        </main>
        <div id="AdventureDetailsPanel">
          <AdventureDetailsPanel selectedAdventureSession = {selectedAdventure_session} />
        </div>
      </div>
  );
}
