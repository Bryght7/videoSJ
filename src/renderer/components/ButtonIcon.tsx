import { ReactNode } from 'react';

type Props = {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const ButtonIcon = ({ disabled = false, onClick, children }: Props) => {
  return (
    <button
      type="button"
      className="btn-primary"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
