// Card to show a single event
import React from "react";
import { Event } from "../api";
import './EventCard.css';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-image">
        <img src="{event.img_url}" alt="Event image" />
      </div>
      <div className="event-card-header">
        <div className="event-card-title">
          {event.title}
        </div>
        <div className="event-card-date">
            {new Date(event.date).toLocaleDateString()}
        </div>
        <div>
            {event.location}
        </div>
      </div>
    </div>
  );
};

export default EventCard;