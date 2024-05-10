import React from 'react';
import TimeSlotCard from '../components/TimeSlotCard';
import { MdSettings, MdHelpOutline } from 'react-icons/md'; 

const Calendar = ({ weekData }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b py-3">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <MdSettings className="text-xl" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <MdHelpOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Toolbar for filters and views */}
      <div className="flex gap-4 py-3">
        <select className="border p-2 rounded">
          <option>My calendar</option>
          <option>Team calendar</option>
        </select>
        <select className="border p-2 rounded">
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
        <button className="border p-2 rounded">Filter tasks</button>
        <button className="border p-2 rounded">View options</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
        {weekData.map((day, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-blue-700 mb-3">{day.day} - {day.date}</h3>
            {day.slots.map((slot, idx) => (
              <TimeSlotCard key={idx} isActive={slot.isActive} task={slot.task} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
