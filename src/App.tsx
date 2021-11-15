import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import useRooms from 'hooks/useRooms';
import { AppContext, DeviceProvider, AppProvider } from 'context';
import RoomPicker from 'components/RoomPicker';
import PseudoPicker from 'components/PseudoPicker';
import AvatarPicker from 'components/AvatarPicker';
import RoundPlaying from 'components/RoundPlaying';
import { Device, GameState } from 'common/types';

const App = () => {
  const rooms = useRooms();
  const { session, game, patchGame, auth, connectToRoom, room, user } =
    useContext(AppContext);

  if (!room) {
    return <RoomPicker />;
  }

  if (!auth || !user) return <Text>Loading</Text>;

  if (!user.pseudo) return <PseudoPicker />;
  if (!user.avatar) return <AvatarPicker />;

  return (
    <>
      <Text>Current room : {room._id}</Text>
      <Text>
        Current user : {user.pseudo} {user.avatar}
      </Text>
      <Text>Current game : {game && game._id + ' - ' + game.state}</Text>
      {game?.state === GameState.ROUND_PLAYING && <RoundPlaying />}
    </>
  );
};

const WrappedApp = () => (
  <DeviceProvider device={Device.iphone}>
    <AppProvider>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <App />
      </SafeAreaView>
    </AppProvider>
  </DeviceProvider>
);

export default WrappedApp;
