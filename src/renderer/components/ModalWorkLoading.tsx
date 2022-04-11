import LoadingSpinner from './LoadingSpinner';

const ModalWorkLoading = () => {
  return (
    <>
      <LoadingSpinner />
      <p className="mt-3 text-xl font-semibold text-slate-700">
        One moment please...
      </p>
      <small className="mt-3 text-slate-700">
        The application is splitting and joining your video.
      </small>
    </>
  );
};

export default ModalWorkLoading;
