type FormInputProps = {
  label: string;
} & React.ComponentProps<"input">;

export default function FormInput({
  label,
  id,
  type,
  name,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <>
      <label className="hidden text-[#424286]" htmlFor={id}>
        {label}
      </label>
      <input
        className="bg-[#CCCCFA] bg-opacity-40 dark:placeholder:text-[#D1D1D1] placeholder:text-[#424286] dark:bg-[#191925] dark:bg-opacity-50 py-3 px-10 rounded-lg"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
