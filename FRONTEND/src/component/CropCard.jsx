import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Services/Api";

const CropCard = ({ crop, onRefresh }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await api.delete(
        `/api/v1/crops/crops/${crop._id}`,
        { withCredentials: true }
      );
      onRefresh(); // reload dashboard crops
    } catch (error) {
      alert("Failed to delete crop");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="font-semibold text-lg">{crop.cropName}</h3>
      <p className="text-sm">Quantity: {crop.quantity} kg</p>
      <p className="text-sm">Price: ₹{crop.pricePerKg}/kg</p>
      <p className="text-sm">Status: {crop.status}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => navigate(`/farmers/edit-crop/${crop._id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CropCard;
