import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("✅ Account created successfully! You can login now.");
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-5">
      <h2 className="text-[#0d141c] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Join the Wave 🌱
      </h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="flex w-full justify-center px-4 py-3">
          <input
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            className="form-input flex w-full max-w-[320px] rounded-xl bg-[#e7edf4] h-14 p-4 border-none"
          />
        </div>
        <div className="flex w-full justify-center px-4 py-3">
          <input
            name="email"
            value={formData.email}
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="form-input flex w-full max-w-[320px] rounded-xl bg-[#e7edf4] h-14 p-4 border-none"
          />
        </div>
        <div className="flex w-full justify-center px-4 py-3">
          <input
            name="password"
            value={formData.password}
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="form-input flex w-full max-w-[320px] rounded-xl bg-[#e7edf4] h-14 p-4 border-none"
          />
        </div>
        <div className="flex w-full justify-center px-4 py-3">
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            className="form-input flex w-full max-w-[320px] rounded-xl bg-[#e7edf4] h-14 p-4 border-none"
          />
        </div>

        <div className="flex px-4 py-3 justify-center w-full">
          <button
            type="submit"
            className="flex w-full max-w-[320px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#0d80f2] text-slate-50 text-sm font-bold"
          >
            <span className="truncate">Sign Up</span>
          </button>
        </div>
      </form>

      {message && (
        <p className="text-center text-sm mt-2 text-red-500">{message}</p>
      )}

      <p className="text-[#49739c] text-sm font-normal text-center mt-2">
        Already have an account?{' '}
        <Link to="/login" className="underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
