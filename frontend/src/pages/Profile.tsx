import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/headers/Header";
import { LuArrowLeft, LuLogOut } from "react-icons/lu";
import { useRecoilValue } from "recoil";
import { user } from "../store/atoms";
import ProjectCard from "../components/ProjectCard";

import '../components/styles/CodeEditor.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


const Profile = () => {

  const userInfo = useRecoilValue(user);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/");
    window.location.reload();
  }

  const fetchProjects = async() => {

    try{

      const response = await axios.get(`${BACKEND_URL}/api/v1/project/user/${userId}`, {headers: {
        Authorization: localStorage.getItem("token")
      }});
      if(response?.data?.projects!=null){
        setProjects(response.data.projects);
      }

      setLoading(false);

    }catch(err){
      console.log(err);
      setLoading(false);
    }


  }

  useEffect(() => {
    fetchProjects();

  }, []);

  return (
    <>

      <Header />

      {/* Body */}

      <div className="
        w-full bg-background
        flex flex-col items-center
        h-[90vh]
      ">

        {/* Header */}
        <div className="
          w-full h-[6vh]
          px-4
          text-white
          border-t-[0.5px]
          border-solid
          border-slate-700
          flex
          flex-row
          items-center
          justify-between
        ">

          <Link to={"/"} className="flex flex-row items-center" > 
            <LuArrowLeft className="mr-2" /> Back
          </Link>

          <button onClick={logout} className="cursor-pointer hover:bg-slate-800 p-2 flex flex-row items-center" >
            Logout <LuLogOut className="ml-1" />
          </button>

        </div>

        <div className="
          flex flex-row w-full
        ">

          {/* First Block */}
          <div className="
            w-[50%]
            border-r-[0.5px]
            border-solid
            border-slate-700
            h-[80vh]
            px-6
            py-4
            flex
            flex-col
            gap-3
          "> 

            <img src={userInfo?.profilePic || "/user.png"} 
              alt="Profile Image" 
              className="
                w-40
                h-40
                rounded-lg
                mx-auto
              "
            />

            <h1 className="
              text-white text-2xl
            ">
              {userInfo?.name}
            </h1>

            <h2 className="
              text-slate-300 text-lg
            ">
              @{userInfo?.username}
            </h2>

            <p className="
              text-white text-sm
            "> 
              Joined on 27/12/2024
            </p>

            <p className="
              text-white
            ">
              {userInfo?.bio}
            </p>


          </div>


          {/* Second Block */}
          <div 
            className="
              w-[50%]
              h-[80vh]
              max-h-[80vh]
              px-6
              py-4
              flex
              flex-col
            "
          >

            <h1 className="
              text-white
              text-xl
            ">
              Projects
            </h1>

            <div className="
              max-h-full
              overflow-y-scroll
              scrollbar-hidden
            ">

              {
                loading ? (
                  <>
                    <ProjectCard id="jfkd" name="name" visibility="Public" language="Javascript" />
                    <hr className="h-px my-1 border-0 bg-gray-700"></hr>
                    
                  </>
                ) : (
                  projects.map((project, i) => (
                    <div key={i}>  
                      <ProjectCard id={project.id || ""} name={project.name || ""} visibility={project.visibility || ""} language={project.file.language || ""}  />
                      <hr className="h-px my-1 border-0 bg-gray-700"></hr>
                    </div>
                  ))
                )
              }


            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Profile;