import { useSetRecoilState } from "recoil"
import Button from "./ui/Button"
import { authModal } from "../store/atoms"


const Hero = () => {
  const setOpen = useSetRecoilState(authModal);

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
          <Button 
            className="bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-lg 
            "
            text="Sign up for free"
            onClick={() => setOpen(true)}
            primary
          />
          <Button 
            className="bg-secondary text-secondary-text hover:bg-secondary-hover px-6 py-3 
            rounded-lg hover:bg-sky-blue"
            text="Start Building"
            primary={false}
            onClick={()=>{}}
          />
        </div>


    </div>

    </>
  )
}

export default Hero