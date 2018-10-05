import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "./Player";
import { Image, Icon } from "semantic-ui-react";
import styled from "styled-components";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songIndex: Number(String(this.props.location.pathname).slice(7))
    };
    this.changeTrack = this.changeTrack.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        songIndex: Number(String(this.props.location.pathname).slice(7))
      });
    }
  }

  changeTrack(dir) {
    if (dir === 1) {
      this.props.history.push("/songs/" + (this.state.songIndex + 1));
    } else {
      this.props.history.push("/songs/" + (this.state.songIndex - 1));
    }
  }

  render() {
    console.log("Detail rendered");
    const song = this.props.results[this.state.songIndex];
    const socialMsg = `Check out the song "${song.trackName}" from "${
      song.artistName
    }" on iTunes: `;
    return (
      <>
        <DetailsBox>
          <label>
            Artist
            <h2>{song.artistName}</h2>
          </label>
          <label>
            Track Name
            <h2>{song.trackName}</h2>
          </label>
          <label htmlFor="">
            Album
            <h3>{song.collectionName}</h3>
          </label>
          <label>
            Genre
            <h3>{song.primaryGenreName}</h3>
          </label>
          <label>
            Release Date
            <h3>
              {new Date(Date.parse(song.releaseDate)).toLocaleDateString()}
            </h3>
          </label>
          <label>
            Price
            <h3>{song.trackPrice}$</h3>
          </label>
          <Image size="small" src={song.artworkUrl100} />
          <label>
            Share this song on:
            <SocialBox>
              <FacebookShareButton quote={socialMsg} url={song.trackViewUrl}>
                <Icon link size="big" name="facebook" />
              </FacebookShareButton>
              <TwitterShareButton title={socialMsg} url={song.trackViewUrl}>
                <Icon link size="big" name="twitter" />
              </TwitterShareButton>
              <WhatsappShareButton title={socialMsg} url={song.trackViewUrl}>
                <Icon link size="big" name="whatsapp" />
              </WhatsappShareButton>
            </SocialBox>
          </label>
        </DetailsBox>
        <Player
          url={song.previewUrl}
          changeTrack={this.changeTrack}
          index={this.state.songIndex}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results
  };
};

export default connect(mapStateToProps)(DetailPage);

const DetailsBox = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SocialBox = styled.div`
  display: flex;
  flex-direction: row;
`;
