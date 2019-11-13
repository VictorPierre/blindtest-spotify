/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDClZvrTNZWHRyn7K6LfWp_JVfyQ5qJch_t7yj1VD4AgPBD2nyNygi6eYI0oWL73TO5__8q_mxtxYomldfC6s-BQGrwcW5WA9FJcjCYEMZZ6VCyNXyEyulqcTWbERRdBV70QH4aUTb65LUI4eALIMrAUs2sSzJxKHLx5ESyviB_1g';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}



class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      songsLoaded: false,
      tracks:[],
    };
  }

  componentDidMount() {
    this.setState({ text: "Le composent est bien monté" })
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ songsLoaded: true, tracks: data.items})
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      })
  }

  render() {
    if (this.state.songsLoaded==false) {
      return (
        <img src={loading} className="App-logo" alt="logo"/>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>

          <div className="App-images">
            <AlbumCover track={this.state.tracks[0].track}/>
          </div>

          <p>{this.state.tracks.length} chansons disponibles</p>
          <p>Première chanson: {this.state.tracks[0].track.name}</p>
          <Sound url={this.state.tracks[0].track.preview_url} playStatus={Sound.status.PLAYING}/>

          <div className="App-buttons">
            <Button>{this.state.tracks[0].track.name}</Button>
            <Button>{this.state.tracks[1].track.name}</Button>
            <Button>{this.state.tracks[2].track.name}</Button>
          </div>
        </div>
      );
    }
  }
}

class AlbumCover extends Component {
  render() {
    const src = this.props.track.album.images[0].url;
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }
}

export default App;
