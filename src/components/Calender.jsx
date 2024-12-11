import React, { useState, useEffect } from 'react';
import { Button } from "../../@/components/ui/button"
import { Card, CardContent } from "../../@/components/ui/card"
import { Input } from "../../@/components/ui/input"
import { getDaysInMonth, getMonthYear, isSameDay } from '../utils/dateUtils';
import Day from './Day';
import EventForm from './EventForm';
import EventList from './EventList';
import Modal from './Modal';


export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowEventList(true);
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      setEditingEvent(null);
      setShowEventForm(true);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (event) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now().toString() }]);
    }
    setShowEventForm(false);
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    event.description?.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handlePrevMonth}>&lt; Previous</Button>
          <h2 className="text-2xl font-bold">{getMonthYear(currentDate)}</h2>
          <Button onClick={handleNextMonth}>Next &gt;</Button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold">{day}</div>
          ))}
          {daysInMonth.map((date, index) => (
            <Day
              key={index}
              date={date}
              events={filteredEvents.filter(event => isSameDay(new Date(event.startTime), date))}
              isCurrentMonth={date.getMonth() === currentDate.getMonth()}
              isToday={isSameDay(date, new Date())}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              onClick={() => handleDayClick(date)}
            />
          ))}
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Filter events..."
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
          />
        </div>
      </CardContent>
      {showEventList && selectedDate && (
        <Modal onClose={() => setShowEventList(false)}>
          <EventList
            date={selectedDate}
            events={filteredEvents.filter(event => isSameDay(new Date(event.startTime), selectedDate))}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </Modal>
      )}
      {showEventForm && (
        <Modal onClose={() => setShowEventForm(false)}>
          <EventForm
            event={editingEvent}
            onSave={handleSaveEvent}
            onCancel={() => setShowEventForm(false)}
          />
        </Modal>
      )}
    </Card>
  );
}

