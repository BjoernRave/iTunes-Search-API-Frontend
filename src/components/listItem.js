import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: false
    };
    this.ToggleDetails = this.ToggleDetails.bind(this);
  }

  ToggleDetails(e) {
    this.setState({ details: !this.state.details });
  }

  render() {
    let {
      artistName,
      trackName,
      collectionName,
      releaseDate,
      artworkUrl60,
      trackTimeMillis,
      primaryGenreName,
      trackPrice
    } = this.props.data;

    if (this.state.details) {
      ExpandBtn = styled(ExpandBtn)`
        transform: rotate(180deg);
      `;
    } else {
      ExpandBtn = styled(ExpandBtn)`
        transform: rotate(0deg);
      `;
    }

    return (
      <ListItemBox>
        <General>
          <Link to={`/results/${this.props.index}`}>
            {" "}
            <Image src={artworkUrl60} alt="Cover" />{" "}
          </Link>
          <h4>
            {artistName} - {trackName}
          </h4>

          <ExpandBtn onClick={this.ToggleDetails}>
            <FontAwesomeIcon icon="angle-down" />
          </ExpandBtn>
        </General>
        <Details>
          {this.state.details ? (
            <CSSTransition timeout={300} classNames="expand">
              <div>
                {" "}
                <p>Album: {collectionName}</p>
                <p>Released: {releaseDate}</p>
                <p>Duration: {trackTimeMillis}</p>
                <p>Genre: {primaryGenreName}</p>
                <p>Price: {trackPrice}$</p>{" "}
              </div>
            </CSSTransition>
          ) : null}
        </Details>
      </ListItemBox>
    );
  }
}
const Image = styled.img`
  height: 80%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    filter: blur(2px);
  }
`;

const ListItemBox = styled.div`
  margin: 20px;
  width: 29%;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px black;
  background-color: rgb(233, 233, 233);
`;

const General = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Details = styled.div``;

let ExpandBtn = styled.button`
  background-color: unset;
  border: none;
  font-size: 3rem;
  transition: all linear 0.3s;
`;
