import React, { Component } from "react";
import SelectBox from "./SelectBox";

export default class App extends Component {
  render() {
    return (
      <div>
        <SelectBox
          items={[
            { value: "Inida", id: 1 },
            { value: "US", id: 2 },
            { value: "Germany", id: 3 },
            { value: "Russia", id: 4 },
            { value: "China", id: 5 },
            { value: "Sri Lanka", id: 6 }
          ]}
        />
      </div>
    );
  }
}
