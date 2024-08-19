import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SigninSchema } from "@eeshir/blogpost-common";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export default function Component() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [wrongUser, setWrongUser] = useState("");
  const [postInputs, setpostInputs] = useState<SigninSchema>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/users/signin`,
        postInputs
      );
      const jwt = response.data;
      console.log(response.data);
      if (jwt.message === "User not found") {
        setWrongUser("Incorrect Email or Password")
        navigate("/signin");
      } else {
        localStorage.setItem("token", jwt.jwt);
        localStorage.setItem("userName", jwt.name);
        navigate("/blogs");
      }
    } catch (e: any) {
      navigate("/signin");
      setError(e.response.data.error);
    }
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#5cb4e7] to-[#9be7fe] flex items-center justify-center">
      <div className="container max-w-[800px] px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#fff]">
              Welcome back!
            </h1>
            <p className="text-[#fff]/80 text-lg md:text-xl">
              Sign in to your account and continue sharing your stories.
            </p>
          </div>
          <Card className="bg-background p-6 md:p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your email and password to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => {
                    setpostInputs({
                      ...postInputs,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setpostInputs({
                      ...postInputs,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </CardContent>
            <div className="text-red-500 text-sm px-5 mb-4">{error} {wrongUser}</div>
            <CardFooter className="flex justify-between items-center gap-4">
              <Button type="submit" className="w-full" onClick={sendRequest}>
                Sign In
              </Button>
              <Link
                to={"/signup"}
                className="text-sm text-muted-foreground hover:underline"
              >
                Don't have an account? Sign up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
