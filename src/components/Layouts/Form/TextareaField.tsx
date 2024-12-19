import React from "react";

type TextareaFieldT = {
  label?: string;
} & React.ComponentProps<"textarea">;

const TextareaField: React.FC<TextareaFieldT> = ({
  label,
  className,
  ...textareaProps
}) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      {label && (
        <label
          htmlFor={textareaProps.id || ""}
          className="font-semibold cursor-pointer text-base capitalize leading-3 text-white"
        >
          {label}
        </label>
      )}

      <textarea
        {...textareaProps}
        className={`w-full scrollbar resize-none rounded-md ${className || ""}`}
      />
    </div>
  );
};

export default TextareaField;
