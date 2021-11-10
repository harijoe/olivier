import { Device, Room, Session, User } from 'common/types';
import { DeviceContext } from 'context';
import { useCallback, useContext } from 'react';
import { useEffect, useState } from 'react';
import feathers from 'services/feathers';
import { useListener } from './useListener';
import { merge } from 'lodash';

export const useSession = ({
  room,
  auth,
  user,
  setRoom,
}: {
  room?: Room;
  auth: any;
  user?: User;
  setRoom: (r?: Room) => void;
}) => {
  const [session, setSession] = useState<Session>();
  const { device } = useContext(DeviceContext);

  const createSession = async (data: any = {}) => {
    const r = await feathers.service('games').create(data);
    setSession(r);
  };

  // Update game object synchronously
  useListener<Session>({
    serviceName: 'sessions',
    setter: setSession,
  });

  // On new session we clear iphones
  const onCreated = useCallback(() => {
    if (auth) {
      if (device === Device.iphone) {
        setRoom(undefined);

        feathers.service('users').patch(auth.user._id, {
          pseudo: null,
          avatar: null,
          room_id: null,
          session_id: null,
        });
      }
    }
    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    feathers.service('sessions').on('created', onCreated);

    return () => {
      feathers.service('sessions').removeListener('created', onCreated);
    };
  }, [onCreated]);

  const connectToLastRunningSession = useCallback(
    async (room: Room) => {
      const {
        data: [lastRunningSession],
      } = await feathers.service('sessions').find({
        query: {
          ended: { $ne: true },
          $limit: 1,
          $sort: {
            created_at: -1,
          },
          room_id: room._id,
        },
      });

      if (lastRunningSession) {
        setSession(lastRunningSession);

        // We reset pseudo when the retrieved session was not the user session
        if (device === Device.iphone) {
          if (!user) {
            return;
          }

          await feathers.service('users').patch(
            user._id,
            merge(
              { session_id: lastRunningSession._id },
              user.session_id !== lastRunningSession._id && {
                pseudo: null,
                avatar: null,
              },
            ),
          );
        }
      }
    },
    // eslint-disable-next-line
    [user?._id],
  );

  // Gets the session when a room is selected, see useRoom
  useEffect(() => {
    if (!room) {
      return;
    }

    connectToLastRunningSession(room);
  }, [room, connectToLastRunningSession]);

  return {
    session,
    createSession,
  };
};
