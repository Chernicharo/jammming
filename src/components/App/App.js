import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let found = this.state.playlistTracks.some(function (el) {
      return el.id === track.id;
    });
    if (!found) {
      this.setState(prevState => ({
        playlistTracks: [...this.state.playlistTracks, track]
      }));

    }
  }

  removeTrack(track){ 
    this.setState( prevState =>({ playlistTracks: this.state.playlistTracks.filter( trackT => 
      trackT.id !== track.id 
    
     )}));   
  }

  updatePlaylistName(name){ 
    this.setState( {playlistName: name} );
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.map( track => trackURIs.push(track.uri) );
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(a =>{
        alert(`Playlist ${this.state.playlistName} saved` );
        this.setState({
          playlistName: 'New playlist',
          searchResults:[],
          playlistTracks:[]
        });    
      } 
      );
    
  }

  search(searchTerm){
    if (!searchTerm) {
      return
    }
    Spotify.getAccessToken();
    Spotify.search(searchTerm)
    .then(a => {
      this.setState({
        searchResults: a
      });
    });

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
            <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}  />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
