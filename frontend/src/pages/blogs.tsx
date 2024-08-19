// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/hooks";
import { Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";
// import LoaderComp from "@/components/LoadingScreen"

export default function Blogs() {
  
  AuthChecker({ page1: "", page2: "/signin" });
  
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
  const userName = localStorage.getItem("userName") || "";
  // console.log(blogs);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar userName={userName} type='blogs'/>
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blo) => (
              <BlogCard
                id={blo.id}
                authorName={blo.author.name || "Anonymous"}
                title={blo.title}
                content={blo.content}
                publishedAt={blo.publishedAt.substring(0, 10)}
              />
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <p className="text-sm">
            &copy; 2023 Blog Website. All rights reserved.
          </p>
          <nav className="flex items-center gap-4"></nav>
        </div>
      </footer>
    </div>
  );
}
