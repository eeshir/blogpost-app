
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import { SignupSchema } from "@eeshir/blogpost-common"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export default function Signup() {
  const navigate = useNavigate();
  const [postInputs,setpostInputs] = useState<SignupSchema>({
    name: "",
    email: "",
    password: "",
  })

  async function sendRequest() {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/signup`,postInputs)
      const jwt = response.data;
      localStorage.setItem("token", jwt.jwt)
      navigate("/blogs");
    }
    catch(e){
      alert("Error while signing up")
    }
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#5cb4e7] to-[#9be7fe] flex items-center justify-center">
      <div className="container max-w-[800px] px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#fff]">Join our thriving community of bloggers</h1>
            <p className="text-[#fff]/80 text-lg md:text-xl">
              Sign up today and start sharing your stories with the world.
            </p>
          </div>
          <Card className="bg-background p-6 md:p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>Enter your details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" onChange={(e)=>{
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value
                  })
                }} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" onChange={(e)=>{
                  setpostInputs({
                    ...postInputs,
                    email: e.target.value
                  })
                }} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type={"password"} onChange={(e)=>{
                  setpostInputs({
                    ...postInputs,
                    password: e.target.value
                  })
                }} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center gap-3">
              <Button type="submit" className="w-full" onClick={sendRequest}>
                Sign Up
              </Button>
              <div className="text-sm text-muted-foreground hover:underline">
              <Link to={"/signin"}>
                Already have an account? Login
              </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}