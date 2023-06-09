import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "environment",
};

const Camera = (props: { sendCapture: (imageSrc: string) => void }) => {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      props.sendCapture(imageSrc);
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <div>
        <Webcam
          audio={false}
          width={540}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <button onClick={capture}>キャプチャ</button>

      {url && (
        <>
          <div>
            <button onClick={() => setUrl(null)}>削除</button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};

export default Camera;
