import React, {useState} from 'react'
import PropTypes from 'prop-types'

import _ from "lodash";

import style from "./DueDate.module.css";
import CellsStyle from "../CellsStyle.module.css";
import AppIcon from '../../../../../../../GlobalComponents/AppIcon/AppIcon';

function DueDate({cell, doCellChange, task, taskChange}) {
    
    
    const [date, setDate] = useState(task.dueDate ? task.dueDate : new Date());


    function onChange(value) {
        console.log(value)
    }

    return (
        <div className={`${CellsStyle.cell} ${style["duedate-cell"]}`}>
            <div className={style["duedate-icon-wrapper"]}>
            <AppIcon icon={"app-icon-calendar.png"} color="#cad2e0" size={25}/>
            </div>
            
            <input
            className={style["duedate-input"]}
            value={ date && _.isDate(date) ?
                `${date.toLocaleString("default", { weekday: "short" })}, ${date.getDate()}/${date.getMonth()}, ${date.getHours()}:${date.getMinutes()}` : "choose date" }
            onChange={ e=> onChange(e.target.value)}
            />
        </div>
        
    )
}


DueDate.propTypes = {

}


export default DueDate

