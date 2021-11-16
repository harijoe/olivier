import useVoice from 'hooks/useVoice';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const App = () => {
  const { start, listening, stop, partialResults, results } = useVoice();

  return (
    <>
      <Text>{partialResults}</Text>
      {listening ? (
        <Button
          title="Stop"
          onPress={async () => {
            stop();
          }}
        />
      ) : (
        <Button
          title="Start"
          onPress={async () => {
            start();
          }}
        />
      )}
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
