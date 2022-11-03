import React, { useState } from "react";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss"


export default function Appointment(props){
  return(
    
    <article className="appointment">
      <header>
        {props.time}
      </header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}  /> : <Empty />}
    </article>
  )
}