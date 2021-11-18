import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import { useInterval } from 'ahooks';
import { useEffect, useState } from 'react';

const useVoice = () => {
  //   const [pitch, setPitch] = useState();
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [results, setResults] = useState<string[]>();
  const [partialResults, setPartialResults] = useState<string[]>();

  useInterval(() => {
    Voice.isRecognizing().then(e => setListening(!!e));
  }, 100);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechPartialResults: ', e);

    setPartialResults(e.value);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);

    if (e.error && e.error.message === 'Speech recognition already started!') {
      console.log('stopping');
      Voice.stop();
    }

    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechResults: ', e);

    setResults(e.value);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const start = () => {
    console.log('start');

    setError('');
    // setListening(true);
    setResults([]);
    setPartialResults([]);

    Voice.start('fr-FR');
  };

  const stop = () => {
    console.log('stopping', Voice);
    Voice.stop();
  };

  const cancel = () => {
    console.log('cancel', Voice);
    Voice.cancel();
  };

  return {
    start,
    stop,
    cancel,
    listening,
    partialResults,
    results,
  };
};

export default useVoice;
