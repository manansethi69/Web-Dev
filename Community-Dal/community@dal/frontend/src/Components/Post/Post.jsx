import React, {useState} from 'react'
import {BsThreeDots} from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa";
import {RiSendPlaneLine} from "react-icons/ri";

const Post = (item) => {
    const [isPostLiked, setIsPostLiked]=useState(false);

    const handlePostLike=()=>{
        setIsPostLiked(!isPostLiked);
    }
    return(
        <div>
            <div className="border rounded-md w-full">
                <div className="flex justify-between items-center w-full px-4 py-5">
                    <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full" src="https://cdn.pixabay.com/photo/2022/02/06/14/06/dog-6997211_640.jpg" alt=""/>
                        <div className="pl-2">
                            <p className="font-semibold text-sm">{item.post.title}</p>
                            <p className="font-thin text-sm">{item.post.user.username}</p>
                        </div>
                    </div>
                    <div>
                        <BsThreeDots/>
                    </div>
                </div>

                <div className="w-full">
                    <img className="w-full" src="https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_640.jpg" alt=""/>
                </div>

                <div className="flex justify-between items-center w-full px-5 py-4">
                    <div className="flex items-center space-x-2">
                    <p className="font-semibold text-sm">{item.post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post