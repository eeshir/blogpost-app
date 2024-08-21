import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedAt: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedAt,
  id,
}: BlogCardProps) => {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg">
      <Link to={`/blogs/${id}`}>
        <img
          src={"/icons/placeholder.svg"}
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
        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
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
        <p className="text-muted-foreground line-clamp-3">{content}</p>
      </div>
    </div>
  );
};
