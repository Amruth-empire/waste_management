import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const Login = () => {
  const [email, setEmail] = useState('');   // ✅ changed from username → email
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })   // ✅ sending email now
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid email or password");
      } else {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token); // save JWT
        navigate("/dashboard"); // redirect after login
      }
    } catch (err) {
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-5">
      <h2 className="text-[#0d141c] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        {/* ✅ Email input */}
        <div className="flex w-full justify-center px-4 py-3">
          <input
            placeholder="Email"
            type="email"
            className="form-input flex w-full max-w-[320px] rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-14 placeholder:text-[#49739c] p-4 text-base font-normal leading-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ✅ Password input */}
        <div className="flex w-full justify-center px-4 py-3">
          <input
            placeholder="Password"
            type="password"
            className="form-input flex w-full max-w-[320px] rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-14 placeholder:text-[#49739c] p-4 text-base font-normal leading-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex px-4 py-3 justify-center w-full">
          <button
            type="submit"
            className="flex w-full max-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0d80f2] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Login</span>
          </button>
        </div>
      </form>

      {message && (
        <p className="text-center text-sm mt-2 text-red-500">{message}</p>
      )}

      <p className="text-[#49739c] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="underline">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
