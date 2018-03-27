const clientID = "891e919e98a94ce7a642decebb63843c";
const redirectURI = "http://localhost:3000/";
let accessToken;

const Spotify = {
	getAccessToken(){			
			if (accessToken) {
				return accessToken;
			}else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){
				accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
				let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
				window.setTimeout(() => accessToken = '', expiresIn * 1000);
				window.history.pushState('Access Token', null, '/');

			}else if(!accessToken && !window.location.href.match(/access_token=([^&]*)/)){
				window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
			}
		},
	search(term){
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
		{
			headers: {Authorization: `Bearer ${accessToken}`}
		} ).then( response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Request failed!');
		}, networkError => console.log(networkError.message)
		).then(jsonResponse => {
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		});
	},
	savePlaylist(playlistName, trackUris) {
		if (!playlistName || !trackUris) {
			return;
		}
		let sPAccessToken = accessToken;
		let auth = {
			Authorization: `Bearer ${sPAccessToken}`
		};
		let userId;
   		return fetch('https://api.spotify.com/v1/me', {headers: auth})
   		.then(response => response.json())
   		.then(jsonResponse => {
	        userId = jsonResponse.id;
	        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
	        	headers: auth,
	        	method: 'POST',
	        	body: JSON.stringify({name: playlistName})})
	        .then(response => response.json())
	        .then(jsonResponse => {
	        	const playlistId = jsonResponse.id;
	        	return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
	            	headers: auth,
	            	method: 'POST',
	            	body: JSON.stringify({uris: trackUris})
	        	});
	        });
	    });
	}
}



export default Spotify;    