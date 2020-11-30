import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AppIcon from "../AppIcon/AppIcon";

import style from "./AddNewProject.module.css";
import AddNewProjectMenu from './AddNewProjectMenu';


function AddNewProjectBtn() {

    const [addNewProjectMenuActive, setAddNewProjectMenuActive] = useState(false);

    return (
        <div className={style["add-new-project-btn-wrapper"]}>
            <AppIcon icon="app-icon-plus.png" 
                onClickCallback={() => setAddNewProjectMenuActive(!addNewProjectMenuActive)} 
                color={"var(--create-new-project-theme-color-a)"} 
                size={38}
            />
            {addNewProjectMenuActive && 
            <div className={style["add-new-project-menu-modal"]} onClick={() => setAddNewProjectMenuActive(false)}>
                <AddNewProjectMenu setAddNewProjectMenuActive={setAddNewProjectMenuActive}/>
            </div>}
        </div>
    )
}

AddNewProjectBtn.propTypes = {

}

export default AddNewProjectBtn

