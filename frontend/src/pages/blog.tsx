import { FullBlog } from "@/components/FullBlog";
import { useBlog } from "@/hooks";
import "rsuite/dist/rsuite.min.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "rsuite";

export default function Blog() {
    const {id} = useParams();
    // console.log(id);
  const { loading, blog } = useBlog({
    id : id || ""
  });
  // console.log(blog);
  if (loading) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <Link to={"/blogs"} className="text-2xl font-bold">
            Blog Website
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to={"/publish"}
              className="text-xl font-medium hover:text-primary-foreground/80 transition-colors"
            >
              Publish Blog
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FullBlog blog = {blog}/>
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
