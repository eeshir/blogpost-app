import { Link } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import signout from "@/hooks/signout";

const NavBar = ({ userName, type }: { userName: string; type: string }) => {
  const isBlogPage = type === "blogs" || type === "blog";
  const isProfilePage = type === "profile";
  const isPublishPage = type === "publish";

  return (
    <header className="bg-black text-primary-foreground py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <Link
          to="/blogs"
          className="text-2xl font-extrabold hover:text-white transition-colors duration-200"
          style={{ fontFamily: 'Verdana, sans-serif' }} // Change font here
        >
          Blog Website
        </Link>

        <div>
          <MobileNavBar type={type} userName={userName} />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {(isBlogPage || isProfilePage) && (
            <Link
              to="/publish"
              className="relative text-lg font-medium hover:scale-105 hover:text-white transition-colors duration-200 px-4 py-2"
              style={{ fontFamily: 'Roboto, sans-serif' }} // Change font here
            >
              Publish Blog
              <span className="absolute inset-0 border border-slate-200 rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Link>
          )}

          {(isBlogPage || isPublishPage) && (
            <Link
              to={`/profile/${userName}`}
              className="relative text-lg font-medium hover:scale-105 hover:text-white transition-colors duration-200 px-4 py-2"
              style={{ fontFamily: 'Roboto, sans-serif' }} // Change font here
            >
              Profile
              <span className="absolute inset-0 border border-slate-200 rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Link>
          )}

          <Link
            to="/signin"
            className="relative text-lg font-medium hover:scale-105 text-red-500 hover:text-red-700 transition-colors duration-200 px-4 py-2"
            onClick={signout}
            style={{ fontFamily: 'Roboto, monospace' }} // Change font here
          >
            Sign Out
            <span className="absolute inset-0 border border-red-500 rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
