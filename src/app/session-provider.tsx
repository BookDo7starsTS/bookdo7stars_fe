'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { RootState } from './reducers';
import { useEffect } from 'react';
import { checkSessionRequest } from './actions/types';

const SessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (!user) {
      dispatch(checkSessionRequest());
    }
  }, [user]);

  return <>{children}</>;
};

export default SessionProvider;
