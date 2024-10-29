import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";

import "./styles/CodeEditor.css";
import React from "react";

interface codeEditorProps{
  onChange: (newText:string) => void;
}

const CodeEditor:React.FC<codeEditorProps> = ({
  onChange
}) => {

  const commands = [{
    name: 'saveFile',
    bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
    exec: function(editor) {
      console.log('File saved');
    }
  }];

  
    
  return (
    <AceEditor 
        style={{
            width:"100%",
            height:"100%",
            background:"#282828"
        }}
        fontSize={18}
        mode="javascript"
        theme="dracula"
        name="UNIQUE_ID_OF_DIV"
        onChange={onChange}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        commands={commands}
    />
  )
}

export default CodeEditor;