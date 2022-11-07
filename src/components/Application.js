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

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios
      .put("/api/appointments/" + id, { interview: interview })
      .then((resolve) => {
        // console.log(id, interview);
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        // console.log("here")
        setState({
          ...state,
          appointments,
        });
      });
  }
  function cancelInterview(id){

    return axios
    .delete("/api/appointments/" + id, {interview: null})
    .then((resolve) => {
      // console.log(id, interview);

    });
  }

  const setDay = (day) => setState({ ...state, day });

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }

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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      // axios.get("/api/debug/reset")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [state.day]);

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
