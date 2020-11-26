import React, {useState} from 'react'
import PropTypes from 'prop-types'
import style from "./SelectedMenu.module.css";
import {clearSelectedTasksDispatch, setProjectGroupDispatch} from "./../../../../../redux/rootReducer"; 

import {db_deleteTasks} from "../../../../../ServerProvider/task"

import {useSelector,useDispatch} from "react-redux";
import {usePopper} from "react-popper"
import AppIcon from '../../../../../../GlobalComponents/AppIcon/AppIcon';

function SelectedMenu() {

    const [menuIsActive, setMenuIsActive] = useState(false);

    const dispatch = useDispatch();
    const selected = useSelector(state => state.project.selectedTasks)
    const project = useSelector(state => state.project)
    
    const clearSelectedTasks = ()=>dispatch(clearSelectedTasksDispatch())
    const setProjectGroup = (group)=>dispatch(setProjectGroupDispatch(group))
    /* const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }); */

    function onCheckAll(){
        console.log("CHECK ALL")
    }

    console.log("SELECT RENDER", selected.length);

    async function onDeleteSelected(){
        try{
            const deleteResGroup = await db_deleteTasks(selected, project._id);
            deleteResGroup.loaded = true;
            setProjectGroup(deleteResGroup);
            clearSelectedTasks();
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <>
            {/* <button 
                className={style["task-selected-menu-btn"]}
                ref={setReferenceElement}
                >-O-</button>
            <div ref={popperElement} className={style["task-selected-menu"]} style={styles.popper} {...attributes.popper}>
                <div ref={setArrowElement} style={styles.arrow}/>
            </div> */}
            <div className={style["icon-wrapper"]}>
                <AppIcon 
                    icon="app-icon-select-checkbox-checked.png" 
                    onClickCallback={()=>setMenuIsActive(!menuIsActive)}
                    color={(selected.length > 0) ?  "#3f84bf" : "#8aa4ba"} 
                    size={28}
                />
            </div>
            {menuIsActive && 
                <div className={style["task-selected-menu"]}>
                    <div className={style["selected-action-btn"]}>
                        <AppIcon 
                            id="select-all"
                            icon="app-icon-check-round.png" 
                            onClickCallback={onCheckAll}
                            color="#4078a8" 
                            size={28}
                        />
                        <label htmlFor="select-all">
                            Select all tasks
                        </label>
                    </div>
                    <div className={style["selected-action-btn"]}>
                        <AppIcon 
                            id="delete-selected"
                            icon="app-icon-trash-can.png" 
                            onClickCallback={onDeleteSelected}
                            color="#4078a8" 
                            size={28}
                        />
                        <label htmlFor="select-all">
                            Delete selected tasks
                        </label>
                    </div>
                </div>
            }
        </>
    )
}

SelectedMenu.propTypes = {

}

export default SelectedMenu

