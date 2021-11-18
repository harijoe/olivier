import useVoice from 'hooks/useVoice';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const App = () => {
  const { start, listening, stop, partialResults, results } = useVoice();

  return (
    <>
      <Text>{partialResults ? partialResults[0] : ''}</Text>
      {listening && <Text>Listening</Text>}

      <Button
        title="Stop"
        onPress={async () => {
          stop();
        }}
      />

      <Button
        title="Start"
        onPress={async () => {
          start();
        }}
      />
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
