import React from 'react'
import PropTypes from 'prop-types'

import style from "./AppIcon.module.css";

function AppIcon({icon, onClickCallback}) {
    
    console.log("RENDER ICON")

    const photoUrl = `http://localhost:5000/api/v0/assets/icons/${icon}`;

    return (
        <div className={style["icon-wrapper"]}>
            <img className={style["icon-img"]} src={photoUrl}/>  
        </div>
          
    )
}

AppIcon.propTypes = {

}

export default AppIcon

