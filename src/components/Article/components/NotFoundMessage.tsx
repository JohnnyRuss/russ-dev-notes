type NotFoundMessageT = {
  message: string;
};

const NotFoundMessage: React.FC<NotFoundMessageT> = ({ message }) => {
  return (
    <div className="text-app-dark-primary min-h-[100svh] flex flex-col items-center justify-center gap-4">
      <span className="text-4xl font-semibold text-app-red-primary tracking-wider">
        404
      </span>
      <p className="text-xl font-medium tracking-wider">{message}</p>
    </div>
  );
};

export default NotFoundMessage;
