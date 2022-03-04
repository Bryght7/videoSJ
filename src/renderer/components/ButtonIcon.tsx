import { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const ButtonIcon = ({ isDisabled = false, onClick, children }: Props) => {
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
