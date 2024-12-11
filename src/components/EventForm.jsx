import React, { useState, useEffect } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";

export default function EventForm({ event, onSave, onCancel }) {
  const [name, setName] = useState(event?.name || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [description, setDescription] = useState(event?.description || "");
  const [color, setColor] = useState(event?.color || "#000000");

  useEffect(() => {
    if (event) {
      setName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description || "");
      setColor(event.color || "#000000");
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: event?.id || "",
      name,
      startTime,
      endTime,
      description,
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event name"
        required
      />
      <Input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <Input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
