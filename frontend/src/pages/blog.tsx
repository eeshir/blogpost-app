import { useBlog } from "@/hooks";
import "rsuite/dist/rsuite.min.css";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite";
import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";
import FullBlog from "@/components/FullBlog";
import Footer from "@/components/Footer";

export default function Blog() {
  const { id } = useParams() || "";
  AuthChecker({ page1: "", page2: "/signin" });
  const userName = localStorage.getItem("userName") || "";
  // console.log(id);

  const { loading, blog, likedByUser,createdByUser } = useBlog({
    id: id || "",
  });
  // console.log(likedByUser + " blog");
  // console.log(blog);
  if (loading || !blog) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
  // console.log(blog);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar userName={userName} type="blog" />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FullBlog blog={blog} likedByUser={likedByUser} createdByUser={createdByUser}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
