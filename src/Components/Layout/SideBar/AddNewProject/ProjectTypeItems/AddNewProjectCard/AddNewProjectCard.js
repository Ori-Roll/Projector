import React from 'react'
import PropTypes from 'prop-types'

import style from "./AddNewProjectCard.module.css";


function AddNewProjectCard({projectType, setSelectedProjectType}) {

    async function onCardClick(){
        setSelectedProjectType(projectType);
    }

    return (
        <div className={style["project-card"]} onClick={onCardClick}>
            <div style={{backgroundColor: projectType.accentColor}}/>
            <img src={ `http://localhost:5000/api/v0/projectTypes/${projectType.icon}`}/>
            <h3>{projectType.title}</h3>
            <p>{projectType.description}</p>
        </div>
    )
}

AddNewProjectCard.propTypes = {

}

export default AddNewProjectCard

