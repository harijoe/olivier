import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useRooms from 'hooks/useRooms';

const App = () => {
  const rooms = useRooms();

  console.log('rooms', rooms);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Your Text</Text>
    </SafeAreaView>
  );
};

export default App;
