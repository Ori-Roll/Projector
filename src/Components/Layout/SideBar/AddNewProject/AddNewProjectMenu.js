import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from "react-redux";

import AddNewProjectCard from "./AddNewProjectCard/AddNewProjectCard"

import style from "./AddNewProject.module.css"

function AddNewProjectMenu(props) {

    const projectTypes = useSelector((state) => state?.app?.globals?.projectTypes);

    return (
        <div className={style["add-new-project-menu"]} onClick={e=>e.stopPropagation()}>
                {projectTypes?.map(category => {
                        return (
                        <div className={style["add-new-project-menu-category-wrapper"]}>
                            <h3>{category.title}</h3>
                            <div className={style["add-new-project-menu-category"]}>
                                {category.types.map(type => <AddNewProjectCard key={type.title} projectType={type}/>)}
                            </div>
                        </div>) 
                        
                        
                    })
                }
        </div>    
    )   
}

AddNewProjectMenu.propTypes = {

}

export default AddNewProjectMenu

