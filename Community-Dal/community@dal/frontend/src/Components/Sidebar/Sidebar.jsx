import React, {useState} from 'react'
import {IoReorderFour} from "react-icons/io5";
import {mainu} from "./SidebarConfig";
import {useNavigate} from "react-router-dom";
import SearchComponents from "../SearchComponents/SearchComponents";

const Sidebar = () => {
    const [activeTab,setActiveTab]=useState();
    const navigate=useNavigate();
    const [isSearchVisible, setIsSearchVisible]=useState(false);

    const handleTabClick=(title)=>{
        setActiveTab(title);
        if(title==="Profile"){
            navigate("/profile");
        }
        else if(title==="Home"){
            navigate("/");
        }
        else if (title === "Groups") {
            navigate("/groups");
        }
        else if(title==="Admin"){
            navigate("/admin");
        }
        if(title==="Search"){
            setIsSearchVisible(true)
        }
        else setIsSearchVisible(false)
    };

    return(
        <div className="sticky top-0 h-[100vh] flex">
            <div className={`flex flex-col justify-between h-full ${activeTab==="Search"?"px-2":"px-10"}`}>
                <div>
                    {activeTab!=="Search" && <div className="pt-10">
                        <img className="w-40" src="/logodal.svg" alt="logo"/>
                    </div>}
                    <div className="mt-10">

                        {mainu.map((item,idx) => (
                            <div key={idx} onClick={()=> handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>

                                {activeTab===item.title? item.activeIcon: item.icon}
                                {activeTab!=="Search" &&<p className={`${activeTab===item.title?"font-bold":"font-semibold"}`}>{item.title}</p>}

                            </div>))}

                    </div>
                </div>
                <div className='flex items-center cursor-pointer pb-10'>
                    <IoReorderFour className="text-2xl"/>
                    {activeTab!=="Search" &&<p className='ml-5'>More</p>}
                </div>
            </div>

            {isSearchVisible && <SearchComponents/>}

        </div>
    )
}

export default Sidebar