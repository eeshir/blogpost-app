import { Link } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import signout from "@/hooks/signout";

const NavBar = ({ userName, type }: { userName: string; type: string }) => {

  return (
    <header className="bg-black text-primary-foreground py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link
          to={"/blogs"}
          className="text-2xl text-slate-200 font-bold hover:text-primary-foreground/80 transition-colors"
        >
          Blog Website
        </Link>
        <div>
          <MobileNavBar type={type} userName={userName} />
        </div>
        <nav className="hidden md:flex items-center gap-4 ">
          {type === "blogs" || type === "blog" || type === "profile" ? (
            <Link
              to={`/publish`}
              className="text-xl font-semibold hover:text-primary-foreground/80 transition-colors"
            >
              Publish Blog
            </Link>
          ) : (
            <></>
          )}

          {type === "blogs" || type === "blog" || type === "publish" ? (
            <Link
              to={`/profile/${userName}`}
              className="text-xl font-semibold hover:text-primary-foreground/80 transition-colors"
            >
              Profile
            </Link>
          ) : (
            <></>
          )}
           <Link
              to={`/signin`}
              className="text-xl font-semibold hover:text-primary-foreground/80 transition-colors"
              onClick={signout}
            >
              Sign Out
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
