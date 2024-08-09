import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { login } from "../redux/slices/userSlice";
import registerSchema from "../utils/validationSchema/validationSchema";
import { RegisterFormInputs } from "../utils/interface/types";
import { toast } from "react-toastify";

interface UseRegisterReturn extends UseFormReturn<RegisterFormInputs> {
  onSubmit: (data: RegisterFormInputs) => void;
  registrationError: string | null;
}

const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, formState } = methods;
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/register",
        data
      );
      if (res.data.success) {
        const { user, token } = res.data;

        setRegistrationError(null);
        navigate("/");
        toast.success("Successfully Registerd");
      } else {
        setRegistrationError(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setRegistrationError("Failed to register. Please try again.");
    }
  };

  return {
    ...methods,
    handleSubmit,
    onSubmit,
    formState,
    registrationError,
  };
};

export default useRegister;
