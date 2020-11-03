import React from 'react'
import PropTypes from 'prop-types'

import style from "./AddNewProject.module.css";
import AddNewProjectMenu from './AddNewProjectMenu';


function AddNewProjectBtn(props) {

    return (
        <div className={style["add-new-project-btn"]} >
                
            {false && <AddNewProjectMenu/>}      
        </div>
    )
}

AddNewProjectBtn.propTypes = {

}

export default AddNewProjectBtn

