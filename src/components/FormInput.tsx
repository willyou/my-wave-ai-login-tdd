import css from "./FormInput.module.css";
interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export function FormInput(props: FormInputProps) {
  const { name, type, placeholder, value, onChange, onBlur } = props;
  return (
    <div>
      <input
        className={css.input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
    </div>
  );
}
