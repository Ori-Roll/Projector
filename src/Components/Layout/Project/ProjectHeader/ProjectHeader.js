import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux"

import {db_createNewGroup} from "../../../ServerProvider/groups"
import {setProjectGroupsDispatch} from "../../../redux/rootReducer"
import AppIcon from '../../../../GlobalComponents/AppIcon/AppIcon'

import style from "./ProjectHeader.module.css"

function ProjectHeader({project}) {

    const dispatch = useDispatch();

    const addNewGroupToProjectGroups = (newGroup)=> dispatch(
        setProjectGroupsDispatch(
            [...project.groups, newGroup]
    )) 

    async function onCreateNewClick(){
        try {
            const newGroup = await db_createNewGroup(project._id);
            newGroup.loaded = true;
            console.log("got new group", newGroup)
            addNewGroupToProjectGroups(newGroup);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={style["project-header"]}>
           <div className={style["project-header-left"]}>
               
           </div>
           <h1>{project.name}</h1>
           <div className={style["project-header-right"]}>
                <AppIcon 
                    icon="app-icon-plus.png"
                    color="#87b0c4"
                    size={40}
                    onClickCallback={onCreateNewClick}
                />
           </div>
        </div>
    )
}

ProjectHeader.propTypes = {

}

export default ProjectHeader

