import { GameTransition } from 'common/types';
import { AppContext } from 'context';
import useRooms from 'hooks/useRooms';
import useVoice from 'hooks/useVoice';
import React, { useContext, useEffect } from 'react';
import { Button, Text } from 'react-native';

const RoundPlaying = () => {
  const rooms = useRooms();
  const { start, listening, stop, partialResults, results } = useVoice();

  const { session, game, patchGame, auth, connectToRoom, room, user } =
    useContext(AppContext);

  useEffect(() => {
    if (partialResults && partialResults[0]) {
      patchGame({
        type: GameTransition.GUESS,
        guess: partialResults[0],
        guess_id: user._id,
      });
    }
  }, [partialResults]);

  return (
    <>
      <Text>{partialResults}</Text>
      {listening ? (
        <Button
          title="Stop"
          onPress={async () => {
            await patchGame({
              type: GameTransition.MIC,
              recording: false,
            });
            stop();
          }}
        />
      ) : (
        <Button
          title="Start"
          onPress={async () => {
            await patchGame({
              type: GameTransition.MIC,
              recording: true,
            });
            start();
          }}
        />
      )}
    </>
  );
};

export default RoundPlaying;
