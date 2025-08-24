import { Link } from 'react-router-dom';
import { TwitterIcon, InstagramIcon, FacebookIcon } from './Icons';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex w-full max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <Link className="text-[#49739c] text-base font-normal leading-normal min-w-40" to="/">Home</Link>
            <Link className="text-[#49739c] text-base font-normal leading-normal min-w-40" to="#">About</Link>
            <Link className="text-[#49739c] text-base font-normal leading-normal min-w-40" to="#">Events</Link>
            <Link className="text-[#49739c] text-base font-normal leading-normal min-w-40" to="/donate">Donate</Link>
            <Link className="text-[#49739c] text-base font-normal leading-normal min-w-40" to="#">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-[#49739c]"><TwitterIcon /></a>
            <a href="#" className="text-[#49739c]"><InstagramIcon /></a>
            <a href="#" className="text-[#49739c]"><FacebookIcon /></a>
          </div>
          <p className="text-[#49739c] text-base font-normal leading-normal">© 2025 SAMUDRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;