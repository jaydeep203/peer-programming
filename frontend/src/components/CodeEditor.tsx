import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";

import "./styles/CodeEditor.css";
import React, { useEffect, useState } from "react";

interface codeEditorProps{
  onChange: (newText:string) => void;
  content: string;
  language: string;
}

const CodeEditor:React.FC<codeEditorProps> = ({
  content, onChange, language
}) => {

  const commands = [{
    name: 'saveFile',
    bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
    exec: function(editor) {
      console.log('File saved');
    }
  }];

  const enumObj = [
    {value:"c_cpp", lang:"c"},
    {value:"c_cpp", lang:"cpp"},
    {value:"java", lang:"java"},
    {value:"javascript", lang:"js"},
    {value:"python", lang:"py"}
  ];

  const [lang, setLang] = useState("");

  useEffect(() => {
      for(let i=0; i<enumObj.length; i++){
        if(language==enumObj[i].lang){
          setLang(enumObj[i].value);
        }
      }
  },[language]);

  
    
  return (
    <AceEditor 
        style={{
            width:"100%",
            height:"100%",
            background:"#282828"
        }}
        fontSize={18}
        mode={lang}
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
        value={content}
    />
  )
}

export default CodeEditor;