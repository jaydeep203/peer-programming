import React, { useState } from 'react';
import { useRecoilState} from 'recoil';
import { projectShareModal } from '../../store/atoms';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { LuEye, LuGlobe, LuGlobeLock } from 'react-icons/lu';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useParams } from 'react-router-dom';
import CopyUrl from '../ui/CopyUrl';
import toast from 'react-hot-toast';

interface projectShareProps{
    visible:string;
}

const ProjectShareModal:React.FC<projectShareProps> = ({
    visible
}) => {

    const [isOpen, setIsOpen] = useRecoilState(projectShareModal);
    const [visibility, setVisibility] = useState<string>(visible);
    const [loading, setLoading] = useState(false);
    const {projectId} = useParams();

    const Icon = (visibility=="Private") ? LuGlobeLock : LuGlobe;

    

    const submit = async(e:any) => {
        e.preventDefault();
        setLoading(true);

        try{

            await axios.put(`${BACKEND_URL}/api/v1/project/${projectId}`, {
                visibility
            }, {headers: {Authorization:localStorage.getItem("token")}});
            
            toast.success("Project visibility updated!");

        }catch(err){
            console.log(err);
            toast.error("Unable to update project!");
        }

        setLoading(false);
        window.location.reload();
        setIsOpen(false);
    }

 
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex flex-row gap-2 items-center">
                        Share Project with anyone <LiaUserFriendsSolid className='h-8 w-8' />
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
                    <form onSubmit={submit} className="space-y-4" action="#">
                        
                        
                        <div className='flex flex-col gap-4'>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                Share this project with anyone.
                            </label>
                            <p className='text-sm text-neutral-300'>
                                *Anyone with the link can see and edit the Code.
                            </p>
                            <p className='flex flex-row gap-2 items-center'>
                                <strong>Visibility</strong> - {visibility} <Icon />
                            </p>

                            <CopyUrl />

                            <div>
                                <label className="mb-2 text-sm font-medium text-white flex flex-row justify-left items-center">Set Who can view <LuEye className='ml-2' /></label>
                                    <select defaultValue={visible} onChange={(e) => setVisibility(e.target.value)} id="countries" className="bg-dark-gray border text-sm 
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white">
                                        <option value="Private">Private</option>
                                        <option value="Public">Public </option>
                                    </select>         
                            </div>
                        </div>
                        <Button 
                            primary
                            type="submit" 
                            className="w-full text-white focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                             text-center flex justify-center"
                             text={loading? "Loading..." : "Confirm"}
                            onClick={() => submit}
                            disabled={loading}
                        />      
                        
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default ProjectShareModal