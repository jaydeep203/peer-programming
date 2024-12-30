
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authModal, createProjectModal, isLoggedIn, user } from '../../store/atoms';
import Button from '../ui/Button'
import { Link, useLocation} from 'react-router-dom'
import { LuInfo, LuPlus, LuUser } from 'react-icons/lu';

const Header = () => {
  const pathname = useLocation().pathname;

  const [isOpen, setIsOpen] = useRecoilState(authModal);
  const createProject = useSetRecoilState(createProjectModal);
  const loggedIn = useRecoilValue(isLoggedIn);
  const userId = useRecoilValue(user)?.userId || "";

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
            <button onClick={() => createProject(true)}  className="text-white hover:text-primary-hover transition flex flex-row items-center">
              New Project <LuPlus className='ml-1' />
            </button>
            <Link to={"/about"} className={`${pathname=="/about" ? "text-primary" : "text-white hover:text-primary-hover transition"} flex flex-row items-center`}>
              About <LuInfo className='ml-1' />
            </Link>
          </nav>
        </div>

        {
          loggedIn ? (
            <Link to={`/profile/${userId}`} className='text-white hover:bg-slate-800 p-2 cursor-pointer' ><LuUser /> </Link>
          ) : (
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
          )
        }

        
        
      </header>
  )
}

export default Header