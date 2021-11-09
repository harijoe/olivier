import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import React, {Component, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {DebugInstructions} from 'react-native/Libraries/NewAppScreen';

const useVoice = () => {
  //   const [recognized, setRecognized] = useState();
  //   const [pitch, setPitch] = useState();
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  //   const [results, setResults] = useState();
  const [partialResults, setPartialResults] = useState<string[]>();

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setListening(true);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    setListening(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    // Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const start = () => {
    // setRecognized('');
    // setPitch('');
    setError('');
    setListening(true);(false);
    // setResults([]);
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
  };
};

export default useVoice;
