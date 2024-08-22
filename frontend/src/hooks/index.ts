import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    imagesrc: string;
    author: {
        name: string
    }
}

// export const useBlogs = (page:number) => {
//     const [loading, setLoading] = useState(true)
//     const [blogs, setBlogs] = useState<Blog[]>([]);
//     useEffect(() => {

//         try {
//             axios.get(`${BACKEND_URL}/api/v1/blogs/bulk/${page}`, {

//                 headers: {
//                     Authorization: localStorage.getItem('token')
//                 }
//             })
//                 .then((res) => {
//                     // console.log(res.data)
//                     setBlogs(res.data)
//                     setLoading(false)

//                 })
//         } catch (e) {
//             alert(e)
//         }
//     }
//         , [])
//     return {
//         loading,
//         blogs
//     }
// }

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {

        try {
            axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    setBlog(res.data.blog)
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
        blog
    }
}

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