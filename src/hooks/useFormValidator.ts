import { useEffect, useState } from "react";
import { validateForm } from "../utils/validators";
import { SignUpFormData, SignUpFormDataError } from "../types";

export function useFormValidator() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    focusOn: "",
  });

  const [formError, setFormError] = useState<SignUpFormDataError>({
    email: {
      touched: false,
      error: false,
      message: "",
    },
    password: {
      touched: false,
      error: false,
      message: "",
    },
    confirmPassword: { touched: false, error: false, message: "" },
  });

  useEffect(() => {
    const { errors } = validateForm({
      form: formData,
      fields: [formData.focusOn],
      errorsState: formError,
    });

    setFormError(errors);
  }, [formData]);

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

  const onBlurField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (formError[name as keyof SignUpFormDataError].touched) return;

    const updatedErrors = {
      ...formError,
      [name]: {
        ...formError.email,
        touched: true,
      },
    };

    const { errors } = validateForm({
      form: formData,
      fields: [name],
      errorsState: updatedErrors,
    });

    setFormError(errors);
  };

  return { formData, formError, onBlurField, onUpdateField, setFormError };
}
