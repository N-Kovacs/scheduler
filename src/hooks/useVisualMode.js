import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //transitions in appointments
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      let replaceHist = history.slice(0, history.length - 1);
      setHistory([...replaceHist, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }
  function back() {
    const old = history.slice(0, history.length - 1);
    setMode(old[old.length - 1]);
    setHistory(old);
  }

  return { mode, transition, back };
}
