import "./loader.css";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center text-white bg-app-black-transparent">
      <span className="loader" />
    </div>
  );
};

export default Spinner;
