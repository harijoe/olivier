import { useState, useEffect, useCallback } from 'react';
import feathers from 'services/feathers';
import { Device, User } from 'common/types';
import { find } from 'lodash';

export const useUsers = ({ auth }: { auth: any }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();

  const handler = useCallback(
    (message: { users: User[] }) => {
      setUsers(
        message.users.filter(
          ({ device, pseudo, avatar }) =>
            device === Device.iphone && pseudo && avatar,
        ),
      );
      if (auth?.user?._id) {
        const user = find(message.users, user => {
          return user._id === auth.user._id;
        });
        setUser(user);
      }
    },
    [auth],
  );

  // Update game object synchronously
  useEffect(() => {
    feathers.service('users').on('status', handler);

    return () => {
      feathers.service('users').removeListener('status', handler);
    };
  }, [handler]);

  return { users, user };
};
