import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import { fetchResults } from "../actions";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      loading: false
    };
    this.onInput = this.onInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  onInput(e) {
    this.setState({ query: e.target.value });
  }
  submitForm(e) {
    e.preventDefault();
    this.props.fetchResults(this.state.query);
    this.setState({ query: "", loading: true });
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <Input
            loading={this.state.loading ? true : false}
            value={this.state.query}
            placeholder="Search..."
            onChange={this.onInput}
            type="text"
            size="massive"
          />
        </form>
      </div>
    );
  }
}
const mapStateToPros = state => {
  return {
    results: state.results
  };
};

export default connect(
  mapStateToPros,
  { fetchResults }
)(SearchBar);
