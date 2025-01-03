import React, { useEffect, useState } from "react";
import { LuGlobe, LuGlobeLock } from "react-icons/lu";
import { Link } from "react-router-dom";


interface projectProps{
    id: string;
    name: string;
    visibility: string;
    language: string;
}

const ProjectCard:React.FC<projectProps> = ({
   id, name, visibility, language
}) => {

    const Icon = visibility=="Private" ? LuGlobeLock : LuGlobe;
  
    const enumObj = [
        {value:"C", lang:"c"},
        {value:"C++", lang:"cpp"},
        {value:"Java", lang:"java"},
        {value:"JavaScript", lang:"js"},
        {value:"Python", lang:"py"}
    ];

    const [lang, setLang] = useState("");

    useEffect(() => {
        for(let i=0; i<enumObj.length; i++){
            if(language==enumObj[i].lang){
                setLang(enumObj[i].value);
            }
        }
    }, [language]);
    



  return (
    <div className="
        flex
        flex-row
        px-3
        py-3
        justify-between
    ">

        <Link to={`/project/${id}`} className="
            text-white
            text-lg
            hover:text-primary
        ">
            {name}
        </Link>

        <div className="flex flex-row gap-2 items-center">

            <p className="
                text-slate-300
                text-sm
                flex
                flex-row
                items-center
            ">
                {visibility} <Icon className="ml-1" />
            </p>

            <hr className="w-px h-full border-0 my-0 mx-8 bg-gray-700"></hr>

            <p className="
                text-white
            ">
                {lang}
            </p>

        </div>
        

    </div>
  )
}

export default ProjectCard