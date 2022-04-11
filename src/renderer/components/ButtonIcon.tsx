import { ReactNode } from 'react';

type Props = {
  disabled?: boolean;
  title?: string;
  onClick: () => void;
  children: ReactNode;
};

const ButtonIcon = ({
  disabled = false,
  title = undefined,
  onClick,
  children,
}: Props) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
