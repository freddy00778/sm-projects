import React, { useState } from "react";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomChangeTable from "./CalendarTables/CustomChangeTable";
import { EventsData } from "../../data/EventsData";
import "./Calender.css";
interface DemoAppState {
  weekendsVisible?: boolean;
}

export type Event = {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  width?: number;
};

const CalendarComponent: React.FC<DemoAppState> = ({
  weekendsVisible = true,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(EventsData);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      allDay: clickInfo.event.allDay,
    });
  };

  const handleEventMouseEnter = (mouseEnterInfo: EventClickArg) => {
    const eventElement = mouseEnterInfo.el;
    const eventName = mouseEnterInfo.event.title;
    eventElement.setAttribute("title", eventName);
  };

  const handleEventMouseLeave = (mouseLeaveInfo: EventClickArg) => {
    const eventElement = mouseLeaveInfo.el;
    eventElement.removeAttribute("title");
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const MAX_TITLE_LENGTH = 20; // Maximum length of the event title

    let truncatedTitle = eventContent.event.title;
    if (truncatedTitle.length > MAX_TITLE_LENGTH) {
      truncatedTitle = truncatedTitle.substring(0, MAX_TITLE_LENGTH) + "...";
    }

    return (
      <div className="event-container">
        <div className="event-number" title={eventContent.event.title}>
          <i className="text-[12px]">{eventContent.event.id}</i>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={20}
        dayMaxEventRows={20}
        weekends={weekendsVisible}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        events={events} // render events from the state
      />
      {selectedEvent && (
        <CustomChangeTable
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
