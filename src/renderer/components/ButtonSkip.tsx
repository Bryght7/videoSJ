import ButtonIcon from './ButtonIcon';

type Props = {
  direction: 'forward' | 'backward';
  disabled?: boolean;
  seconds?: number;
  onControl: (control: 'forward' | 'backward', value?: number) => void;
};

const ButtonSkip = ({
  direction,
  disabled = false,
  seconds = 10,
  onControl,
}: Props) => {
  return (
    <ButtonIcon
      disabled={disabled}
      onClick={() => onControl(direction, seconds)}
    >
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 16 16"
        >
          {direction === 'backward' ? (
            <>
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </>
          ) : (
            <>
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </>
          )}
        </svg>
        <span className="fixed text-[8px] mr-px">{seconds}</span>
      </div>
    </ButtonIcon>
  );
};

export default ButtonSkip;
