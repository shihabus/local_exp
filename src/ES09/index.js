import React, { Component } from "react";
import axios from "axios";
import { async } from "q";

export default class index extends Component {
  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log("Resp", resp.data);
    return resp.data;
  };

  render() {
    return <div>ES09</div>;
  }
}
