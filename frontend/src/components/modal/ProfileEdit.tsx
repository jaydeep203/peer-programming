import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue} from 'recoil';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { profileEditModal, user } from '../../store/atoms';
import toast from 'react-hot-toast';


const ProfileEdit = () => {

    const [isOpen, setIsOpen] = useRecoilState(profileEditModal);
    const userInfo = useRecoilValue(user);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState(null);
    const cloudName = "dgasfvjei";
    const uploadPreset = "h0ca77es";

    const submit = async(e:any) => {
        e.preventDefault();
        setLoading(true);
        
        try{

            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/profile`, {
                name, email, username, bio, profilePic
            }, {
                headers: {Authorization: localStorage.getItem("token")}
            });
    
            toast.success("Profile updated!");
            setEmail("");
            setName("");
            setUsername("");
            setLoading(false);
            setProfilePic("");
            window.location.reload();

        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error("Unable to update profile!");
        }
        
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const handleUpload = async () => {
        if (!selectedFile) {
          toast.error("First select file!");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", uploadPreset);
    
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );
          setProfilePic(response.data.secure_url);
          console.log(profilePic);
          toast.error("Image uploaded successfully!");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image!");
        }
      };

    useEffect(() => {
        setName(userInfo?.name);
        setEmail(userInfo?.email);
        setUsername(userInfo?.username);
        setBio(userInfo?.bio);
        setProfilePic(userInfo?.profilePic);
    }, [userInfo]);
 
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
                <div className="relative z-30 w-full max-w-md max-h-full overflow-y-scroll bg-dark-gray rounded-lg shadow">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Profile
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
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" 
                                        name="name" 
                                        className="bg-dark-gray border border-gray-300 
                                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                        block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 
                                        dark:text-white" placeholder="John Doe" required 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" 
                                    className="bg-dark-gray border border-gray-300 text-gray-900 
                                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                    p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="name@company.com" required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}    
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" 
                                        className="bg-dark-gray border border-gray-300 
                                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                        block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 
                                        dark:text-white" placeholder="username" required 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                                <input type="text" placeholder="Type Your Bio" 
                                className="bg-dark-gray border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
                                dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}    
                            />
                            </div>

                            <div className='
                                flex
                                flex-col
                                gap-2
                                text-white
                            '>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Profile Picture</label>
                                <input type="file" onChange={handleFileChange} />
                                <button className='
                                    border
                                    border-white
                                    rounded-md
                                    p-1
                                ' type='button' onClick={handleUpload}>
                                    Upload Image
                                </button>

                                {profilePic && (
                                    <div className="uploaded-image-preview">
                                    <h3>Uploaded Image:</h3>
                                    <img src={profilePic} alt="Uploaded" style={{ width: "300px" }} />
                                    </div>
                                )}
                            </div>
                            
                            <Button 
                                primary
                                type="submit" 
                                className="w-full text-white focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                                text-center flex justify-center"
                                text={"Update"}
                                disabled={loading}
                                loading={loading}
                                onClick={() => submit}
                            />      
                            
                        </form>
                    </div>
                </div>
            </div>
        </div> 
  )
}

export default ProfileEdit;