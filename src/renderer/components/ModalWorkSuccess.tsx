type Props = {
  secondsElapsed: string;
  onClose: (reason?: string) => void;
};

const ModalWorkSuccess = ({ secondsElapsed, onClose }: Props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="currentColor"
        className="text-green-600"
        viewBox="0 0 16 16"
      >
        <rect x="25%" y="25%" width="55%" height="55%" className="fill-white" />
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
      <p className="mt-3 text-xl font-semibold text-green-600">Job done!</p>
      <small className="mt-3 text-slate-700 dark:text-slate-300">
        Your video was created in <b>{secondsElapsed}</b> seconds!
      </small>
      <div className="flex mt-5 space-x-1">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onClose('openOutputDir')}
        >
          Close & open output directory
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClose()}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ModalWorkSuccess;
