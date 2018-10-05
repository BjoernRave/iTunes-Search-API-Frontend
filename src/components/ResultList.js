import React, { Component } from "react";
import ListItem from "./listItem2";
import styled from "styled-components";
import { connect } from "react-redux";
import { List, Icon } from "semantic-ui-react";

class ResultList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.results !== null) {
        let result = this.props.results.map((item, index) => {
          return <ListItem index={index} key={item.trackId} data={item} />;
        });
        this.setState({ result });
      }
    }
  }

  handleSorting(attr) {
    let sorted = this.state.result.sort((a, b) => {
      if (this.state[attr]) {
        if (a.props.data[attr] < b.props.data[attr]) return -1;
        if (a.props.data[attr] > b.props.data[attr]) return 1;
        return 0;
      } else {
        if (b.props.data[attr] < a.props.data[attr]) return -1;
        if (b.props.data[attr] > a.props.data[attr]) return 1;
        return 0;
      }
    });
    this.setState({ result: sorted, [attr]: !this.state[attr] });
  }

  render() {
    if (this.props.results !== null) {
      return (
        <div>
          <ListDescription>
            <span>Cover</span>
            <span>Artist</span>
            <span>Song Title</span>
            <span>Album</span>
            <span>Release Date</span>
            <Duration onClick={() => this.handleSorting("trackTimeMillis")}>
              Duration{" "}
              <Icon
                flipped={
                  this.state.trackTimeMillis ? "vertically" : "horizontally"
                }
                name="triangle up"
              />
            </Duration>
            <FilterSpan onClick={() => this.handleSorting("primaryGenreName")}>
              Genre{" "}
              <Icon
                flipped={
                  this.state.primaryGenreName ? "vertically" : "horizontally"
                }
                name="triangle up"
              />
            </FilterSpan>
            <FilterSpan onClick={() => this.handleSorting("trackPrice")}>
              Price{" "}
              <Icon
                flipped={this.state.trackPrice ? "vertically" : "horizontally"}
                name="triangle up"
              />
            </FilterSpan>
          </ListDescription>
          <List>{this.state.result}</List>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    results: state.results
  };
};

export default connect(mapStateToProps)(ResultList);

const ListDescription = styled.div`
  padding: 6px;
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  width: 100%;
  border-bottom: 1px solid black;

  @media (max-width: 550px) {
    grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr;
  }
`;

const FilterSpan = styled.span`
  cursor: pointer;
`;

const Duration = styled(FilterSpan)`
  @media (max-width: 550px) {
    display: none;
  }
`;
