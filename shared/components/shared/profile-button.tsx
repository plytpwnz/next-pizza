'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, className }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className={className}>
      {!loading ? (
        !session ? (
          <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
        ) : (
          <Link href="/profile">
            <Button variant="secondary" className="flex items-center gap-1">
              <CircleUser size={16} />
              Профиль
            </Button>
          </Link>
        )
      ) : (
        <Skeleton className="w-[94px] h-10" />
      )}
    </div>
  );
};
