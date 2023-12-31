import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: React.ReactNode;
}

function Portal({ children }: Props) {
  const element = document.querySelector('body') as HTMLElement;

  // @ts-ignore
  return ReactDom.createPortal(children, element);
}

export default Portal;
