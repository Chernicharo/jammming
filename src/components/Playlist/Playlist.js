import React from 'react';
import MusicList from '../MusicList/MusicList';

import './Playlist.css';

class Playlist extends React.Component {
	constructor(props){
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	handleNameChange(event){
		this.props.onNameChange(event.target.value);
	}
	render() {
		return(
			<div className="Playlist">
  				<input onChange={this.handleNameChange} placeholder="New Playlist"/>
  				<MusicList musics={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
  				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;