import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import stockImg from "../placeholder.svg";

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
          src={stockImg}
          alt="Blog Post Image"
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/blogs/${id}`}
          className="block mb-2 text-lg font-semibold hover:text-primary transition-colors"
        >
          {title}
        </Link>
        <div className="flex items-center mb-4 text-sm text-muted-foreground">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {authorName.charAt(0) + authorName.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex space-x-5">
            <div>{authorName}</div>
            <div>Published At : {publishedAt}</div>
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-3">{content}</p>
      </div>
    </div>
  );
};
