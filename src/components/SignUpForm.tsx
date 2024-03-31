import { ChangeEvent, FocusEvent } from "react";
import { useForm } from "../hooks/useForm";
import { AuthData } from "../types";
import { FormInput } from "./FormInput";

interface SignUpFormProps {
  loading: boolean;
  onSubmit: (props: AuthData) => void;
}

export function SignUpForm(props: SignUpFormProps) {
  const { loading, onSubmit } = props;

  const {
    formData,
    formError,
    touched,
    onBlurField,
    onUpdateField,
    validateAll,
  } = useForm();

  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={(e) => {
          e.preventDefault();

          const { isValid } = validateAll();

          if (isValid) {
            onSubmit({
              email: formData.email,
              password: formData.password,
            });
          }
        }}
      >
        <FormInput
          name={"email"}
          type={"text"}
          placeholder={"Email"}
          value={formData.email}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        <FormInput
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          value={formData.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        <FormInput
          name={"confirmPassword"}
          type={"password"}
          placeholder={"Confirm password"}
          value={formData.confirmPassword}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />

        <div>
          <button className="btn" type="submit">
            {loading ? (
              <>
                <i data-testid="loading" className="fa fa-spinner fa-spin"></i>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div className="error-wrap">
          {touched.email && (
            <div className="error"> {formError.email.message}</div>
          )}

          {touched.password && (
            <div className="error"> {formError.password.message}</div>
          )}

          {touched.confirmPassword && (
            <div className="error"> {formError.confirmPassword.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
