import { UsersIcon, ImageColorIcon, CoinsIcon, LeafIcon, HandHeartIcon, HandCoinsIcon } from '../components/Icons';
import React, { useState, useEffect } from 'react';

const earningSteps = [
  { icon: <UsersIcon />, title: "Join Beach Cleaning Activities", description: "Participate in beach cleaning events and upload photo proof of your activity." },
  { icon: <ImageColorIcon />, title: "Upload Photo Proof", description: "Our system verifies the photo uploads to ensure the activity was completed." },
  { icon: <CoinsIcon />, title: "Get Tokens", description: "Once verified, tokens are credited to your account." }
];

const redeemOptions = [
  { icon: <LeafIcon />, title: "Eco-Friendly Products", description: "Redeem tokens for discounts on eco-friendly products." },
  { icon: <HandHeartIcon />, title: "Support Conservation", description: "Use tokens to support ocean conservation projects." },
  { icon: <HandCoinsIcon />, title: "Donate to Partners", description: "Donate tokens to partner organizations." }
];

const InfoRow = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2">
    <div className="text-[#0d141c] flex items-center justify-center rounded-lg bg-[#e7edf4] shrink-0 size-12">{icon}</div>
    <div className="flex flex-col justify-center">
      <p className="text-[#0d141c] text-base font-medium">{title}</p>
      <p className="text-[#49739c] text-sm font-normal">{description}</p>
    </div>
  </div>
);

const Tokens = () => {
  const [uploadedImage] = useState(localStorage.getItem("uploadedImage") || null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenHistory, setTokenHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [recentEarned, setRecentEarned] = useState(0);

  // ✅ Load balance & history on mount
  useEffect(() => {
    const savedBalance = parseInt(localStorage.getItem("userTokens") || "0");
    const savedHistory = JSON.parse(localStorage.getItem("tokenHistory") || "[]");

    setTokenBalance(savedBalance);
    setTokenHistory(savedHistory);

    // show recent earned tokens
    if (savedHistory.length > 0) {
      setRecentEarned(savedHistory[0].tokens);
    }
  }, []);

  // ✅ Listen for updates from UploadTrash
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedBalance = parseInt(localStorage.getItem("userTokens") || "0");
      setTokenBalance(updatedBalance);

      const updatedHistory = JSON.parse(localStorage.getItem("tokenHistory") || "[]");
      setTokenHistory(updatedHistory);

      if (updatedHistory.length > 0) {
        setRecentEarned(updatedHistory[0].tokens);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#0d141c] text-[32px] font-bold">Rewards Dashboard</p>
          <p className="text-[#49739c] text-sm">Track your tokens earned from beach cleaning activities.</p>
        </div>
      </div>

      <div className="p-4 @container">
        <div className="flex flex-col @xl:flex-row bg-gray-100 p-4 rounded-xl">
          <div
            className="w-full @xl:w-1/2 bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            style={{ backgroundImage: `url(${uploadedImage || "https://via.placeholder.com/600x400"})` }}
          ></div>

          <div className="flex w-full @xl:w-1/2 flex-col gap-1 py-4 @xl:px-4">
            <p className="text-[#0d141c] text-lg font-bold">Your Token Balance</p>
            <div className="flex items-end justify-between gap-3">
              <p className="text-[#49739c] text-2xl font-bold">{tokenBalance} Tokens</p>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="rounded-full h-8 px-4 bg-[#0d80f2] text-white text-sm font-medium"
              >
                {showHistory ? "Hide History" : "View History"}
              </button>
            </div>

            {/* ✅ Show recent earned tokens message */}
            {recentEarned > 0 && (
              <p className="text-green-600 mt-2 font-medium">
                🎉 Congratulations! You earned {recentEarned} tokens.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Token History Section */}
      {showHistory && (
        <div className="p-4">
          <h2 className="text-[#0d141c] text-lg font-bold mb-3">Token History</h2>
          {tokenHistory.length > 0 ? (
            <ul className="space-y-2">
              {tokenHistory.map((entry, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-[#0d141c]">+{entry.tokens} tokens</p>
                  <p className="text-xs text-[#49739c]">{entry.date}</p>
                  <p className="text-xs text-[#49739c]">{entry.activity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#49739c]">No history available.</p>
          )}
        </div>
      )}

      <h2 className="text-[#0d141c] text-[22px] font-bold px-4 pt-5">How to Earn Tokens</h2>
      {earningSteps.map((step, index) => <InfoRow key={index} {...step} />)}

      <h2 className="text-[#0d141c] text-[22px] font-bold px-4 pt-5">Redeem Your Tokens</h2>
      {redeemOptions.map((option, index) => <InfoRow key={index} {...option} />)}
    </>
  );
};

export default Tokens;
