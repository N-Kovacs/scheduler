import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }


  
  

  let dailyAppointments = [];

  const setDay = (day) => setState({ ...state, day });
  

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }

let interviewersDay = getInterviewersForDay(state, state.day)
console.log(interviewersDay)
console.log(state)
  dailyAppointments = getAppointmentsForDay(
    state,
    state.day
  );
  console.log(dailyAppointments)
  let counter = 0
  let Mapappointments = dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);



    return <Appointment key={appointment.id} interview = {interview} time={appointment.time}  />;
  });


  


  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")]).then(
      (all) => {



        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));


      }
    );
  }, []);




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
        <Appointment key="last" time="5pm" interviewers={interviewersDay} bookInterview={bookInterview}  />
      </section>
    </main>
  );
}
