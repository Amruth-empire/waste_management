import React from 'react';
const ImpactCard = ({ label, value }) => {
    return (
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#e7edf4]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">{label}</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">{value}</p>
        </div>
    );
};

export default ImpactCard;