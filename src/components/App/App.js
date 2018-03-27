import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [ {
      name: 'name',
      artist: 'artist',
      album: 'album',
      id: 1} ],
      playlistName: '',
      playlistTracks: [ 
      {name: 'name2',
      artist: 'artist2',
      album: 'album2',
      id: 2},
      {name: 'name3',
      artist: 'artist3',
      album: 'album3',
      id: 3}]

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
    console.log(track.id); // remove after tests
  }

  removeTrack(track){ // nneed handle if the track that is remove not exist in the array
    this.setState( prevState =>({ playlistTracks: this.state.playlistTracks.filter( trackT => 
      trackT.id !== track.id 
    
     )}));   
  }

  updatePlaylistName(name){ // need handle if the playlist name come empty
    this.setState( {playlistName: name} );
    //console.log(this.state.playlistName); // delete after testing
  }

  savePlaylist(){ // need testing
    let trackURIs = [];
    this.state.playlistTracks.map( track => trackURIs.push(track.uri) );
    console.log(trackURIs); // delete after testing
  }

  search(search){
    Spotify.search(search);
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
