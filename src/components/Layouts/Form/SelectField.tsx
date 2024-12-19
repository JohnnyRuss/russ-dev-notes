import Select from "react-select";
import { ReactSelectValueT } from "@/interface/ui/react-select.types";

type SelectFieldT = {
  label: string;
  placeholder: string;
  options: Array<ReactSelectValueT>;
  value: ReactSelectValueT;
  onChange: (args: ReactSelectValueT) => void;
};

const SelectField: React.FC<SelectFieldT> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <label
        htmlFor=""
        className="font-semibold cursor-pointer text-base capitalize leading-3 text-white"
      >
        {label}
      </label>

      <Select
        value={value}
        options={options}
        placeholder={placeholder}
        classNamePrefix="app-select-field"
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default SelectField;
