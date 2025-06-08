'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success('Данные успешно обновлены', {
        icon: '✅',
      });
    } catch (error) {
      console.log('Error [REGISTER]', error);
      toast.error('Ошибка при регистрации', {
        icon: '❌',
      });
    }
  };

  const onClickSighnOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="flex flex-col items-center my-10">
      <Title text={`Личные данные | ${data.fullName}`} size="md" className="font-bold" />
      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput type="email" name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" isPassword required />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            isPassword
            required
          />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSighnOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
