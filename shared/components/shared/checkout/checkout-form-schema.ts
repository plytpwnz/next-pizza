import { z } from 'zod';

export const CheckoutFormSchema = z.object({
  firstName: z.string().min(3, { message: 'Имя должно содержать не менее 3-х символов' }),
  lastName: z.string().min(3, { message: 'Фамилия должна содержать не менее 3-х символов' }),
  email: z.string().email({ message: 'Некорректный email' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;
