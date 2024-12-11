import React from "react";
import { Button } from "../../@/components/ui/button";



export default function EventList({
  date,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Events for {date.toLocaleDateString()}
      </h2>
      {events.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <div>
                <span className="font-bold">{event.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(event.startTime).toLocaleTimeString()} -{" "}
                  {new Date(event.endTime).toLocaleTimeString()}
                </span>
              </div>
              <div>
                <Button
                  onClick={() => onEditEvent(event)}
                  variant="outline"
                  size="sm"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteEvent(event.id)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button onClick={onAddEvent} className="mt-4">
        Add Event
      </Button>
    </div>
  );
}
