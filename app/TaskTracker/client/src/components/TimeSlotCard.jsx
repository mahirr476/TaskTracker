import React from 'react';

const TimeSlotCard = ({ isActive, task }) => {
  return (
    <div className={`p-4 border rounded-lg ${isActive ? 'bg-white shadow' : 'bg-gray-100'}`}>
      {isActive ? (
        <div>
          <div className="font-bold text-blue-600">{task.timeStart} - {task.timeEnd}</div>
          <div className="text-lg">{task.title}</div>
          <div className="text-sm text-gray-500">{task.description}</div>
        </div>
      ) : (
        <div className="text-gray-400 italic">No task scheduled</div>
      )}
    </div>
  );
};

export default TimeSlotCard;
