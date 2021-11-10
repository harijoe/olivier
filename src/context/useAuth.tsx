import { useMount } from 'ahooks';
import { DeviceContext } from 'context';
import { useContext, useState } from 'react';
import feathers from 'services/feathers';

export const useAuth = () => {
  const [auth, setAuth] = useState<any>();
  const { device } = useContext(DeviceContext);

  useMount(() => {
    feathers.on('authenticated', p => {
      setAuth(p);
    });

    feathers.reAuthenticate().catch(async () => {
      const login = (Math.random() + 1).toString(36).substring(7);

      await feathers.service('users').create({
        login,
        password: 'DUMMY_PASSWORD',
        device,
      });
      await feathers.authenticate({
        login,
        strategy: 'local',
        password: 'DUMMY_PASSWORD',
      });
    });
  });

  return { auth };
};
