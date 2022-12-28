import { useState } from 'react';

export const useToggle = (initState?: boolean) => {
  const [modal, setModal] = useState(initState || false);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };
  return { modal, toggleModal };
};
