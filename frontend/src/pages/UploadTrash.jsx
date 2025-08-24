import beach1 from "../assets/before.jpg";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadTrash = () => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  // ✅ Check login on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect if user is not logged in
      return;
    }

    // Load stored image if available
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) setUploadedImage(savedImage);
  }, [navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("http://localhost:5000/api/photos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // send token to backend
        },
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Uploaded:", data);

      if (data.success) {
        const imagePath = `http://localhost:5000${data.filePath}`;
        setUploadedImage(imagePath);
        localStorage.setItem("uploadedImage", imagePath);

        // ✅ Generate random tokens between 50–200
        const newTokens = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

        // ✅ Update token balance
        const currentTokens = parseInt(localStorage.getItem("userTokens") || "0");
        const updatedTokens = currentTokens + newTokens;
        localStorage.setItem("userTokens", updatedTokens);

        // ✅ Update token history
        const history = JSON.parse(localStorage.getItem("tokenHistory") || "[]");
        const newEntry = {
          tokens: newTokens,
          date: new Date().toLocaleString(),
          activity: "Uploaded Beach Cleanup Photo",
        };
        const updatedHistory = [newEntry, ...history];
        localStorage.setItem("tokenHistory", JSON.stringify(updatedHistory));

        // Trigger storage event manually so Tokens.jsx updates immediately
        window.dispatchEvent(new Event("storage"));

        // Redirect to Tokens page
        navigate("/tokens", { state: { newTokens } });
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-[#0d141c] text-[32px] font-bold text-center pt-6">
        Join us in protecting our oceans 🌊
      </h1>
      <p className="text-[#49739c] text-base text-center">
        Participate in beach cleanups and help us preserve marine life.
      </p>

      <div className="flex gap-3 items-center px-4 py-3">
        <input
          placeholder="Search for a beach near you"
          className="flex-1 min-w-[200px] rounded-xl border bg-slate-50 h-14 p-4"
        />
        <button
          className="rounded-full h-14 px-6 bg-[#0d80f2] text-slate-50 text-sm font-bold"
          onClick={() => fileInputRef.current.click()}
        >
          Take Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex w-full bg-slate-50 p-4">
        <div className="w-full grid grid-cols-2 gap-2 aspect-[3/2] rounded-xl">
          {/* Left static image */}
          <div
            className="bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${beach1})` }}
          ></div>

          {/* Right uploaded image */}
          <div
            className="bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: uploadedImage ? `url(${uploadedImage})` : `url(${beach1})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadTrash;
