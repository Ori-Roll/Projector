import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux"

import {setProjectGroupDispatch} from "../../../../../redux/rootReducer"
import {db_updateGroup} from "../../../../../ServerProvider/groups"
import style from "./GroupTitle.module.css"

function GroupTitle({group}) {

	const dispatch = useDispatch();
	const editGroup = (updatedGroup) => dispatch(setProjectGroupDispatch(updatedGroup));

    const groupTitleRef = useRef(null);
    
	useEffect(() => {
		if (group.getsFocus === true) groupTitleRef.current.focus();
		editGroup({...group, getsFocus: false})
	}, [group.getsFocus])

    function onGroupTitleChange(title){
        editGroup({...group, title: title})
    }

    async function onGroupTitleSet(){
        try {
            const updatedGroup = await db_updateGroup(group);
            console.log('updatedGroup', updatedGroup)
        } catch (error){

            // TODO: This needs to update back to the old name if this fails
            
                console.error('error updating group', error)
        }
    }

    return (
        <input  className={style["group-title"]} 
                value={group.title} 
                ref={groupTitleRef} 
                onClick={e => e.stopPropagation()}
                onChange={e=> onGroupTitleChange(e.target.value)}
                onBlur={onGroupTitleSet}/>
    )
}

GroupTitle.propTypes = {

}

export default GroupTitle

