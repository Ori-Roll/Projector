import React, {useState} from 'react'
import PropTypes from 'prop-types'

import ProjectTypeDetails from "./ProjectTypeDetails/ProjectTypeDetails";
import ProjectTypeItems from "../../Project/ProjectHeader/AddNewProjectMenu/ProjectTypeDetails/ProjectTypeItems/ProjectTypeItems";

import style from "./AddNewProject.module.css"

function AddNewProjectMenu({setAddNewProjectMenuActive}) {

    const [selectedProjectType, setSelectedProjectType] = useState(null);
    

    return (
        <div 
        className={style["add-new-project-menu"]} 
        onClick={e=>e.stopPropagation()}>
            {selectedProjectType 
            ? <ProjectTypeDetails selectedProjectType={selectedProjectType} 
                setSelectedProjectType={setSelectedProjectType} 
                setAddNewProjectMenuActive={setAddNewProjectMenuActive} />
            : <ProjectTypeItems selectedProjectType={selectedProjectType} setSelectedProjectType={setSelectedProjectType}/>
            }
        </div>    
    )   
}

AddNewProjectMenu.propTypes = {

}

export default AddNewProjectMenu

