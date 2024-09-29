import dynamic from "next/dynamic";
import './index.css'
import './app.css'
const Editor = dynamic(() => import('./components/editor/editor'), {
  ssr: false,
})
import "./adventure-dashboard.css"
import AdventureDetailsPanel from "./components/adventure-details/AdventureDetailsPanel";
import { useEffect, useState } from "react";
export default function AdventureDashboard() {

  
  return (
    <div className="AdventureDashboardContainer">
       <div>testing my header here content</div>
    
      <main id="editorContainer" >
        <div style={{display:"flex", justifyContent: "center"}}>Adventure Notes</div>
        <hr></hr>
        <div id="editor">
        <Editor />
        </div>   
       
      </main>
      <div id="AdventureDetailsPanel">
        <AdventureDetailsPanel />
        </div>
    
    </div>
  );
}
