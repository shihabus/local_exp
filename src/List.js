import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import './App.css'
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class App extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.fetchMoreData()
  }

  fetchMoreData = () => {
    console.log('Fetching...');
    axios
      .get("https://randomuser.me/api/?results=30")
      .then(results => {
        const nextUsers = results.data.results.map(user => ({
          email: user.email,
          name: Object.values(user.name).join(" "),
          photo: user.picture.medium,
          username: user.login.username,
          uuid: user.login.uuid
        }));

        this.setState({
          hasMore: this.state.items.length < 100,
          isLoading: false,
          items: [...this.state.items, ...nextUsers]
        });
      })
  };

  render() {
    console.log(this.state.hasMore)
    return (
      <div>
        <div>
          <h1>demo: react-infinite-scroll-component</h1>
          <hr />
        </div>
        <div className='Master' id='scrollableDiv' style={{height:'500px',overflow: "auto"}}>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
        </div>
      </div>
    );
  }
}