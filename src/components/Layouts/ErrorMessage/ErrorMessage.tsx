type ErrorMessageT = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageT> = ({ message }) => {
  return (
    <p className={"text-app-red-shade w-full text-start text-base"}>
      {message}
    </p>
  );
};

export default ErrorMessage;
