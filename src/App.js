/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDCaizcAeHjNnk55hbVqXDwkt5k3-W89BZ7nc4Dmk4fegCw7V2NGDen7XL8IqrxsWUkNer6oM_FZkU94iLtwXaoFW6Y_hH9v7HGUB7kLKcK1Duz6j267A-HrrwtT0dQD-xr7x7NHu1dO5NDmCOTOoxxZcoHUY1rl3hpequ5-I5C5A';

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
      selected_tracks: [],
      currentSongId: 0,
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
        this.setState({ songsLoaded: true, tracks: data.items, selected_tracks: shuffleArray(data.items).slice(0,3), currentSongId: getRandomNumber(3)});
        this.initGame(3);
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      })
  }

  checkAnswer(id){
    if (id==this.state.currentSongId){
      swal('Bravo', 'Sous-titre', 'success').then(this.initGame(3));
    } else {
      swal('Raté', 'Sous-titre', 'error');
    }
  }

  initGame(n){
    this.setState({selected_tracks: shuffleArray(this.state.tracks), currentSongId: getRandomNumber(n)});
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
            <AlbumCover track={this.state.selected_tracks[this.state.currentSongId].track}/>
          </div>

          <p>{this.state.tracks.length} chansons disponibles</p>
          <p>Chanson selectionnée: {this.state.selected_tracks[this.state.currentSongId].track.name}</p>
          <Sound url={this.state.selected_tracks[this.state.currentSongId].track.preview_url} playStatus={Sound.status.PLAYING}/>

          <div className="App-buttons">
            <Button onClick={() => this.checkAnswer(0)}>{this.state.selected_tracks[0].track.name}</Button>
            <Button onClick={() => this.checkAnswer(1)}>{this.state.selected_tracks[1].track.name}</Button>
            <Button onClick={() => this.checkAnswer(2)}>{this.state.selected_tracks[2].track.name}</Button>
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
