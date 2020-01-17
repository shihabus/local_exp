import React from "react";
import "./grid.css";

export default function Gird() {
  return (
    <div className="container">
      <div className="sidebar">
        <p>Sidebar</p>
        <div className='sidebar_btn_container'>
          <div className=".sidebar_btn">btn1</div>
          <div className=".sidebar_btn">btn1</div>
          <div className=".sidebar_btn">btn1</div>
          <div className=".sidebar_btn">btn1</div>
        </div>
      </div>
      <div className="header">Header</div>
      <div className="content">Content</div>
    </div>
  );
}
