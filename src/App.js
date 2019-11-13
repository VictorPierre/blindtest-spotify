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
      songs:[],
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
            <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
          </div>
          <p>{this.state.tracks.length} chansons disponibles</p>
          <p>Première chanson: {this.state.tracks[0].track.name}</p>
          <div className="App-buttons">
          </div>
        </div>
      );
    }
  }
}

export default App;
