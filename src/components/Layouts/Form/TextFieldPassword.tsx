import { useState } from "react";

import { EyeOpen, EyeClose } from "@/components/Layouts/Icons";

type TextFieldPasswordT = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
  id?: string;
} & React.ComponentProps<"input">;

const TextFieldPassword: React.FC<TextFieldPasswordT> = ({
  id,
  value,
  label,
  onChange,
  ...inputProps
}) => {
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="w-full flex flex-col gap-[10px]">
      {label && (
        <label
          htmlFor={id || ""}
          className="font-semibold cursor-pointer text-base capitalize leading-3 text-app-dark-primary"
        >
          {label}
        </label>
      )}

      <div className="w-full rounded-md border border-app-gray-primary pr-3 flex items-center gap-[10px] bg-white">
        <input
          type={inputType}
          id={id || ""}
          value={value}
          onChange={onChange}
          {...inputProps}
          className="w-full outline-none border-none rounded-[inherit] px-[10px] py-[8px] text-base text-app-dark-primary"
        />

        <button
          type="button"
          onClick={onToggle}
          className="w-max text-3xl flex items-center justify-center text-app-dark-primary pl-[5px] bg-[inherit] border-l border-l-app-gray-primary"
        >
          {inputType === "password" ? <EyeOpen /> : <EyeClose />}
        </button>
      </div>
    </div>
  );
};

export default TextFieldPassword;
