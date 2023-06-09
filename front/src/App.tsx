import { useState } from "react";
import axios from "axios";
import Camera from "./Camera";
import AudioPlayer from "./AudioPlayer";

const dataURLtoBlob = (dataurl: string) => {
  let arr = dataurl.split(",");
  let mime = "image";
  let test = arr[0].match(/:(.*?);/);
  if (test !== null) {
    mime = test[1];
  }
  let bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const App = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const capture = (imageSrc: string) => {
    if (imageSrc) {
      let params = new FormData();
      params.append("image", dataURLtoBlob(imageSrc), "testImage.png");
      let post_api = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      });
      post_api
        .post<File>("https://<バックエンドの起動URL>:5010/api/img/ul", params, {
          responseType: "blob",
        })
        .then(
          (response) => response.status === 200 && setAudioFile(response.data)
        )
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <header>
        <h1>カメラアプリ</h1>
      </header>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && <Camera sendCapture={capture} />}
      {audioFile && <AudioPlayer mp3File={audioFile} />}
    </>
  );
};

export default App;
