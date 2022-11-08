import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function useApplicationData(){

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    });
    
  
    const setDay = (day) => setState({ ...state, day });
    

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
       
          setState({
            ...state,
            appointments,
          });
         
        })

      


    }
  
    function cancelInterview(id){
  
      return axios
      .delete("/api/appointments/" + id, {interview: null})
      .then((resolve) => {
        // console.log(id, interview);
  
      });
    }


    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
        //axios.get("/api/debug/reset")
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
    }, [state.appointments]);

    return{state, setDay, bookInterview, cancelInterview}
  }
