import React from "react";


export default function Day({
  date,
  events,
  isCurrentMonth,
  isToday,
  isSelected,
  onClick,
}) {
  const dayClasses = `
    p-2 h-24 border rounded cursor-pointer transition-colors
    ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"}
    ${isToday ? "border-blue-500" : ""}
    ${isSelected ? "bg-blue-100" : ""}
    ${date.getDay() === 0 || date.getDay() === 6 ? "bg-gray-50" : ""}
  `;

  return (
    <div className={dayClasses} onClick={onClick}>
      <div className="font-bold">{date.getDate()}</div>
      <div className="text-xs">
        {events.slice(0, 2).map((event, index) => (
          <div
            key={index}
            className="truncate"
            style={{ color: event.color || "inherit" }}
          >
            {event.name}
          </div>
        ))}
        {events.length > 2 && (
          <div className="text-gray-500">+{events.length - 2} more</div>
        )}
      </div>
    </div>
  );
}
