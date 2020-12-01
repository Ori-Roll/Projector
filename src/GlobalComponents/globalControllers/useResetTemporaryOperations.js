import react from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearSelectedTasksDispatch,
  changeLoadedStateDispatch,
} from '../../Components/redux/rootReducer';

function useResetTemporaryOperations(operations = 'all') {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.project.selectedTasks);
  const changeProjectLoadedState = (loadingState) =>
    dispatch(changeLoadedStateDispatch('project', loadingState));

  const reset = {
    all: (options = {}) => {
      dispatch(clearSelectedTasksDispatch());
      changeProjectLoadedState(
        options.projectLoadingMessage || 'Loading project...'
      );
    },
    selectedTasks: () => {
      dispatch(clearSelectedTasksDispatch());
    },
  };

  return reset[operations];
}

export default useResetTemporaryOperations;
