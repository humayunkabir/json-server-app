import { FormEvent } from 'react';
import {
  useForm,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
} from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ObjectSchema } from 'joi';

export interface UseValidationReturn<T> {
  register: UseFormRegister<T>;
  onSubmit: (e: FormEvent) => Promise<void>;
  onReset: (e?: FormEvent) => void;
  errors: FieldErrors;
}

const useValidation = <T>(
  schema: ObjectSchema<T>,
  callback: SubmitHandler<T>
): UseValidationReturn<T> => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({ resolver: joiResolver(schema) });

  const onSubmit = handleSubmit(callback);
  const onReset = (e?: FormEvent) => {
    e?.preventDefault();
    reset();
  };

  return {
    register,
    onSubmit,
    onReset,
    errors,
  };
};

export default useValidation;
