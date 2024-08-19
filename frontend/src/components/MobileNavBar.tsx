import signout from "@/hooks/signout";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const MobileNavBar = ({
  userName,
  type,
}: {
  userName: string;
  type: string;
}) => {
  return (
    <section className="w-full max-w-[264px] visible md:hidden">
      <Sheet>
        <SheetTrigger>
          <img
            src={"/icons/hamburger.svg"}
            width={25}
            height={25}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-white">
          <div className=" flex h-[calc(100vh-72px)] flex-col  justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-2">
                <SheetClose asChild key={"/blogs"}>
                  <Link
                    to={"/blogs"}
                    key={"Home"}
                    className={cn(
                      "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 bg-gradient-to-r from-[#b4b3bf53] to-[#edeef0]",
                      {
                        "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                          type === "blogs",
                      }
                    )}
                  >
                    <img
                      src={"/icons/home.svg"}
                      alt={"Home"}
                      width={25}
                      height={25}
                      className={cn({
                        "brightness-[3] invert-0": type === "blogs",
                      })}
                    />

                    <p
                      className={cn("text-xl font-medium text-black-2", {
                        "text-white": type === "blogs",
                      })}
                    >
                      {"Home"}
                    </p>
                  </Link>
                </SheetClose>
                {type === "profile" ? (
                  <></>
                ) : (
                  <SheetClose asChild key={"/profile"}>
                    <Link
                      to={"/profile/" + userName}
                      key={"profile"}
                      className={cn(
                        "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 bg-gradient-to-r from-[#b4b3bf53] to-[#edeef0]",
                        {
                          "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                            type === "profile",
                        }
                      )}
                    >
                      <img
                        src={"/icons/profile-svgrepo-com.svg"}
                        alt={"profile"}
                        width={25}
                        height={25}
                        className={cn({
                          "brightness-[3] invert-0": type === "profile",
                        })}
                      />

                      <p
                        className={cn("text-xl font-medium text-black-2", {
                          "text-white": type === "profile",
                        })}
                      >
                        {"Profile"}
                      </p>
                    </Link>
                  </SheetClose>
                )}
                {type === "publish" ? (
                  <></>
                ) : (
                  <SheetClose asChild key={"/publish"}>
                    <Link
                      to={"/publish"}
                      key={"publish"}
                      className={cn(
                        "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 bg-gradient-to-r from-[#b4b3bf53] to-[#edeef0]",
                        {
                          "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                            type === "publish",
                        }
                      )}
                    >
                      <img
                        src={"/icons/assignment-svgrepo-com.svg"}
                        alt={"publish"}
                        width={30}
                        height={30}
                        className={cn({
                          "brightness-[3] invert-0": type === "publish",
                        })}
                      />

                      <p
                        className={cn("text-xl font-medium text-black-2", {
                          "text-white": type === "publish",
                        })}
                      >
                        {"Publish Blog"}
                      </p>
                    </Link>
                  </SheetClose>
                )}
                <SheetClose asChild key={"/signout"} onClick={signout}>
                  
                  <Link
                    to={"/signin"}
                    key={"signout"}
                    className={cn(
                      "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 bg-gradient-to-r from-[#b4b3bf53] to-[#edeef0]",
                      {
                        "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                          type === "signout",
                      }
                    )}
                  >
                    <img
                      src={"/icons/logout-svgrepo-com.svg"}
                      alt={"Home"}
                      width={25}
                      height={25}
                      className={cn({
                        "brightness-[3] invert-0": type === "signout",
                      })}
                    />

                    <p
                      className={cn("text-xl font-medium text-black-2", {
                        "text-white": type === "signout",
                      })}
                    >
                      
                      {`Sign Out`}
                      {/* <Button onClick={signout} className="bg-transparent"></Button> */}
                    </p>
                  </Link>
                </SheetClose>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;
