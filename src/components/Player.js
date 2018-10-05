import React, { Component } from "react";
import styled from "styled-components";
import { Icon, Input } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { withRouter } from "react-router-dom";

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      volume: 0.1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0
    };
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onMute = this.onMute.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.ref = this.ref.bind(this);
  }

  handlePlayPause() {
    this.setState({ playing: !this.state.playing });
  }
  handleVolume(e) {
    this.setState({ volume: e.target.value });
  }
  onSeekMouseDown(e) {
    this.setState({ seeking: true });
  }
  onSeekChange(e) {
    this.setState({ played: parseFloat(e.target.value) });
  }
  onSeekMouseUp(e) {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }
  onMute() {
    this.setState(prevState => {
      if (prevState.volume === 0) {
        return { volume: 1 };
      } else {
        return { volume: 0 };
      }
    });
  }
  onEnded() {
    this.setState({ playing: false, played: 0 });
  }

  ref = player => {
    this.player = player;
  };

  render() {
    console.log("Player rendered");
    return (
      <PlayerBox>
        <ProgressBox>
          <p>0:00</p>
          <Progress
            type="range"
            min={0}
            max={1}
            step="any"
            value={this.state.played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
          <p>0:30</p>
        </ProgressBox>
        <Controls>
          <ControlBtn
            onClick={() => this.props.changeTrack(-1)}
            size="huge"
            name="backward"
            link
          />
          <ControlBtn
            onClick={this.handlePlayPause}
            name={this.state.playing ? "pause" : "play"}
            size="huge"
            link
          />
          <ControlBtn
            onClick={() => this.props.changeTrack(1)}
            size="huge"
            name="forward"
            link
          />
        </Controls>
        <Volume>
          <VolumeIcon
            onClick={this.onMute}
            size="big"
            link
            name={
              this.state.volume > 0.6
                ? "volume up"
                : this.state.volume > 0
                  ? "volume down"
                  : "volume off"
            }
          />
          <Input
            onChange={this.handleVolume}
            value={this.state.volume}
            min={0}
            max={1}
            step={0.05}
            type="range"
          />
        </Volume>

        <MusicPlayerCore
          innerRef={this.ref}
          playing={this.state.playing}
          volume={this.state.volume}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          onEnded={this.onEnded}
          url={this.props.url}
        />
      </PlayerBox>
    );
  }
}

export default withRouter(MusicPlayer);

const PlayerBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 4fr;
  width: 100vw;
  justify-content: center;
  align-content: center;
  justify-items: center;
  padding: 40px;
  border-top: 1px solid black;
  position: fixed;
  bottom: 0;
  background-color: white;

  @media (max-width: 725px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

const ControlBtn = styled(Icon)`
  cursor: pointer;
`;

const Volume = styled.div`
  @media (max-width: 725px) {
    display: none;
  }
`;

const Progress = styled(Input)`
  &&& {
    border: none;
    width: 80%;
    padding: 10px;
    margin-top: -34px;
  }
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const MusicPlayerCore = styled(ReactPlayer)`
  display: none;
`;

const VolumeIcon = styled(Icon)`
  &&& {
    margin-top: -10px;
  }
`;
