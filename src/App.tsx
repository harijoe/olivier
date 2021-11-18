import useVoice from 'hooks/useVoice';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const App = () => {
  const { start, listening, stop, partialResults, results } = useVoice();

  const [actionable, setActionable] = useState(true);

  return (
    <>
      <Text>{partialResults}</Text>
      {listening && <Text>Listening</Text>}

      <Button
        title="Stop"
        onPress={async () => {
          setActionable(false);
          stop();
          setTimeout(() => {
            setActionable(true);
          }, 2000);
        }}
      />

      <Button
        title="Start"
        onPress={async () => {
          setActionable(false);
          start();
          setTimeout(() => {
            setActionable(true);
          }, 2000);
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
