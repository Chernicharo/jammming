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
			fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{
				headers: {Authorization: `Bearer ${accessToken}`}
			} ).then( response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Request failed!');
			}, networkError => console.log(networkError.message)
			).then(jsonResponse => {
			 return jsonResponse.tracks.items; 
				/*return jsonResponse.tracks.items.map(track => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri
				}));*/
			});
		}
}

export default Spotify;    