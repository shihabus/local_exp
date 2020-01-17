// import React from 'react'
// import { Provider } from 'react-redux'
// import { initStore } from './reducers/store'
// import { Routes } from './components'

// const store = initStore()

// function App() {
//   return (
//     <Provider store={store}>
//       <Routes/>
//     </Provider>
//   )
// }

// export default App

import React from "react";
import Notification from "react-web-notification";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

//allow react dev tools work
window.React = React;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.state = {
      ignore: true,
      title: ""
    };
  }

  createNotification = type => () => {
    console.log("type", type);
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
      default:
        break;
    }
  };

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      ignore: true
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag) {
    console.log(e, "Notification clicked tag:" + tag);
  }

  handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  handleNotificationOnShow(e, tag) {
    this.playSound();
    console.log(e, "Notification shown tag:" + tag);
  }

  playSound(filename) {
    document.getElementById("sound").play();
  }

  handleButtonClick() {
    if (this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = "Task Engine Notification";
    const body = "Bouce what to say you HI!";
    const tag = now;
    const icon =
      "https://lh3.googleusercontent.com/X4Y28UA2PwvzypGkLlB1D3lpTHzujg7glUs8lYDwtKa0psv3yGbpY0ONk6qlIn7EYrcA";
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr",
      sound: "./sound.mp3" // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    };
    this.setState({
      title: title,
      options: options
    });
  }

  renderContent = () => (
    <div>
      <h1>Cool</h1>
    </div>
  );

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeIn"],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
      content: this.renderContent()
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick.bind(this)}>Notif1</button>
        <button onClick={this.createNotification("info")}>Info</button>
        <Notification
          ignore={this.state.ignore && this.state.title !== ""}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        <audio id="sound" preload="auto">
          <source src="./sound.mp3" type="audio/mpeg" />
          <source src="./sound.ogg" type="audio/ogg" />
          <embed
            hidden="true"
            autostart="false"
            loop="false"
            src="./sound.mp3"
          />
        </audio>
        <NotificationContainer />
        <div className="app-content">
          <ReactNotification ref={this.notificationDOMRef} />
          <button onClick={this.addNotification} className="btn btn-primary">
            Add Awesome Notification
          </button>
        </div>
      </div>
    );
  }
}
