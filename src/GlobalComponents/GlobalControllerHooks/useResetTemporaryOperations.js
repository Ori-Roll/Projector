import {useDispatch} from 'react-redux';

import { clearSelectedTasksDispatch } from "../../Components/redux/rootReducer"

export default function useResetTemporaryOperations(operations = "all"){

    const dispatch = useDispatch();

    const reset = {
        all: ()=>{
            dispatch(clearSelectedTasksDispatch())
        }
    }
    reset[operations]();
}