import react from "react"
import {useDispatch, useSelector} from 'react-redux';

import { clearSelectedTasksDispatch, changeLoadedStateDispatch } from "../../Components/redux/rootReducer"

function useResetTemporaryOperations(operations = "all"){

    const dispatch = useDispatch();

    const selected = useSelector(state => state.project.selectedTasks);
    const changeProjectLoadedState = (isLoaded) => dispatch(changeLoadedStateDispatch("project", isLoaded))

    const reset = {
        all: ()=>{
            dispatch(clearSelectedTasksDispatch())
            changeProjectLoadedState(false);
        }
    }
        
    return (reset[operations]);
}



export default useResetTemporaryOperations