import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearAllUserErrors, register } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://backend-beta-ruby-13.vercel.app/api/v1";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = () => {
    if (!email || !password) {
      toast.error("Please provide email and password.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Optional fields
    if (fullName) formData.append("fullName", fullName);
    if (phone) formData.append("phone", phone);
    if (aboutMe) formData.append("aboutMe", aboutMe);
    if (portfolioURL) formData.append("portfolioURL", portfolioURL);

    // Only append files if they exist
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    dispatch(register(formData));
  };

  const handleSeedUser = async () => {
    try {
      const response = await axios.post(`${API_BASE}/user/seed`);
      toast.success(response.data.message);
      setEmail("akbaroofficial041@gmail.com");
      setPassword("admin2006");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Seed user failed");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Registration successful! Logged in.");
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, navigateTo]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-balance text-muted-foreground">
              Only email and password are required
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="aboutMe">About</Label>
              <Input
                id="aboutMe"
                type="text"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolioURL">Portfolio URL</Label>
              <Input
                id="portfolioURL"
                type="url"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar Image (Optional)</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resume">Resume (Optional)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </div>

            {!loading ? (
              <Button type="button" onClick={handleRegister} className="w-full">
                Register
              </Button>
            ) : (
              <SpecialLoadingButton content={"Registering"} />
            )}

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleSeedUser}
            >
              Seed Local Test User
            </Button>

            <p className="text-sm text-center">
              Already have an account? <Link to="/login" className="underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="https://i.pinimg.com/1200x/5a/8c/9d/5a8c9dc1bdf8cad597d0e66b6af46e32.jpg" alt="register" />
      </div>
    </div>
  );
};

export default Register;

