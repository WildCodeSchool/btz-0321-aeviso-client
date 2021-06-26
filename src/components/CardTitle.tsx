import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function CardTitle({ children }: IProps): JSX.Element {
  return <h3 className="dark:text-white text-black text-xl font-bold">{children}</h3>;
}

export default CardTitle;
