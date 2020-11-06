import React, { useState } from 'react'
import PropTypes from 'prop-types'

import style from "./AddNewProject.module.css";
import AddNewProjectMenu from './AddNewProjectMenu';


function AddNewProjectBtn(props) {

    const [addNewProjectMenuActive, setAddNewProjectMenuActive] = useState(false);

    return (
        <div className={style["add-new-project-btn"]} onClick={() => setAddNewProjectMenuActive(!addNewProjectMenuActive)}>
            {addNewProjectMenuActive && 
            <div className={style["add-new-project-menu-modal"]} onClick={() => setAddNewProjectMenuActive(false)}>
                <AddNewProjectMenu/>
            </div>}
        </div>
    )
}

AddNewProjectBtn.propTypes = {

}

export default AddNewProjectBtn

