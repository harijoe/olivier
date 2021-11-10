import { Context, Device } from 'common/types';
import { createContext, FC } from 'react';
import { useGame } from './useGame';
import { useLibrary } from './useLibrary';
import { useSession } from './useSession';
import { useUsers } from './useUsers';
import { useAuth } from './useAuth';
import { useRoom } from './useRoom';

export const AppContext = createContext({} as Context);

export const AppProvider: FC = ({ children }) => {
  const { auth } = useAuth();
  const { room, connectToRoom, setRoom } = useRoom({ auth });
  const { users, user } = useUsers({ auth });
  const { session } = useSession({ room, auth, user, setRoom });
  const { game, createGame, patchGame } = useGame({ session });
  const { library } = useLibrary({ game });

  return (
    <AppContext.Provider
      value={
        {
          auth,
          session,
          users,
          game,
          createGame,
          patchGame,
          library,
          connectToRoom,
          room,
          user,
        } as Context
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export const DeviceContext = createContext<{ device?: Device }>({});

export const DeviceProvider: FC<{ device: Device }> = ({
  device,
  children,
}) => {
  return (
    <DeviceContext.Provider value={{ device }}>
      {children}
    </DeviceContext.Provider>
  );
};
