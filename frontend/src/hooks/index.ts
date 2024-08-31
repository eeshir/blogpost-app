import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    imagesrc: string;
    views: number;
    author: {
        name: string
    }
    likes: number;
    likedBy: string[];
}

export const deleteBlog = async(id: string):Promise<boolean> => {
    // console.log("1")
    try {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/blogs/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        // console.log(res.data.message);
        return res.data.message === "Blog Deleted";
    } catch (error) {
        // console.error("Error deleting blog:", error);
        return false;
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>();
    const [likedByUser, setLikedByUser] = useState(false)
    const [createdByUser, setCreatedByUser] = useState(false)
    useEffect(() => {

        try {
            axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    setBlog(res.data.blog)
                    // console.log(res.data.likedByUser + "index")
                    setLikedByUser(res.data.likedByUser)
                    setCreatedByUser(res.data.createdByUser)
                    // console.log(blog)
                    // console.log(res.data.blog)
                    setLoading(false)

                })
        } catch (e) {
            alert(e)
        }
    }
        , [])
    return {
        loading,
        blog,
        likedByUser,
        createdByUser
    }
}

// export const likedBlog = ({id,isLiked}:{id:string,isLiked:boolean})=>{
//     const [newloading, setLoading] = useState(true)
//     useEffect(() => {
//         try{
//             axios.get(`${BACKEND_URL}/api/v1/blogs/likes/${id}`, {
//                 headers: {
//                     Authorization: localStorage.getItem('token'),
//                     isLiked:isLiked
//                 }
//             }).then((res)=>{
//                 setLoading(false)
//                 if(res.data.message === "Liked"){
//                     isLiked = true
//                 }
//                 else if(res.data.message === "Unliked"){
//                     isLiked = false
//                 }
//                 else{
//                     alert("Error while liking the blog")
//                 }
//             })
//         }
//         catch{
//             setLoading(false)
//             alert("Error while liking the blog")

//         }
//     },[])
//     const newisLiked = isLiked
//     return{newisLiked,newloading}
// }

export const usersBlog = ({ user }: { user: string }) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {

        try {
            axios.get(`${BACKEND_URL}/api/v1/blogs/profile/${user}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    setBlogs(res.data)
                    setLoading(false)

                })
        } catch (e) {
            alert(e)
        }
    }
        , [])
    return {
        loading,
        blogs
    }
}