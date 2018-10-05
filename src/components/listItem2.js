import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { List } from "semantic-ui-react";

const millisToMinutesAndSeconds = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export default withRouter(props => {
  let {
    artistName,
    trackName,
    collectionName,
    releaseDate,
    artworkUrl60,
    trackTimeMillis,
    primaryGenreName,
    trackPrice
  } = props.data;
  return (
    <List.Item
      onClick={() => {
        props.history.push(`/songs/${props.index}`);
      }}
    >
      <ListItemBox>
        <Image src={artworkUrl60} alt="Cospaner" />
        <span> {artistName}</span>
        <span>{trackName}</span>
        <span> {collectionName}</span>

        <span> {new Date(Date.parse(releaseDate)).toLocaleDateString()}</span>
        <Duration> {millisToMinutesAndSeconds(trackTimeMillis)}</Duration>
        <span> {primaryGenreName}</span>
        <span> {trackPrice}$</span>
      </ListItemBox>
    </List.Item>
  );
});

const ListItemBox = styled.div`
  padding: 6px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  width: 100%;
  transition: all linear 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #3b75ff;
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr;
  }
`;

const Image = styled.img`
  display: inline;
  @media (max-width: 650px) {
    transform: scale(0.6);
  }
`;

const Duration = styled.span`
  @media (max-width: 550px) {
    display: none;
  }
`;
