import React from 'react';

type Props = {
  color?: 'gray';
};

const Spinner = ({ color = 'gray' }: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className={`mx-auto lds-spinner lds-spinner-${color}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default React.memo(Spinner);
