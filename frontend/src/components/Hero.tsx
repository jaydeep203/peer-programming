import { useRecoilValue, useSetRecoilState } from "recoil"
import Button from "./ui/Button"
import { authModal, createProjectModal, isLoggedIn } from "../store/atoms"


const Hero = () => {
  const setOpen = useSetRecoilState(authModal);
  const setProject = useSetRecoilState(createProjectModal);
  const loggedIn = useRecoilValue(isLoggedIn);



  return (
    <>
    <div className="
        w-full bg-background
        flex flex-col items-center justify-center
        h-[90vh]
    ">

        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
          Build Software Faster and Together
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">It is a platform for building, shipping, and collaborating together to make things good.</p>
        <div className="flex space-x-4">

          {
            loggedIn ? (
              <Button 
                className="bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-lg 
                  "
                text="Start Building"
                primary={false}
                onClick={()=> setProject(true)}
              />
            ) : (
              <>
              
                <Button 
                  className="bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-lg 
                  "
                  text="Start Building"
                  primary={false}
                  onClick={() => setOpen(true)}
                />
                <Button 
                  className="bg-secondary text-secondary-text hover:bg-secondary-hover px-6 py-3 
                  rounded-lg hover:bg-sky-blue"
                  text="Sign up for free"
                  onClick={() => setOpen(true)}
                  primary
                />

              </>
            )
          }
          
          
        </div>


    </div>

    </>
  )
}

export default Hero