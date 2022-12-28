import { useAppDispatch, useAppSelector } from 'services/hooks/hooks';
import { toggle } from 'store/filter-slice';

export const useToggleDrawer = () => {
  const dispatch = useAppDispatch();
  const drawer = useAppSelector((state) => state.filter.isDrawerOpen);

  const toggleDrawer = () => {
    dispatch(toggle());
  };
  return { drawer, toggleDrawer };
};
