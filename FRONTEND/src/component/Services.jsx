import React, { useEffect, useState } from "react";
import { fetchSchemes } from "../Services/schemeApi";

const Services = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {
    const res = await fetchSchemes();
    setSchemes(res.data.data);
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Government Schemes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <div
            key={scheme._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="font-bold text-green-700 text-lg">
              {scheme.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {scheme.description}
            </p>

            <p className="text-sm mt-2">
              Deadline: {scheme.deadline}
            </p>

            <a
              href={scheme.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
