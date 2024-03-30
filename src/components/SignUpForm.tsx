import { useState } from "react";
import { validateForm } from "../utils/validators";
import { SignUpFormData } from "../types";
import { useFormValidator } from "../hooks/useFormValidator";

interface onSubmitProps {
  email: string;
  password: string;
}

interface SignUpFormProps {
  loading: boolean;
  onSubmit: (props: onSubmitProps) => void;
}

export function SignUpForm(props: SignUpFormProps) {
  const { loading, onSubmit } = props;
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    focusOn: "",
  });

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextFormState = {
      ...formData,
      ...{
        [name]: value,
        focusOn: name,
      },
    };
    setFormData(nextFormState);
  };

  const { formError, onBlurField, setFormError } = useFormValidator(formData);

  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={(e) => {
          e.preventDefault();

          const { isValid, errors } = validateForm({
            form: formData,
            fields: ["email", "password", "confirmPassword"],
            errorsState: formError,
            forceTouched: true,
          });

          if (isValid) {
            onSubmit({
              email: formData.email,
              password: formData.password,
            });
          } else {
            setFormError(errors);
          }
        }}
      >
        <div>
          <input
            className="input"
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={onUpdateField}
            onBlur={onBlurField}
          ></input>
        </div>
        <div>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={onUpdateField}
            onBlur={onBlurField}
          ></input>
        </div>
        <div>
          <input
            className="input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={onUpdateField}
            onBlur={onBlurField}
          ></input>
        </div>

        <div>
          <button className="btn" type="submit">
            {loading && (
              <>
                <i data-testid="loading" className="fa fa-spinner fa-spin"></i>
                loading
              </>
            )}
            Submit
          </button>
        </div>
        <div className="error-wrap">
          <div className="error"> {formError.email.message}</div>
          <div className="error"> {formError.password.message}</div>
          <div className="error">{formError.confirmPassword.message}</div>
        </div>
      </form>
    </div>
  );
}
