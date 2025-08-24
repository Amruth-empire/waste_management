import { Link } from "react-router-dom";
import { CameraIcon, UsersThreeIcon } from "../components/Icons";
import ImpactCard from "../components/ImpactCard";
import heroBg from "../assets/hero-background.jpg";
import React, { useContext } from "react";
import { DonationContext } from "../context/DonationContext";

const volunteerInfo = [
  {
    icon: <CameraIcon />,
    title: "Uploaders",
    description:
      "Report trash locations with images and earn tokens for your efforts.",
  },
  {
    icon: <UsersThreeIcon />,
    title: "Enrollers",
    description:
      "Join cleaning activities, earn tokens, and make a tangible impact.",
  },
];

const Home = () => {
  const { totalDonations } = useContext(DonationContext); // 👈 dynamic state

  const impactData = [
    { label: "Beaches Cleaned", value: "150+" },
    { label: "Volunteers Joined", value: "500+" },
    { label: "Tokens Earned", value: totalDonations }, // 👈 dynamic donation
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[480px] flex items-center justify-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${heroBg})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Join the Ocean Guardians Community
          </h1>
          <p className="text-white text-base md:text-lg">
            Our beaches are drowning in plastic. Ocean Guardians bridges the
            gap, connecting generous donors with passionate volunteers to create
            a cleaner, healthier ocean.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0d80f2] text-white font-semibold shadow-md hover:bg-[#0b6ad1] transition"
          >
            Donate Financially
          </Link>
        </div>
      </section>

      {/* VOLUNTEERS SECTION */}
      <section className="px-4 py-10">
        <h2 className="text-[#0d141c] text-2xl font-bold mb-6">
          For Volunteers
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {volunteerInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-6 rounded-xl border border-[#e0e7ef] bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="text-[#0d80f2] w-10 h-10">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[#0d141c]">
                {item.title}
              </h3>
              <p className="text-sm text-[#49739c]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="px-4 py-10 bg-slate-50">
        <h2 className="text-[#0d141c] text-2xl font-bold mb-6">Our Impact</h2>
        <div className="flex flex-wrap gap-6">
          {impactData.map((data, index) => (
            <ImpactCard key={index} label={data.label} value={data.value} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
