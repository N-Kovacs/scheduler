import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //const[update, setUpdate] = useState("")

  const setDay = (day) => setState({ ...state, day });

  function setSpots(change) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots + change,
        };
      }
      return day;
    });
    return days;
  }

  function bookInterview(id, interview, isEdit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put("/api/appointments/" + id, { interview: interview })
      .then((resolve) => {
        let spotchange = state.days;
        if (isEdit === false) {
          spotchange = setSpots(-1);
        }
        setState({
          ...state,
          appointments,
          days: spotchange,
        });

        return
      })
  }

  function cancelInterview(id) {
    return axios
      .delete("/api/appointments/" + id, { interview: undefined })
      .then((resolve) => {
        let spotchange = setSpots(+1);
        setState({
          ...state,
          days: spotchange,
        });
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
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
