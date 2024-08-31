// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { useParams } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { usersBlog } from "@/hooks";
import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";
import Footer from "@/components/Footer";

export default function UserProf() {
  const { user } = useParams();
  AuthChecker({ page1: "", page2: "/signin" });
  const { loading, blogs } = usersBlog({
    user: user || "",
  });
  
  if (loading) {
    return (
      <div style={{ marginTop: 20, width: 400 }}>
        <Loader center />
      </div>
    );
  }
function emptyChecker(blogs:any){
  if(blogs.length===0)
    return(
  <div className="flex w-full text-3xl justify-center pt-20">
  You have not published any blogs
  </div>
  )
}
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar userName="" type="profile" />
      <main className="flex-1 py-12 md:py-16 bg-[url('https://res.cloudinary.com/dvn0crswa/image/upload/f_auto,q_auto/uop9ootcrgsiipgwvzf4')] bg-no-repeat bg-fixed bg-cover bg-center">
      {emptyChecker(blogs)}
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {blogs.map((blo) => (
              <BlogCard
                id={blo.id}
                authorName={blo.author.name || "Anonymous"}
                title={blo.title}
                content={blo.content}
                publishedAt={blo.publishedAt.substring(0, 10)}
                imagesrc={blo.imagesrc}
                views={blo.views}
                likes={blo.likes}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
