import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedAt: string;
  id: string;
  imagesrc: string;
  views: number;
  likes: number;
  likedBY: string[];
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedAt,
  id,
  imagesrc,
  views,
  likes,
  likedBY,
}: BlogCardProps) => {
  // console.log(views);
  // console.log(likedBY + "liked by");
  // console.log(localStorage.getItem('userId' + "localstorage id"));
  // console.log(likedBY.includes(localStorage.getItem('userId') as string) + "includes");
  // console.log(likedBY.length + "length");
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-black hover:shadow-xl">
      <Link to={`/blogs/${id}`}>
        <img
          src={imagesrc}
          alt="Blog Post Image"
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4 bg-slate-300">
        <Link
          to={`/blogs/${id}`}
          className="block mb-4 text-xl font-extrabold hover:text-primary transition-colors"
        >
          {title}
        </Link>
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <Avatar className="w-8 h-8 ml-2">
            {/* <AvatarImage src="/placeholder-user.jpg" /> */}
            <AvatarFallback>
              {authorName.charAt(0) + authorName.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex justify space-x-5 mr-2">
            <Link to={`/profile/${authorName}`}>{authorName}</Link>
            <div>Published At : {publishedAt}</div>
          </div>
        </div>
        <div className="flex mb-2 justify-between">
          <div className="flex items-center">
            <img
              src={"/icons/view-eye.svg"}
              alt={"Home"}
              width={20}
              height={20}
              className="mr-1"
            />
            <span>Views: {views}</span>
          </div>
          <div className="flex items-center">
            {likedBY.length>0 && likedBY.includes(localStorage.getItem('userId') as string)
            ? (<img
              src={"/icons/red-heart-icon.svg"}
              alt={"Home"}
              width={20}
              height={20}
              className="mr-1"
            />)
            : (<img
              src={"/icons/heart-svgrepo-com.svg"}
              alt={"Home"}
              width={20}
              height={20}
              className="mr-1"
            />)}
            <span>Likes: {likes}</span>
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-3">{content}</p>
      </div>
    </div>
  );
};
