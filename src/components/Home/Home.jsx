import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Home = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const url = "https://doctor-appointment-backend-6ld6.onrender.com/api/doctors";

  useEffect(() => {
    axios.get(url).then((response) => {
      setDoctors(response.data);
      //console.log("Doctors data:", response.data);
    });
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(data) => setSearch(data.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow transition duration-300 hover:shadow-xl hover:border-blue-500"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{doc.name}</h2>
              <p className="text-gray-600">{doc.specialization}</p>
              <p
                className={`mt-1 font-medium ${
                  doc.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {doc.available ? "Available" : "Unavailable"}
              </p>
              <Link
                to={`/doctor/${doc.id}`}
                className="inline-block mt-4 px-4 py-2 bg-[#147aa3] text-white font-medium rounded-md transition duration-300 hover:bg-[#0f5e7d]"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
