import { Check } from "@/components/Layouts/Icons";

type CheckBoxT = {
  checked: boolean;
  onCheck?: () => void;
};

const CheckBox: React.FC<CheckBoxT> = ({ checked, onCheck = () => {} }) => {
  return (
    <label
      data-checkbox
      className="inline-block size-7 min-w-7 rounded-full border border-app-gray-primary bg-white"
      onClick={onCheck}
    >
      <span
        className={`w-full h-full rounded-[inherit] flex items-center justify-center text-app-dark-primary ${
          checked ? "scale-100" : "scale-0"
        }`}
      >
        <Check />
      </span>
    </label>
  );
};

export default CheckBox;
