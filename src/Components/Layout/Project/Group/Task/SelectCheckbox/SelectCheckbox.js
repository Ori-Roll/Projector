import React from 'react'
import PropTypes from 'prop-types'
import style from "./SelectCheckbox.module.css";
import {addToSelectedTasksDispatch, removeFromSelectedTasksDispatch} from "./../../../../../redux/rootReducer"; 
import {useSelector,useDispatch} from "react-redux";

function SelectCheckbox({taskIsSelected ,setTaskIsSelected, taskId}) {
    
    const dispatch = useDispatch();
    const selected = useSelector(state => state.project.selectedTasks)

    const changeSelectedTo = {
        selected: () => dispatch(addToSelectedTasksDispatch(taskId)),
        unSelected: ()=> dispatch(removeFromSelectedTasksDispatch(taskId)),
    }
    
    function toggleSelected(){
        
        if(taskIsSelected){
            changeSelectedTo.unSelected()
        } else {
            changeSelectedTo.selected()
        }
        setTaskIsSelected(!taskIsSelected);
    }

    return (
        <input 
            type="checkbox" 
            className={style["task-selection-checkbox"]}
            checked={taskIsSelected}
            onChange={()=>toggleSelected()}
            />
    )
}

SelectCheckbox.propTypes = {

}

export default SelectCheckbox

