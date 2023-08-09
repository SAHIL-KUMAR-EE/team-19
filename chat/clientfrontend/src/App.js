import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import white_bg from "./back_w.jpg";

const socket = io.connect("http://192.168.1.46:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="App" style={{backgroundImage: isClicked ? `url(${white_bg})` : ''}}>
      {!showChat ? (
        <div className="joinChatContainer">
          <div id="toggle" onClick={handleClick}
      style={{
        backgroundImage: isClicked ? `url(${white_bg})` : '',
        boxShadow: isClicked ? 'inset 0 2px 60px rgba(0,0,0,0.1),inset 0 2px 8px rgba(0,0,0,0.1),inset 0 -4px 4px rgba(0,0,0,0.05)' : '',
      }}><i class="indicator" onClick={handleClick}
      style={{
        left: isClicked ? '40px' : '',
        background: isClicked ? 'linear-gradient(to bottom, #eaeaea, #f9f9f9)' : '',
        boxShadow: isClicked ? 'inset 0 8px 20px rgba(0,0,0,0.1),inset 0 4px 4px rgba(255,255,255,1),inset 0 -4px 4px rgba(255,255,255,1)' : '',
      }}></i></div>
          <h3 style={{color: isClicked ? '#2b2b2b':''}}>
          <img id="logo" src={'ghost_logo.svg'} alt='Logo' ></img>Ghost Talk</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div id="login_frontend">
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
