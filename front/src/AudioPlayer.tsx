import React, { useState } from "react";

const AudioPlayer = (props: { mp3File: File }) => {
  const mytrack: HTMLAudioElement = document.getElementById(
    "mytrack"
  ) as HTMLAudioElement;
  const [audioSrc, setAudioSrc] = useState(
    URL.createObjectURL(new Blob([props.mp3File], { type: "audio/mp3" }))
  );
  return (
    <div>
      <audio id="mytrack" controls>
        <source src={audioSrc} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
