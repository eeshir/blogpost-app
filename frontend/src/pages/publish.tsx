import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_URL } from "@/config";
import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";
import axios from "axios";
import Footer from "@/components/Footer";

export default function publish() {
  const navigate = useNavigate();
  AuthChecker({ page1: "", page2: "/signup" });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const handlePublish = async () => {
    if (!title || !content || !image) {
      return alert("Please fill all the fields correctly");
    }
    if(title.length > 80){
      setError("Title should be less than 80 characters.");
      return ;
    }
    if(image.size > 5242880){
      setError("File size too large. Please upload an image file less than 5MB.");
      return;
    }
    if(!validFileTypes.includes(image.type)){
      setError("Invalid file type. Please upload a valid image file (JPG, JPEG, PNG).");
      return;
    }
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("content", content);
      // console.log(formData);
      // console.log(image);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blogs`,formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      navigate(`/blogs/${response.data.id}`);
    }
    catch(e){
      // console.log(e);
      setLoading(false);
      setError("Error while publishing the blog post. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        userName={localStorage.getItem("userName") || ""}
        type="publish"
      />
      <main className="flex-1 py-12 md:py-16 bg-[url('https://res.cloudinary.com/dvn0crswa/image/upload/f_auto,q_auto/uop9ootcrgsiipgwvzf4')] bg-no-repeat bg-fixed bg-cover bg-center">
        <div className="container mx-auto px-4 md:px-6 ">
          <div className="grid grid-cols-1 gap-8 ">
            <div className="bg-background rounded-lg overflow-hidden shadow-lg ">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Publish a Blog Post</h1>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) =>{
                        if(e.target.value.length > 80){
                          setError("Title should be less than 80 characters.");
                          // setTitle("");  
                          setTitle(e.target.value)
                          return;
                        }
                        setTitle(e.target.value)}}
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
                  <div>
                    <Label htmlFor="image">Cover Image</Label>
                    <Input
                      id="image"
                      type="file"
                      className="bg-slate-400"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          if(!validFileTypes.includes(e.target.files[0].type)){
                            setError("Invalid file type. Please upload a valid image file (JPG, JPEG, PNG).");
                            return;
                          }
                          if(e.target.files[0].size > 5242880){
                            setError("File size too large. Please upload an image file less than 5MB.");
                            return;
                          }
                          setImage(e.target.files[0]);
                        }
                        // console.log(image);
                      }}
                    />
                    {error && (
                      <div className="text-red-500 font-bold text-sm">{error}</div>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={handlePublish}
                    disabled={loading}
                    className="w-full font-semibold text-lg"
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

// function MenuIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }
