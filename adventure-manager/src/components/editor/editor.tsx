"use client";

import React from "react";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  MDXEditorMethods,
  ListsToggle,
  listsPlugin,
} from "@mdxeditor/editor";
import "./editor.css";
import "@mdxeditor/editor/style.css";
import dynamic from 'next/dynamic';



const Editor: React.FC = () => {
    

  
  return (
    <>
      <MDXEditor
        markdown="Hello world"
        plugins={[
          listsPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
              </>
            ),
          }),
        ]}
      />
    </>
  );
};

export default Editor;
