import { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';

const AppointmentModal = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", date: new Date() });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "https://doctor-appointment-backend-6ld6.onrender.com/api/appointments";
    try {
      const response = await axios.post(url, {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        doctorId: doctor.id,
      });
      alert(response.data.message);
      onClose();
      //console.log("Appointment booked successfully:", response.data);
    } catch (error) {
      alert("Error booking appointment.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h3 className="text-2xl font-bold text-[#147aa3] mb-4 text-center">
          Book Appointment with {doctor.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#147aa3]"
            value={formData.name}
            onChange={(data) => setFormData({ ...formData, name: data.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#147aa3]"
            value={formData.email}
            onChange={(data) => setFormData({ ...formData, email: data.target.value })}
            required
          />

          <div>
            <label className="block mb-2 font-medium text-gray-700">Select Date</label>
            <Calendar
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              minDate={new Date()}
              className="react-calendar border-none rounded-lg shadow"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Select Time</label>
            <input
              type="time"
              defaultValue="20:00"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#147aa3]"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#147aa3] text-white font-semibold rounded-md hover:bg-[#0f5e7d] transition"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
