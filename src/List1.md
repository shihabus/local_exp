import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

// import './App.css'

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: []
    };
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    console.log('Io')
    this.setState({ isLoading: true });
    axios
      .get("https://randomuser.me/api/?results=30")
      .then(results => {
          console.log('results',results);
        const nextUsers = results.data.results.map(user => ({
          email: user.email,
          name: Object.values(user.name).join(" "),
          photo: user.picture.medium,
          username: user.login.username,
          uuid: user.login.uuid
        }));

        this.setState({
          hasMore: this.state.users.length < 100,
          isLoading: false,
          users: [...this.state.users, ...nextUsers]
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          isLoading: false
        });
      });
  };

  render() {
    console.log(this.state.users.length);
    return (
      <div id="scrollableDiv">
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.users.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {this.state.users.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
