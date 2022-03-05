import { ReactNode } from 'react';

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const ButtonIcon = ({ isDisabled = false, onClick, children }: Props) => {
  console.log('rtendering button');

  return (
    <button
      type="button"
      className="btn-primary"
      disabled={isDisabled || false}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
