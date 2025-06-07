import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Пароль должен содержать не менее 4 символов' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema 
  .merge(
    z.object({
      fullName: z.string().min(3, { message: 'Имя должно содержать не менее 3-х символов' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

  export type TFormLoginValues = z.infer<typeof formLoginSchema>;
  export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;