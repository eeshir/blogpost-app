import { Button } from "@/components/ui/button";
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Link } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/hooks";
import { Loader } from "rsuite"; 
import "rsuite/dist/rsuite.min.css"; 
// import LoaderComp from "@/components/LoadingScreen"

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center  />
      </div>
    );
  }
  // console.log(blogs);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <div className="text-2xl font-bold">
            Blog Website
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to={`/publish`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blo) => (
              <BlogCard
                id = {blo.id}
                authorName={blo.author.name || "Anonymous"}
                title={blo.title}
                content={blo.content}
                publishedAt={blo.publishedAt.substring(0,10)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            {/* <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious to={"#"} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink to={"#"}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink to={"#"} isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink to={"#"}>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext to={"#"} />
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}
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

// function XIcon(props:any) {
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
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }
