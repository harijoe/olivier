import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

const useVoice = () => {
  //   const [pitch, setPitch] = useState();
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [results, setResults] = useState<string[]>();
  const [partialResults, setPartialResults] = useState<string[]>();

  const onSpeechStart = (e: any) => {
    // console.log('onSpeechStart: ', e);
    setListening(true);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechEnd = (e: any) => {
    // console.log('onSpeechEnd: ', e);
    setListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    // console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    setListening(false);
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
    setError('');
    setListening(true);
    setResults([]);
    setPartialResults([]);

    Voice.start('fr-FR');
  };

  const stop = () => {
    Voice.stop();
  };
  const cancel = () => {
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