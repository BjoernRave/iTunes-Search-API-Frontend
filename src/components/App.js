import React from "react";
import styled from "styled-components";
import ResultList from "./ResultList";
import { Header, Icon } from "semantic-ui-react";
import SearchBar from "./SearchBar";

export default () => {
  return (
    <SearchScreen>
      <Header size="huge" as="h1">
        Welcome to my View for the iTunes Search API
      </Header>
      <SubHeader size="huge" as="h3">
        Just enter the artist, song, album or genre you are looking for
      </SubHeader>
      <SearchBar />
      <ResultList />
      <Credit>
        Made with <Icon size="big" fitted name="react" /> from{" "}
        <a href="https://bjoern-rave.tech">Björn Rave</a>
      </Credit>
    </SearchScreen>
  );
};

const SearchScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3%;

  @media (max-width: 650px) {
    padding: 5px;
  }
`;

const SubHeader = styled.h3`
  margin-bottom: 50px;
  font-size: 2em;
`;

const Credit = styled.div`
  margin-top: 26.8%;
  /* margin-bottom: -30px; */
`;
