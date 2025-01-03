import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";



const CopyUrl = () => {

    const handleCopy = async() => {
        const url = window.location.href;

        try{

            await navigator.clipboard.writeText(url);
            toast.success("Text Copied!")

        }catch(err){
            console.error(err);
            toast.error("Unable to copy!")
        }
    }

  return (
    <div className="w-full max-w-full">
        <div className="mb-2 flex justify-between items-center">
            <label for="website-url" className="text-sm font-medium text-white">
                Project Link:
            </label>
        </div>
        <div className="flex items-center">
            <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                URL
            </span>
            <div className="relative w-full">
                <input id="website-url" type="text" aria-describedby="helper-text-explanation" className="bg-dark-gray border border-e-0 border-gray-500
                 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:focus:border-blue-500" 
                value={window.location.href} readOnly disabled />
            </div>
            <button 
                onClick={handleCopy}
                className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white 
                bg-primary rounded-e-lg hover:bg-primary-hover border border-primary-hover h-full
                focus:ring-4 focus:outline-none focus:ring-blue-300" type="button"
            >
                <LuCopy />
            </button>
        </div>
    </div>
  )
}

export default CopyUrl