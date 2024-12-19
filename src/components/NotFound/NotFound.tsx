import { PATHS } from "@/config/paths";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const onGoBack = () => navigate(PATHS.selection_page, { replace: true });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className=" flex flex-col items-center gap-4">
        <span className="text-5xl text-app-red-primary font-bold">404</span>

        <p className="text-app-dark-primary text-3xl font-semibold tracking-wider">
          Page Not Found
        </p>

        <button
          onClick={onGoBack}
          className="capitalize text-xl bg-app-dark-primary text-white py-3 px-6 rounded-md"
        >
          back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
