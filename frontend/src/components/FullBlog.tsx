import "rsuite/dist/rsuite.min.css";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Blog, deleteBlog } from "@/hooks";
import { useState } from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function FullBlog({
  blog,
  likedByUser,
  createdByUser,
}: {
  blog: Blog;
  likedByUser: boolean;
  createdByUser: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const navigate = useNavigate();
  const [newLikedByUser, setNewLikedByUser] = useState(likedByUser);
  const handleDelete = async() => {
    setDelLoading(true);
    const checkDeletion = await deleteBlog(blog.id);
    if(checkDeletion){
    navigate("/blogs");
    }
    else
    {
      alert("Error while deleting the blog");
    }
    setDelLoading(false);
  }
  const handleLike = async () => {
    setLoading(true);
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blogs/likes/${blog.id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
            isLiked: newLikedByUser,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.data.message === "Liked") {
            setNewLikedByUser(true);
            blog.likes += 1;
          } else if (res.data.message === "Unliked") {
            setNewLikedByUser(false);
            blog.likes -= 1;
          } else {
            alert("Error while liking the blog");
          }
        });
    } catch {
      setLoading(false);
      alert("Error while liking the blog");
    }
    // console.log(likedByUser);
  };
  // console.log(likedByUser);
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-background rounded-lg overflow-hidden shadow-lg">
        <img
          src={blog.imagesrc}
          alt="Blog Post Image"
          // width={800}
          // height={450}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-6 ">
          <h1 className="text-3xl w-full font-bold mb-4 mr-4 break-words text-pretty">
            {blog.title}
          </h1>
          <div className="flex items-center mb-4 text-sm text-muted-foreground">
            <Avatar className="w-8 h-8 mr-2">
              {/* <AvatarImage src="/placeholder-user.jpg" /> */}
              <AvatarFallback>
                {blog.author.name.charAt(0) + blog.author.name.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex space-x-5">
              <div>{blog.author.name}</div>
              <div>Published At : {blog.publishedAt.substring(0, 10)}</div>
            </div>
          </div>
          <div className="flex mb-2 justify-between text-lg">
            <div className="flex items-center">
              <img
                src={"/icons/view-eye.svg"}
                alt={"Home"}
                width={25}
                height={25}
                className="mr-4"
              />
              <span>Views: {blog.views}</span>
            </div>
            <div className="flex items-center">
              {!loading 
              ?(<div >
                {newLikedByUser ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleLike}
                    fill="none"
                    viewBox="0 0 24 24"
                    width={25}
                    height={25}
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-4 fill-red-500 hover:fill-white hover:cursor-pointer hover:scale-110 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleLike}
                    fill="none"
                    viewBox="0 0 24 24"
                    width={25}
                    height={25}
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-4 hover:fill-red-500 hover:cursor-pointer hover:scale-110 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </div>)
            :(<></>)}
              <span>Likes: {blog.likes}</span>
            </div>
          </div>
          <div className="prose prose-lg text-lg">
            <p>{blog.content}</p>
          </div>
          {createdByUser 
          ?(
            <div className="flex flex-row justify-end mt-4 items-center">
              <Button className="font-semibold text-xl items-center pt-1" onClick={handleDelete} disabled={delLoading}>
              Delete
            </Button>
            </div>
            )
          :(<></>)}   
        </div>
      </div>
    </div>
  );
}
