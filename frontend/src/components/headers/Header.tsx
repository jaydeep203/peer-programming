
import { useRecoilState } from 'recoil';
import { authModal } from '../../store/atoms';
import Button from '../ui/Button'
import { Link, useLocation} from 'react-router-dom'

const Header = () => {
  const pathname = useLocation().pathname;

  const [isOpen, setIsOpen] = useRecoilState(authModal);
  const modalOpen = () => {
    if(!isOpen){
      setIsOpen(prev => !prev);
    }
  }


  return (
    <header className="
        w-full h-[10vh] bg-background
        px-8
        flex
        flex-row
        justify-between
        items-center
        text-white
      ">
        <div className="
          flex flex-row justify-between items-center
          w-[25%]
        ">
          <Link to={"/"} className="flex flex-row items-center">
            <img src="/Logo.png" className="w-14 h-14" />
            <h1 className='font-extrabold text-xl'>
              PeerPro
            </h1>
          </Link>
          <nav className="
            flex
            flex-row
            items-center
            gap-8
          ">
            <Link to={"/project"} className={`${pathname=="/project" ? "text-primary" : "text-white"}`}>
              New Project
            </Link>
            <Link to={"/about"} className={`${pathname=="/about" ? "text-primary" : "text-white"}`}>
              About
            </Link>
          </nav>
        </div>

        <div className="flex flex-row gap-3">
          <Button 
            text="Sign up" 
            primary
            onClick={modalOpen}
          />
          <Button 
            text="Login" 
            primary={false}
            onClick={modalOpen}
          />
        </div>
        
      </header>
  )
}

export default Header