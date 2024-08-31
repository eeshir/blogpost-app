// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { BlogCard } from "@/components/BlogCard";
import { Blog } from "@/hooks";
import { Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import NavBar from "@/components/NavBar";
import AuthChecker from "@/hooks/authChecker";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Footer from "@/components/Footer";
// import LoaderComp from "@/components/LoadingScreen"

export default function Blogs() {
  AuthChecker({ page1: "", page2: "/signin" });

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [notLastPage, setNotLastPage] = useState(true);

  useEffect(() => {
    // console.log(loading)
    if (loading === false) {
      const onscroll = () => {
        const scrolledTo = window.scrollY + window.innerHeight;
        const threshold = 300;
        const isReachBottom =
          document.body.scrollHeight - threshold <= scrolledTo;
        if (isReachBottom && notLastPage) {
          setCount((prev) => prev + 1);
        }
      };
      window.addEventListener("scroll", onscroll);
      return () => {
        window.removeEventListener("scroll", onscroll);
      };
    }
    else{
      return;
    }
  }, [loading]);

  useEffect(() => {
    // console.log(count + "  count");
    if (notLastPage === false) {
      return;
    }
    try {
      // console.log("requesting");
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/v1/blogs/bulk/${count}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          // console.log(res.data.length + "   length"); 
          // console.log(res.data);
          if (res.data.length === 0) {
            setNotLastPage(false);
          }
          if (res.data.length > 0) {
            setBlogs((prevPosts) => [...prevPosts, ...res.data]);
          }

          setLoading(false);
        });
    } catch (e) {
      // alert(e);
    }
  }, [count]);
  
  // const { loading, blogs } = useBlogs(count);
  // if (loading) {
  //   return (
  //     <div style={{ marginTop: 20, width: 400 }}>
  //       <Loader center />
  //     </div>
  //   );
  // }

  const userName = localStorage.getItem("userName") || "";
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar userName={userName} type="blogs" />
      <main className="flex-1 py-12 md:py-16 bg-[url('https://res.cloudinary.com/dvn0crswa/image/upload/f_auto,q_auto/bz8pylfw97v9iofdkd7f')] bg-no-repeat bg-fixed bg-cover bg-center  ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {blogs.map((blo) => (
              // console.log(blo),
              <BlogCard
                key={blo.id}
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
          {loading===true && (
            <div style={{ marginTop: 20, width: 400 }}>
              <Loader center />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
