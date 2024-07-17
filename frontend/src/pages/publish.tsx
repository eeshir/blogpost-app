import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BACKEND_URL } from "@/config";
import axios from "axios";

export default function publish() {
    const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
//   const [author, setAuthor] = useState("");
//   const [image, setImage] = useState(null);
  const handlePublish = async () => {
    if(!title || !content){
        return alert("Please fill all the fields");
    }
    const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`,{
        title,
        content,
    },{
        headers:{
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    navigate(`/blogs/${response.data.id}`);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <Link to={"/blogs"} className="text-2xl font-bold">
            Blog Website
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {/* <Link
              to={"/blogs"}
              className="text-sm font-medium hover:text-primary-foreground/80 transition-colors"
            >
              Home
            </Link> */}
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-background rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Publish a Blog Post</h1>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                      required
                    />
                  </div>
                  {/* <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div> */}
                  {/* <div>
                    <Label htmlFor="image">Cover Image</Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div> */}
                  <Button
                    type="button"
                    onClick={handlePublish}
                    // disabled={loading}
                    className="w-full"
                  >
                    Publish
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <p className="text-sm">
            &copy; 2023 Blog Website. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            <Link
              to={"/abc"}
              className="text-sm hover:text-muted-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/abc"}
              className="text-sm hover:text-muted-foreground/80 transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
