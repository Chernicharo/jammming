import React from 'react';

import './Music.css';

class Music extends React.Component {
	constructor(props){
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	addTrack(){
		this.props.onAdd(this.props.music);
	}
	removeTrack(){
		this.props.onRemove(this.props.music);
	}
	/*renderAction(isRemoval){
		 if (isRemoval) {
		 	return <a>-</a>;
		 }else {
		 	return <a onClick={this.addTrack} >+</a>;
		 }
	}*/
	render(){
		return(
			<div className="Track">
  				<div className="Track-information">
    				<h3>{this.props.music.name}</h3>
   					 <p>{this.props.music.artist} | {this.props.music.album}</p>
  				</div>
  				<a className="Track-action">{!this.props.isRemoval ? 
  					<div onClick={this.addTrack}>+</div> : 
  					<div onClick={this.removeTrack}>-</div>}
  				</a>
			</div>
		);
	}
}

export default Music;