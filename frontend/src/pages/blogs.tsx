import { Button } from "@/components/ui/button";
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Link } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/hooks";
import { Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useState } from "react";
// import LoaderComp from "@/components/LoadingScreen"

export default function Blogs() {
  const { loading, blogs } = useBlogs();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if (loading) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // console.log(blogs);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <div className="text-2xl font-bold">Blog Website</div>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to={`/publish`}
              className="text-xl font-medium hover:text-primary-foreground/80 transition-colors"
            >
              Publish Blog
            </Link>
            <Link
              to={`/user/profile`}
              className="text-xl font-medium hover:text-primary-foreground/80 transition-colors"
            >
              Profile
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden"
          >
            <MenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
        <div className={`items-center gap-4 ${isMenuOpen ? "flex" : "hidden"} justify-end md:hidden`}>
            <ul className="font-medium flex flex-col  md:p-0 mt-4 mr-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href={`/publish`}
                  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Publish Blog
                </a>
              </li>
              <li>
                <a
                  href={`/user/profile`}
                  className="block py-2 px-2 text-gray-900 rounded  hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
      </header>
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


