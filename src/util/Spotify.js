import React from 'react';

const clientID = "891e919e98a94ce7a642decebb63843c";
const redirectURI = "http://localhost:3000/";
let accessToken;
class Spotify extends React.Component {
		getAccessToken() {
			let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			if (accessToken) {
				return accessToken;
			}else if(window.location.href.match(/access_token=([^&]*)/)[1] && expiresIn){
				accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
				window.setTimeout(() => accessToken = '', expiresIn * 1000);
				window.history.pushState('Access Token', null, '/');

			}else if(!accessToken && !window.location.href.match(/access_token=([^&]*)/)){
				window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
			}
		}v
		search(term){
			fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{
				headers: {Authorization: `Bearer ${accessToken}`}
			} ).then( response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Request failed!');
			}, networkError => console.log(networkError.message)
			).then(jsonResponse => console.log(jsonResponse)/*{
				jsonResponse.map(track => ({id: track.id ,

				})
			}*/);
		}
}

export default Spotify;    