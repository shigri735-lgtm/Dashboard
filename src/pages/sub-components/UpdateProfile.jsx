
import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  // ✅ SAFE STATE INIT
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/avatarHolder.jpg");

  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("/avatarHolder.jpg");

  const dispatch = useDispatch();

  // ✅ LOAD USER DATA
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAboutMe(user.aboutMe || "");
      setPortfolioURL(user.portfolioURL || "");
      setLinkedInURL(user.linkedInURL || "");
      setGithubURL(user.githubURL || "");
      setInstagramURL(user.instagramURL || "");
      setTwitterURL(user.twitterURL || "");
      setFacebookURL(user.facebookURL || "");

      setAvatarPreview(user?.avatar?.url || "/avatarHolder.jpg");
      setResumePreview(user?.resume?.url || "/avatarHolder.jpg");
    }
  }, [user]);

  // ✅ AVATAR HANDLER
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  // ✅ RESUME HANDLER
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  // ✅ SUBMIT
  const handleUpdateProfile = () => {
    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);

    // ✅ ONLY IF FILE EXISTS
    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  // ✅ ALERTS
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully!");
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>

      {/* IMAGE + RESUME */}
      <div className="flex gap-5 flex-wrap">

        <div>
          <Label>Avatar</Label>
          <img src={avatarPreview} className="w-40 h-40 rounded-xl" />
          <input type="file" onChange={avatarHandler} />
        </div>

        <div>
          <Label>Resume</Label>
          <Link to={resumePreview} target="_blank">
            <img src={resumePreview} className="w-40 h-40 rounded-xl" />
          </Link>
          <input type="file" onChange={resumeHandler} />
        </div>

      </div>

      {/* INPUTS */}
      <div className="grid gap-3 mt-5">
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <Textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder="About Me" />

        <Input value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} placeholder="Portfolio URL" />
        <Input value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} placeholder="LinkedIn URL" />
        <Input value={githubURL} onChange={(e) => setGithubURL(e.target.value)} placeholder="Github URL" />
        <Input value={instagramURL} onChange={(e) => setInstagramURL(e.target.value)} placeholder="Instagram URL" />
        <Input value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} placeholder="Twitter URL" />
        <Input value={facebookURL} onChange={(e) => setFacebookURL(e.target.value)} placeholder="Facebook URL" />
      </div>

      {/* BUTTON */}
      <div className="mt-5">
        {!loading ? (
          <Button onClick={handleUpdateProfile} className="w-full">
            Update Profile
          </Button>
        ) : (
          <SpecialLoadingButton content={"Updating"} />
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
