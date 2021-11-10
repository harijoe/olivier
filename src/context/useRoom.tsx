import { Device, Room } from 'common/types';
import { DeviceContext } from 'context';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import feathers from 'services/feathers';

export const useRoom = ({ auth }: { auth: any }) => {
  const [room, setRoom] = useState<Room>();
  const { device } = useContext(DeviceContext);
  let { room_id } = useParams<{ room_id: string }>();

  // Updates room in context and patch user
  const connectToRoom = async (room_id: string) => {
    if (!auth) {
      return;
    }

    try {
      const room = await feathers.service('rooms').get(room_id);
      await feathers.service('users').patch(auth.user._id, { room_id, device });

      setRoom(room);
    } catch (e) {
      window.alert("Erreur - la room n'existe peut-être pas");
    }
  };

  // Init function ran only once
  // We don't useMount because we wait auth to be set
  useEffect(() => {
    if (!auth) {
      return;
    }
    const handle = async () => {
      const user_room_id = auth?.user?.room_id;
      if (device === Device.iphone) {
        if (!user_room_id) {
          return;
        }
        const { data: sessions } = await feathers.service('sessions').find({
          query: {
            room_id: user_room_id,
            ended: {
              $ne: true,
            },
            $sort: {
              created_at: -1,
            },
          },
        });
        // We connect iphone if the retrieved session in the one saved by the iphone
        if (sessions.length > 0 && auth.user.session_id === sessions[0]._id) {
          connectToRoom(user_room_id);
        }
      } else {
        connectToRoom(room_id);
      }
    };

    handle();
    // eslint-disable-next-line
  }, [auth]);

  return {
    room,
    setRoom,
    connectToRoom,
  };
};
