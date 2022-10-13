import { useAppDispatch, useAppSelector } from 'dal/hooks/hooks';
import { toggle } from 'bll/filter-slice';

export const useToggleDrawer = () => {
  const dispatch = useAppDispatch();
  const drawer = useAppSelector((state) => state.filter.isDrawerOpen);

  const toggleDrawer = () => {
    dispatch(toggle());
  };
  return { drawer, toggleDrawer };
};
