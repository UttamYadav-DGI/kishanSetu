import React, { useEffect, useState } from "react";
import api from "../../Services/Api";

const FarmerTransactions = () => {
  const [data, setData] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/api/v1/transactions/farmer", {
        withCredentials: true,
      });
      setData(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Farmer Transactions 💰</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <p className="text-gray-500 text-sm">Total Earnings</p>
        <h2 className="text-2xl font-bold text-green-700">
          ₹ {data.totalEarnings}
        </h2>
      </div>

      {data.transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-3">Delivered Orders</h2>

          {data.transactions.map((t) => (
            <div key={t._id} className="border-b py-3 text-sm">
              <p className="font-semibold capitalize">
                {t.cropId?.cropName} ({t.quantityKg} kg)
              </p>

              <p className="text-gray-600">
                Buyer: {t.buyerId?.Name} | ₹{t.totalPrice}
              </p>

              <p className="text-gray-500">
                Location: {t.cropId?.location}
              </p>

              <p className="text-green-600 font-semibold">
                Status: {t.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerTransactions;
