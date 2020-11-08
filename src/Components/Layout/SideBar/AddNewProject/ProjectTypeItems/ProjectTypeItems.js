import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from "react-redux";

import AddNewProjectCard from "./AddNewProjectCard/AddNewProjectCard"

import style from "./ProjectTypeItems.module.css"

function ProjectTypeItems({selectedProjectType, setSelectedProjectType}) {

    const projectTypes = useSelector((state) => state?.app?.globals?.projectTypes);

    return (
    <div className={style["project-type-items"]}>
        <h1>Use these tamplates to start a new project:</h1>
            {projectTypes?.map(category => {
                    return (
                    <div className={style["add-new-project-menu-category-wrapper"]} key={category.title}>
                        <h3>{category.title}</h3>
                        <div className={style["add-new-project-menu-category"]}>
                            {category.types.map(type => 
                                <AddNewProjectCard key={type.title} projectType={type} setSelectedProjectType={setSelectedProjectType}/>)}
                        </div>
                    </div>) 
                })
            }
    </div>
    )
}

ProjectTypeItems.propTypes = {

}

export default ProjectTypeItems

