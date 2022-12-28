import React, { useEffect, useState } from 'react';

interface IShiftedElement {
  children: React.ReactNode;
  isShifted: boolean;
  initialTop: string;
  initialLeft: string;
}

export const ShiftedElement = ({ children, isShifted, initialTop, initialLeft }: IShiftedElement) => {
  const [top, setTop] = useState<string>(initialTop);
  const [left, setLeft] = useState<string>(initialLeft);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (isShifted) {
      setIsDisabled(true);
    }
    if (!isShifted) {
      setTop(initialTop);
      setLeft(initialLeft);
      setIsDisabled(false);
    }
  }, [isShifted]);

  const onMouseEvent = () => {
    if (isDisabled) {
      setTop(Math.ceil(Math.random() * 90) + '%');
      setLeft(Math.ceil((Math.random() - 0.3) * 90) + '%');
    }
  };
  return (
    <div
      onMouseEnter={onMouseEvent}
      onMouseLeave={onMouseEvent}
      style={{ position: 'absolute', top, left, transition: '0.1s ease-in' }}
    >
      {children}
    </div>
  );
};
