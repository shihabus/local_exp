import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: []
    };
  }

  componentDidMount() {
      this.loadUsers()
  }
  


  loadUsers=()=>{
    this.setState({ isLoading: true });
    axios
      .get("https://randomuser.me/api/?results=10")
      .then(results => {
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
    const { users } = this.state;
    const loader = <div className="loader">Loading ...</div>;
    console.log('State',this.state)
    return (
      <div>
          Hello
      </div>
    );
  }
}
