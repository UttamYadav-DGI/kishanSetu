import React from "react";

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-xl font-bold mt-1">{value}</h2>
  </div>
);

const BuyerStats = ({ totalAvailableCrops }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card title="Available Crops" value={totalAvailableCrops || 0} />
      <Card title="My Orders" value="--" />
      <Card title="Wishlist" value="--" />
    </div>
  );
};

export default BuyerStats;
