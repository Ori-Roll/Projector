import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux';

import AppIcon from "../../../../GlobalComponents/AppIcon/AppIcon";

import style from "./Notifications.module.css";

function Notifications() {
    
    const user = useSelector((state) => state?.user);
    
    const [notifications, setNotifications] = useState(false);

    function onNotificationsClick(){
        setNotifications(!notifications);
    }

    return (
        <div className={style["btn-wrappaer"]}>
            <AppIcon icon="app-icon-bell.png" onClickCallback={onNotificationsClick} color={"#5db043"}/>
            {notifications && <div className={style["notifications-wrapper"]}>
                    {user?.pendingMessages[0] && user.pendingMessages.map(msg => 
                        <div key={msg.header}><p>HEAD:{msg.header}</p><p>BODY:{msg.body}</p></div>
                    )}
                </div> }
        </div>
        
    )
}

Notifications.propTypes = {

}

export default Notifications

