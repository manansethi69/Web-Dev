import React from 'react'
import {AiFillHeart} from "react-icons/ai";
import {FaComment} from "react-icons/fa";
import "./RequestUserPostCard.css"

const RequestUserPostCard= () => {
    return(
        <div className="p-2">
            <div className="post w-60 h-60">
                <img className='cursor-pointer' src="https://cdn.pixabay.com/photo/2024/06/06/13/55/woman-8812775_640.png" alt="" />
                <div className="overlay">
                    <div className="overlay-text flex justify-between">
                        <div>
                            <AiFillHeart></AiFillHeart> <span>10</span>
                        </div>
                        <div><FaComment/> <span>30</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestUserPostCard