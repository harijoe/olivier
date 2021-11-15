import { AppContext } from 'context';
import useRooms from 'hooks/useRooms';
import React, { useContext } from 'react';
import { Button, SafeAreaView } from 'react-native';

const RoomPicker = () => {
  const rooms = useRooms();
  const { session, game, patchGame, auth, connectToRoom, room, user } =
    useContext(AppContext);

  return (
    <>
      {rooms &&
        rooms.map(r => (
          <Button
            key={r._id}
            title={r._id}
            onPress={() => connectToRoom(r._id)}
          />
        ))}
    </>
  );
};

export default RoomPicker;
