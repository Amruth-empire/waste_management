import React, { createContext, useState } from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [totalDonations, setTotalDonations] = useState(0);

  const addDonation = (amount) => {
    setTotalDonations((prev) => prev + Number(amount));
  };

  return (
    <DonationContext.Provider value={{ totalDonations, addDonation }}>
      {children}
    </DonationContext.Provider>
  );
};
