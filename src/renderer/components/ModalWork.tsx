import ModalWorkError from './ModalWorkError';
import ModalWorkLoading from './ModalWorkLoading';
import ModalWorkSuccess from './ModalWorkSuccess';

type Props = {
  working: boolean;
  successWork: boolean;
  secondsElapsed: string;
  onClose: (reason?: string) => void;
};

const ModalWork = ({
  working,
  successWork,
  secondsElapsed,
  onClose,
}: Props) => {
  return (
    <div className="fixed z-20 w-full h-full backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center fixed left-[275px] top-[90px] mx-auto bg-white dark:bg-zinc-900 w-[470px] h-[300px] drop-shadow-2xl">
        {working && <ModalWorkLoading />}
        {!working &&
          (successWork ? (
            <ModalWorkSuccess
              secondsElapsed={secondsElapsed}
              onClose={onClose}
            />
          ) : (
            <ModalWorkError onClose={onClose} />
          ))}
      </div>
    </div>
  );
};

export default ModalWork;
