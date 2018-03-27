import React from 'react';
import MusicList from '../MusicList/MusicList';

import './SearchResults.css';

class SearchResults extends React.Component {
	render(){
		return(
			<div className="SearchResults">
  				<h2>Results</h2>
  				<MusicList musics={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd} />
			</div>
		);
	}
}

export default SearchResults;