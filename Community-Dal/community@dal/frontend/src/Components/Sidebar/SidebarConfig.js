import {
    AiFillHome,
    AiFillMessage, AiFillPlusCircle,
    AiOutlineHome,
    AiOutlineMessage, AiOutlinePlusCircle,
    AiOutlineSearch
} from "react-icons/ai";
import {IoIosNotificationsOutline, IoMdNotifications} from "react-icons/io";
import {CgProfile} from "react-icons/cg";
import {FaUserShield} from "react-icons/fa";
import {MdGroup, MdOutlineGroup} from "react-icons/md";

export const mainu=[
    {title: "Home", icon: <AiOutlineHome className='text-2xl mr-5'></AiOutlineHome>, activeIcon:<AiFillHome className='text-2xl mr-5'></AiFillHome>},
    {
        title:"Search", icon:<AiOutlineSearch className='text-2xl mr-5'></AiOutlineSearch>, activeIcon: <AiOutlineSearch className='text-2xl mr-5'></AiOutlineSearch>
    },
    {
        title: "Groups", icon: <MdOutlineGroup className='text-2xl mr-5'></MdOutlineGroup>, activeIcon: <MdGroup className='text-2xl mr-5'></MdGroup>
    },
    {
        title:"Message", icon:<AiOutlineMessage className='text-2xl mr-5'></AiOutlineMessage>, activeIcon: <AiFillMessage className='text-2xl mr-5'></AiFillMessage>
    },
    {
        title:"Notification", icon:<IoIosNotificationsOutline className='text-2xl mr-5'></IoIosNotificationsOutline>, activeIcon: <IoMdNotifications className='text-2xl mr-5'></IoMdNotifications>
    },
    {
        title: "Create", icon: <AiOutlinePlusCircle className='text-2xl mr-5'></AiOutlinePlusCircle>, activeIcon: <AiFillPlusCircle className='text-2xl mr-5'></AiFillPlusCircle>
    },
    {
        title: "Profile", icon: <CgProfile className='text-2xl mr-5'></CgProfile>, activeIcon: <CgProfile className='text-2xl mr-5'></CgProfile>
    },
    {
        title: "Admin", icon: <FaUserShield className='text-2xl mr-5'></FaUserShield>, activeIcon: <FaUserShield className='text-2xl mr-5'></FaUserShield>
    }
]