import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux"

import {setProjectGroupDispatch} from "../../../../../redux/rootReducer"

import style from "./GroupTitle.module.css"

function GroupTitle({group}) {

	const dispatch = useDispatch();
	const editGroup = (updatedGroup) => dispatch(setProjectGroupDispatch(updatedGroup));


    const groupTitleRef = useRef(null);
    
	useEffect(() => {
		if (group.getsFocus === true) groupTitleRef.current.focus();
		editGroup({...group, getsFocus: false})
	}, [group.getsFocus])

    return (
        <input  className={style["group-title"]} value={group.title} ref={groupTitleRef} onClick={e => e.stopPropagation()}/>
    )
}

GroupTitle.propTypes = {

}

export default GroupTitle

