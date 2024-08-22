import "rsuite/dist/rsuite.min.css";
import { Avatar,  AvatarFallback } from "@/components/ui/avatar";
import { Blog } from "@/hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-background rounded-lg overflow-hidden shadow-lg">
        <img
          src={blog.imagesrc}
          alt="Blog Post Image"
          width={800}
          height={450}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center mb-4 text-sm text-muted-foreground">
            <Avatar className="w-8 h-8 mr-2">
              {/* <AvatarImage src="/placeholder-user.jpg" /> */}
              <AvatarFallback>
                {blog.author.name.charAt(0) + blog.author.name.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex space-x-5">
            <div>{blog.author.name}</div>
            <div>Published At : {blog.publishedAt.substring(0,10)}</div>
          </div>
          </div>
          <div className="prose prose-lg">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
