type TextFieldT = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
  id?: string;
} & React.ComponentProps<"input">;

const TextField: React.FC<TextFieldT> = ({
  label,
  onChange,
  value,
  id,
  ...inputProps
}) => {
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

      <input
        id={id || ""}
        value={value}
        onChange={onChange}
        {...inputProps}
        className="rounded-md outline-none border border-app-gray-primary px-[10px] py-[8px] text-base text-app-dark-primary"
      />
    </div>
  );
};

export default TextField;
