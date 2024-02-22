import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
      toast({
        description: "Registered successfully, please login",
        className: "bg-green-300",
        duration: 2000,
      });
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    toast({
      description: "Logged in successfully",
      className: "bg-green-300",
      duration: 2000,
    });
    // try {

    // } catch (err) {

    // }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#00A67E] max-sm:px-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 text-white bg-[#174e41]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-[#cdffe0]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your account details to login.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" type="email" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute cursor-pointer right-3"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="absolute cursor-pointer right-3"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={onSubmitLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="bg-[#cdffe0]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Enter your username, email and password to signup.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute cursor-pointer right-3"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="absolute cursor-pointer right-3"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onSubmitRegister}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default LoginRegister;
