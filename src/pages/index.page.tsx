import React, { useEffect } from 'react';

import Button from '@/components/buttons/Button';

function HomePage() {
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder>();
  const [audioSrc, setAudioSrc] = React.useState<string>();
  const [startLoading, setStartLoading] = React.useState(false);

  const handleSuccess = function (stream: MediaStream) {
    const options = { mimeType: 'audio/webm' };
    const recorder = new MediaRecorder(stream, options);
    setMediaRecorder(recorder);

    recorder?.start();
    setStartLoading(false);
  };

  const handleStart = () => {
    setStartLoading(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);
  };

  const handleStop = () => {
    try {
      mediaRecorder?.stop();

      /* eslint-disable-next-line no-empty */
    } catch (error) {}
  };

  useEffect(() => {
    const saveData = async function (e: { data: Blob }) {
      if (e.data.size > 0) {
        setAudioSrc(URL.createObjectURL(e.data));
      }
    };

    mediaRecorder?.addEventListener('dataavailable', saveData);

    return () => {
      mediaRecorder?.removeEventListener('dataavailable', saveData);
    };
  }, [mediaRecorder]);

  return (
    <main className='bg-blue-1000 h-screen'>
      <div className='flex flex-col w-full justify-center items-center h-full gap-y-4'>
        <audio controls src={audioSrc}></audio>
        <div className='flex justify-center gap-x-4'>
          <Button type='button' onClick={handleStart} isLoading={startLoading}>
            Start
          </Button>
          <Button type='button' onClick={handleStop} itemType='audio/wav'>
            Stop
          </Button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
