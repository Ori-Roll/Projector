import React, {useState} from 'react'
import PropTypes from 'prop-types'
import style from "./SelectedMenu.module.css";
import {clearSelectedTasksDispatch} from "./../../../../../redux/rootReducer"; 

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

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    function onCheckAll(){
        console.log("CHECK ALL")
    }

    async function onDeleteSelected(){
        try{
            const deleteRes = await db_deleteTasks(selected, project._id);
            console.log(deleteRes);
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
                    icon="app-icon-arrow-notrail.png" 
                    onClickCallback={()=>setMenuIsActive(!menuIsActive)}
                    color={(selected.length > 0) ?  "#4078a8" : "#d9d9d9"} 
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

