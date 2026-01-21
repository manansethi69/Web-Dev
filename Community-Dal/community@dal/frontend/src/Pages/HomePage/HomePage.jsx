import React, { useEffect, useState } from 'react'
import Top from "../../Components/Top/Top";
import HomeRight from "../../Components/HomeRight/HomeRight";
import Post from "../../Components/Post/Post";
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const HomePage = () => {
    const userId = localStorage.getItem('userId');
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + `/posts/feed/${userId}`).then(res => {
            console.log(res.data)
            setPosts(res.data)
        }).catch(err => {
            console.log(err)
        });
    }, []);
    return(
        <div>
            <div className="mt-10 flex w-[100%] justify-center">
                <div className="w-[44%] px-10">
                    <div className="storyDiv flex justify-center items-center border p-4 rounded-md w-full"
                         style={{height: "50px", width: "200px", margin: "0 auto"}}>
                        <Top/>
                    </div>
                    <div className="space-y-10 w-full mt-10">
                        {posts.length > 0 ? posts.map((item, idx) => <Post key={idx} post={item}/>) : <>No posts</>}
                    </div>
                </div>
                <div className="w-[35%]">
                    <HomeRight/>
                </div>
            </div>
        </div>
    )
}

export default HomePage