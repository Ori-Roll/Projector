import React from 'react'
import PropTypes from 'prop-types'

import AddNewProjectCard from "./AddNewProjectCard"

import style from "./AddNewProject.module.css"

function AddNewProjectMenu(props) {

    return (
            <div className={style["add-new-project-menu"]}>
                <AddNewProjectCard/>
            </div>
    )
}

AddNewProjectMenu.propTypes = {

}

export default AddNewProjectMenu

