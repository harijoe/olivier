import { AppContext } from 'context';
import useRooms from 'hooks/useRooms';
import React, { useContext, useState } from 'react';
import { Button, SafeAreaView, TextInput } from 'react-native';
import feathers from 'services/feathers';

const RoomPicker = () => {
  const rooms = useRooms();
  const { session, game, patchGame, auth, connectToRoom, room, user } =
    useContext(AppContext);

  const [pseudo, setPseudo] = useState<string>();

  return (
    <>
      <TextInput
        style={{
          height: 40,
          width: 200,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setPseudo}
        value={pseudo}
      />
      <Button
        title="Valider"
        onPress={async () => {
          await feathers.service('users').patch(auth.user._id, { pseudo });
        }}
      />
    </>
  );
};

export default RoomPicker;
