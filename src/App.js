// import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main.js";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer.js";

function App() {
  return (
    <div className="App">
      {/* <MediaPlayer></MediaPlayer> */}
      <Header />
      <Main />
    </div>
  );
}

export default App;
