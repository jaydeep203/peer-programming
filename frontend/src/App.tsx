import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import AuthModal from './components/modal/AuthModal';
import { useSetRecoilState } from 'recoil';
import ProjectModal from './components/modal/ProjectModal';
import { useEffect } from 'react';
import { isLoggedIn, user } from './store/atoms';
import axios from 'axios';
import { BACKEND_URL } from './config';
import Profile from './pages/Profile';



function App() {

  

  const setIsLoggedin = useSetRecoilState(isLoggedIn);
  const setUser = useSetRecoilState(user);

  const fetchUser = async() => {

    try{

        const token = localStorage.getItem("token");
        if(!token){
            setIsLoggedin(false);
            setUser(null);
            return ;
        }
        const response = await axios.get(`${BACKEND_URL}/api/v1/auth/verify`, {headers: {
            Authorization: token
        }});

        if(response.data.user != null){
            setIsLoggedin(true);
            setUser(response.data.user);
            return ;
        }

        setIsLoggedin(false);
        setUser(null);
        return ;


    }catch(err){
        console.log(err);
        setIsLoggedin(false);
        setUser(null);
        return ;
    }


};
  
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <BrowserRouter>
        <AuthModal />
        <ProjectModal />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/project/:projectId"} element={<Project />} />
          <Route path={"/profile/:userId"} element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
