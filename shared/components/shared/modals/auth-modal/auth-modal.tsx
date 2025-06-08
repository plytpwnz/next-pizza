'use client';

import { Button } from '@/shared/components/ui';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { LoginForm, RegisterForm } from './forms';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <DialogTitle className="hidden" />

        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() => {
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              });
            }}>
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
            />
            Github
          </Button>

          <Button
            variant="secondary"
            type="button"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() => {
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              });
            }}>
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
            />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
