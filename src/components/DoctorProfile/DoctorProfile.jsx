import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from 'react-spinners';
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const url = "https://doctor-appointment-backend-6ld6.onrender.com/api/doctors";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((response) => {
      const foundDoctor = response.data.find((doc) => doc.id === parseInt(id));
      setDoctor(foundDoctor);
      //console.log("Doctor data fetched:", foundDoctor);
    });
  }, [id]);

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader color="#4F46E5"
      />
    </div>
  );

  const backToHome = () => {
    navigate("/");
  };

  if (!doctor) return renderLoadingView();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {doctor.name}
            </h2>
            <p className="text-gray-600 font-medium">{doctor.specialization}</p>
            <p className="text-gray-500 mt-3">{doctor.bio}</p>
            <p
              className={`mt-2 font-semibold ${
                doctor.available ? "text-green-600" : "text-red-500"
              }`}
            >
              Availability: {doctor.available ? "Available" : "Unavailable"}
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {doctor.available && (
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-[#147aa3] text-white rounded-md font-semibold hover:bg-[#0f5e7d] transition"
              >
                Book Appointment
              </button>
            )}
            <button
              onClick={backToHome}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Back
            </button>
          </div>
        </div>
      </main>

      {showModal && (
        <AppointmentModal doctor={doctor} onClose={() => setShowModal(false)} />
      )}
      <Footer />
    </div>
  );
};

export default DoctorProfile;
