import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    author:{
        name:string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([]);
        useEffect(() => {

            try{
                axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`,{
                    headers: {
                        Authorization:localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    // console.log(res.data)
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

export const useBlog = ({id} : { id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>();
        useEffect(() => {

            try{
                axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`,{
                    headers: {
                        Authorization:localStorage.getItem('token')
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

export const usersBlog = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([]);
        useEffect(() => {

            try{
                axios.get(`${BACKEND_URL}/api/v1/blogs/user/profile`,{
                    headers: {
                        Authorization:localStorage.getItem('token')
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