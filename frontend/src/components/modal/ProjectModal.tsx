import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { createProjectModal } from '../../store/atoms';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { LuComputer, LuEye} from 'react-icons/lu';

const ProjectModal = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useRecoilState(createProjectModal);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("C++");
    const [visibility, setVisibility] = useState<string>("private");
    const [loading, setLoading] = useState(false);

    const submit = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try{

            const response = await axios.post(`${BACKEND_URL}/api/v1/project/`, {name, description, visibility, }, {
                headers: {Authorization: localStorage.getItem("token")}
            });

            if(response.data.project.id){
                setName("");
                setDescription("");
                setVisibility("private");
            }

            await axios.post(`${BACKEND_URL}/api/v1/${response.data.project.id}/`, {language, content:""}, {
                headers: {Authorization: localStorage.getItem("token")}
            });

            setLanguage("C++");
            navigate(`/project/${response.data.project.id}/`);

        }catch(err){
            console.log(err);
        }

        setIsOpen(false);
        setLoading(false);
        
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Create Project
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
                        
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                            <input type="text" 
                            className="bg-dark-gray border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                            p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            placeholder="Name of Project" required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                            <input type="text" placeholder="Description" 
                            className="bg-dark-gray border text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
                            border-gray-500 placeholder-gray-400 text-white" required 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}    
                        />
                        </div>
                        {/* Visibility */}
                        <div>
                            <label className="mb-2 text-sm font-medium text-white flex flex-row justify-left items-center">Who can view <LuEye className='ml-2' /></label>
                            <select onChange={(e) => setVisibility(e.target.value)} id="countries" className="bg-dark-gray border text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white">
                                <option selected value="Private">Private</option>
                                <option value="Public">Public </option>
                            </select>  
                        
                        </div>
                        {/* Language */}
                        <div>
                            <label className="mb-2 text-sm font-medium text-white flex flex-row justify-left items-center">Select Language <LuComputer className='ml-2' /></label>
                            <select defaultValue={"C++"} onChange={(e) => setLanguage(e.target.value)} id="countries" className="bg-dark-gray border text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white">
                                <option value="C++">C++</option>
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                                <option value="Javascript">Javascript</option>
                            </select>  
                        
                        </div>

                        <Button 
                            primary
                            type="submit" 
                            className="w-full text-white focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                            text-center flex justify-center"
                            text={
                                loading ? "Creating project..." : "Create Project"
                            }
                            onClick={() => submit}
                        /> 
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default ProjectModal