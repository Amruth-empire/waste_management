import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "./Icons"; 
import React from "react";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
      <Link to="/" className="flex items-center gap-4 text-[#0d141c]">
        <div className="size-4">
          <LogoIcon />
        </div>
        <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">
          SAMUDRA
        </h2>
      </Link>

      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-[#0d141c] text-sm font-medium leading-normal" to="/">
            Home
          </Link>
          <Link className="text-[#0d141c] text-sm font-medium leading-normal" to="/donate">
            Donate
          </Link>
          <Link className="text-[#0d141c] text-sm font-medium leading-normal" to="/upload">
            Upload / Enroll
          </Link>
          <Link className="text-[#0d141c] text-sm font-medium leading-normal" to="/tokens">
            My Tokens
          </Link>
          {token && (
            <Link className="text-[#0d141c] text-sm font-medium leading-normal" to="/dashboard">
              Dashboard
            </Link>
          )}
        </div>

        {token ? (
          <button
            onClick={handleLogout}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-red-500 text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0d80f2] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Login / Signup</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
