import React from 'react';
import Music from '../Music/Music';

import './MusicList.css';

/*let harcodeMusic = {

}*/

class MusicList extends React.Component {
	render(){
		return(
			<div className="TrackList">
    			{
    				
  					this.props.musics.map( music =>{
  						return <Music key={music.id} music={music} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />
  					})
  				}
			</div>
		);
	}
}

export default MusicList;