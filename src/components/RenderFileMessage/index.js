import React, { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReactPlayer from "react-player";
import { RowFileMessage, FileActionButton, FileDurationText } from "./styles";

export default function RenderFileMessage({ file }) {
  const [played, setPlayed] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);

  function play() {
    if (!url) {
      setProgress(0);
      setUrl(file.url);
    }
    return setPlayed(true);
  }

  function pause() {
    return setPlayed(false);
  }

  function fishAudio() {
    setUrl(null);
    return setPlayed(false);
  }

  return (
    <RowFileMessage>
      {!played ? (
        <FileActionButton onClick={() => play()}>
          <PlayArrowIcon />
        </FileActionButton>
      ) : (
        <FileActionButton onClick={() => pause()}>
          <PauseIcon />
        </FileActionButton>
      )}
      <ReactPlayer
        url={file.url}
        playing={played}
        onEnded={() => fishAudio()}
        onDuration={(duration) => setDuration(duration)}
        onProgress={(state) => setProgress(state.played.toFixed(2) * 100)}
        width="0px"
        height="0px"
      />
      <LinearProgress
        variant="determinate"
        value={progress}
        color="secondary"
        style={{
          width: "70%",
        }}
      />
      <FileDurationText>{duration.toFixed(1)}seg</FileDurationText>
    </RowFileMessage>
  );
}
