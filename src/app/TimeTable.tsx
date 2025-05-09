'use client';
import { useState } from 'react';

// Define constants for readability
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);
const COURSE_NAMES = ['Mathematics', 'Physics', 'Chemistry'];
const ROOM_NAMES = ['Lab A', 'Lab B', 'Lab C'];
const SECTION_NAMES = ['Section 1', 'Section 2', 'Section 3'];

// Sample schedule data
const scheduleData = [
  { course: 0, day: 0, end_time: 21, room: 1, section: 0, start_time: 18 },
  { course: 1, day: 1, end_time: 10, room: 1, section: 0, start_time: 7 },
  { course: 2, day: 0, end_time: 10, room: 1, section: 0, start_time: 7 },
  { course: 0, day: 1, end_time: 21, room: 2, section: 1, start_time: 18 },
  { course: 1, day: 0, end_time: 10, room: 2, section: 1, start_time: 7 },
  { course: 2, day: 1, end_time: 10, room: 2, section: 1, start_time: 7 },
  { course: 0, day: 1, end_time: 21, room: 0, section: 2, start_time: 18 },
  { course: 1, day: 1, end_time: 10, room: 0, section: 2, start_time: 7 },
  { course: 2, day: 0, end_time: 10, room: 0, section: 2, start_time: 7 }
];

// Helper function to get background color based on course
const getCourseColor = (courseId) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100'];
  return colors[courseId % colors.length];
};

export default function Timetable() {
  const [viewMode, setViewMode] = useState('course');
  const [selectedId, setSelectedId] = useState(0);
  
  // Get unique items for each view mode
  const uniqueCourses = [...new Set(scheduleData.map(item => item.course))];
  const uniqueRooms = [...new Set(scheduleData.map(item => item.room))];
  const uniqueSections = [...new Set(scheduleData.map(item => item.section))];
  
  // Filter schedule based on current view
  const getFilteredSchedule = () => {
    switch (viewMode) {
      case 'course':
        return scheduleData.filter(item => item.course === selectedId);
      case 'room':
        return scheduleData.filter(item => item.room === selectedId);
      case 'section':
        return scheduleData.filter(item => item.section === selectedId);
      default:
        return scheduleData;
    }
  };
  
  // Get appropriate label based on current view mode
  const getItemName = (id) => {
    switch (viewMode) {
      case 'course':
        return COURSE_NAMES[id];
      case 'room':
        return ROOM_NAMES[id];
      case 'section':
        return SECTION_NAMES[id];
      default:
        return '';
    }
  };
  
  // Get appropriate selector items
  const getSelectorItems = () => {
    switch (viewMode) {
      case 'course':
        return uniqueCourses.map(id => ({ id, name: COURSE_NAMES[id] }));
      case 'room':
        return uniqueRooms.map(id => ({ id, name: ROOM_NAMES[id] }));
      case 'section':
        return uniqueSections.map(id => ({ id, name: SECTION_NAMES[id] }));
      default:
        return [];
    }
  };

  // Determine the time range to display
  const timeRange = {
    start: 7, // Start at 7:00
    end: 22,  // End at 22:00
  };
  
  const filteredSchedule = getFilteredSchedule();
  const selectorItems = getSelectorItems();
  
  // Calculate hours to display
  const hoursToDisplay = Array.from(
    { length: timeRange.end - timeRange.start }, 
    (_, i) => i + timeRange.start
  );

  // Function to render a schedule item
  const renderScheduleItem = (item) => {
    const dayIndex = item.day;
    const startHour = item.start_time - timeRange.start;
    const duration = item.end_time - item.start_time;
    const courseName = COURSE_NAMES[item.course];
    const roomName = ROOM_NAMES[item.room];
    const sectionName = SECTION_NAMES[item.section];
    
    return (
      <div 
        key={`${item.course}-${item.day}-${item.start_time}`}
        className={`absolute rounded-md p-2 border-l-4 border-blue-500 ${getCourseColor(item.course)}`}
        style={{
          top: `${(startHour / hoursToDisplay.length) * 100}%`,
          height: `${(duration / hoursToDisplay.length) * 100}%`,
          left: `${(dayIndex / DAYS.length) * 100}%`,
          width: `${(1 / DAYS.length) * 100}%`
        }}
      >
        <div className="text-xs font-semibold">{courseName}</div>
        <div className="text-xs">Room: {roomName}</div>
        <div className="text-xs">Section: {sectionName}</div>
        <div className="text-xs">{item.start_time}:00 - {item.end_time}:00</div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col">
      {/* Header with view mode toggles */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Class Timetable</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['course', 'room', 'section'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  setSelectedId(
                    mode === 'course' ? uniqueCourses[0] :
                    mode === 'room' ? uniqueRooms[0] : uniqueSections[0]
                  );
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                  viewMode === mode
                    ? 'bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            {selectorItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedId === item.id
                    ? 'bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timetable grid */}
      <div className="flex-1 flex flex-col">
        {/* Day headers */}
        <div className="flex border-b">
          <div className="w-16 flex-shrink-0"></div>
          {DAYS.map((day, index) => (
            <div 
              key={day}
              className="flex-1 text-center py-2 font-medium"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Timetable content */}
        <div className="flex-1 flex">
          {/* Time labels */}
          <div className="w-16 flex-shrink-0 border-r relative">
            {hoursToDisplay.map((hour, index) => (
              <div 
                key={hour}
                className="absolute text-xs text-gray-500"
                style={{ top: `${(index / hoursToDisplay.length) * 100}%`, right: '8px' }}
              >
                {hour}:00
              </div>
            ))}
          </div>
          
          {/* Grid for schedule */}
          <div className="flex-1 relative">
            {/* Horizontal time lines */}
            {hoursToDisplay.map((hour, index) => (
              <div 
                key={hour}
                className="absolute w-full border-t border-gray-200"
                style={{ top: `${(index / hoursToDisplay.length) * 100}%` }}
              ></div>
            ))}
            
            {/* Vertical day separators */}
            {DAYS.map((day, index) => index > 0 && (
              <div 
                key={day}
                className="absolute h-full border-l border-gray-200"
                style={{ left: `${(index / DAYS.length) * 100}%` }}
              ></div>
            ))}
            
            {/* Schedule items */}
            {filteredSchedule.map(renderScheduleItem)}
          </div>
        </div>
      </div>
    </div>
  );
}