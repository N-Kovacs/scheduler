import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); 
  
  
  


  // console.log(state);
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments);
  let Mapappointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewersDay = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        interview={interview}
        interviewers={interviewersDay}
        time={appointment.time}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Mapappointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
