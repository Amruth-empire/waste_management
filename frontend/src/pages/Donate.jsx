import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import this
import { DonationContext } from "../context/DonationContext";
import React from "react";

const Donate = () => {
  const { addDonation } = useContext(DonationContext);
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (!token) {
      navigate("/login"); // redirect to login page
    }
  }, [navigate]);

  const handleAmountClick = (value) => {
    setSelectedAmount(value);
    setAmount(value === "Other" ? "" : value);
  };

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    addDonation(amount);
    alert(`🎉 Thank you for donating $${amount}!`);
    setAmount("");
    setSelectedAmount(null);
  };

  return (
   <>
      {/* HERO SECTION */}
      <section className="relative min-h-[300px] flex items-center justify-center text-center px-4 bg-[#0d80f2]">
        <div className="z-10 flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold">
            Support Our Mission
          </h1>
          <p className="text-white text-base md:text-lg">
            Your contribution helps us protect oceans and coastlines. Every
            donation makes a difference.
          </p>
        </div>
      </section>

      {/* DONATION SECTION */}
      <section className="px-4 py-10">
        <h2 className="text-[#0d141c] text-2xl font-bold mb-4">
          Choose Donation Amount
        </h2>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4">
          <input
            placeholder="Enter amount"
            type="number"
            className="form-input flex w-full min-w-0 flex-1 resize-none rounded-xl text-[#0d141c] bg-[#e7edf4] h-14 p-4 text-base"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onFocus={() => setSelectedAmount("Other")}
          />
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {["25", "50", "100", "Other"].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleAmountClick(val)}
              className={`text-sm font-medium flex items-center justify-center rounded-xl border px-4 h-11 cursor-pointer ${
                selectedAmount === val
                  ? "border-[3px] border-[#0d80f2]"
                  : "border-[#cedbe8]"
              }`}
            >
              ${val}
            </button>
          ))}
        </div>
        <div className="flex mt-6">
          <button
            onClick={handleDonate}
            className="flex min-w-[120px] items-center justify-center rounded-full h-12 px-6 bg-[#0d80f2] text-white font-bold"
          >
            Donate Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Donate;
