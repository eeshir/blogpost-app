import { FullBlog } from "@/components/FullBlog";
import { useBlog } from "@/hooks";
import "rsuite/dist/rsuite.min.css";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite";

import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";

export default function Blog() {
  const { id } = useParams() || "";
  AuthChecker({ page1: "", page2: "/signin" });
  const userName = localStorage.getItem("userName") || "";
  // console.log(id);
  const { loading, blog } = useBlog({
    id: id || "",
  });
  // console.log(blog);
  if (loading || !blog) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar userName={userName} type="blog" />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FullBlog blog={blog} />
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <p className="text-sm">
            &copy; 2023 Blog Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
