import { useState } from "react";
import { validateForm } from "../utils/validators";
import { SignUpFormData, TouchedState } from "../types";

export function useForm() {
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { errors } = validateForm({
    form: formData,
  });

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextFormState = {
      ...formData,
      ...{
        [name]: value,
      },
    };
    setFormData(nextFormState);
  };

  const onBlurField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (touched[name as keyof TouchedState]) return;
    setTouched({ ...touched, [name]: true });
  };

  const validateAll = () => {
    setTouched({ email: true, password: true, confirmPassword: true });
    return validateForm({
      form: formData,
    });
  };

  return {
    formData,
    formError: errors,
    touched,
    onBlurField,
    onUpdateField,
    validateAll,
  };
}
