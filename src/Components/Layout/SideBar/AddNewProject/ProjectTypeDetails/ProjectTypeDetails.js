import React from 'react'
import PropTypes from 'prop-types'

import { createNewProject } from '../../../../ServerProvider/projects';

import style from "./ProjectTypeDetails.module.css";

function ProjectTypeDetails({selectedProjectType, setSelectedProjectType}) {
    
    async function onDoneClick(){
        const newProjectRes = await createNewProject(selectedProjectType.projectProperties);
    }
    
    return (
        <div className={style["type-details"]}>
            <div className={style["type-details-back-arrow"]} onClick={()=> setSelectedProjectType(null)}>{"<"}</div> 
        </div>
    )
}

ProjectTypeDetails.propTypes = {

}

export default ProjectTypeDetails

