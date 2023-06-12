/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

const useMediaRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    if (audioChunks.length > 0) {
      setAudioReady(true);
    } else {
      setAudioReady(false);
    }
  }, [audioChunks]);

  const startRecording = () => {
    if (mediaStream) {
      setAudioChunks([]);
      const recorder = new MediaRecorder(mediaStream);
      recorder.addEventListener('dataavailable', handleDataAvailable);
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setAudioChunks((prevChunks: Blob[]) => [...prevChunks, event.data]);
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording: recording,
    audioChunks,
    audioReady,
    setMediaStream,
    isMediaStreamAvailable: mediaStream ? true : false,
  };
};

export default useMediaRecorder;
