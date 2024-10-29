import React, { useState } from 'react';
import { useRecoilState} from 'recoil';
import { authModal } from '../../store/atoms';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

interface authModalProps{
    onSubmit: () => void;
    type:"login" | "signup";
}

const AuthModal:React.FC<authModalProps> = ({
    onSubmit,
    type,
}) => {

    const [isOpen, setIsOpen] = useRecoilState(authModal);
    const [modal, setModal] = useState<string>(type);
    const [loading, setLoading] = useState(false);

 
  return (
    <div className={twMerge(`
            overflow-y-auto overflow-x-hidden  
            top-0 right-0 left-0 z-10
            justify-center items-center 
            w-full md:inset-0 h-screen
            max-h-full
        `, isOpen?"fixed":"hidden")}
    >
        <div className="relative w-full h-screen  flex items-center justify-center">
            {/* <!-- Modal content --> */}
            <div 
                onClick={() => setIsOpen(false)}
                className='
                fixed
                bg-background
                h-screen
                w-full
                z-20
                bg-opacity-35
            ' />
            <div className="relative z-30 w-full max-w-md max-h-full bg-dark-gray rounded-lg shadow">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {modal==="login" ? "Sign in to our platform" : "Sign Up"}
                    </h3>
                    <button type="button" 
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 
                        hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                        justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                        onClick={() => setIsOpen(false)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                        {   modal==="signup" &&
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="text" name="name" className="bg-dark-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                            </div>
                        }
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-dark-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-dark-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <Button 
                            primary
                            type="submit" 
                            className="w-full text-white focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                             text-center flex justify-center"
                             text={loading ?
                                (modal=="login" ? "Logging in..." : "Creating account...") :
                                (modal==="login" ? "Login to your account" : "Register")}
                            onClick={() => {}}
                        />      
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {modal==="login" ? "Not registered?" : "Already have an account?"}  
                        <button onClick={() => {
                            if(modal=="login"){
                                setModal("signup");
                            }
                            else{
                                setModal("login");
                            }
                        }} className="text-primary hover:underline ml-2">
                            {modal==="login" ? "Create account" : "Login"}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default AuthModal