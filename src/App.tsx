import useVoice from 'hooks/useVoice';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const App = () => {
  const { start, listening, stop, cancel, partialResults, results } =
    useVoice();

  return (
    <>
      <Text>{partialResults ? partialResults[0] : ''}</Text>

      <Button
        title="Cancel"
        onPress={async () => {
          cancel();
        }}
      />

      <Button
        title="Start"
        onPress={async () => {
          start();
        }}
      />
      {listening && <Text>Listening</Text>}
    </>
  );
};

const WrappedApp = () => (
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
);

export default WrappedApp;
