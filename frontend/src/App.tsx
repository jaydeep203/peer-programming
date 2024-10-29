import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import AuthModal from './components/modal/AuthModal';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <AuthModal 
          type="login"
          onSubmit={()=>{}}
        />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/project"} element={<Project />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
