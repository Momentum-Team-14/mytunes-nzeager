// console.log('connected!');

const resultsDiv = document.querySelector('#results');
// console.log(resultsDiv);

let searchUrl = 'https://proxy-itunes-api.glitch.me/search?term=';

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchBox = document.querySelector('#search-box');
    let urlEnd = searchBox.value.replaceAll(' ', '+');
    console.log(urlEnd);
    searchUrl = `${searchUrl}${urlEnd}&limit=50`;
    getSearchResults(searchUrl);
})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'text/javascript; charset=utf-8'}
        })
        // response is whatever the function returns
        .then(response => response.json())
        // data is whatever the above code returns, in this case response.json()
        .then(data => {
            let songs = data.results;
            console.log(songs);
            showTracks(songs);
        })
}

function showTracks (trackArray) {
    for(let track of trackArray) {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song");
        
        //image
        let imageTag = document.createElement("img");
        imageTag.classList.add("songImg");
        imageTag.src = track.artworkUrl100;
        songDiv.appendChild(imageTag);

        //track
        let trackDiv = document.createElement("div");
        trackDiv.classList.add("trackName");
        trackDiv.innerText = track.trackName;
        songDiv.appendChild(trackDiv);

        //artist
        let artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");
        artistDiv.innerText = track.artistName;
        songDiv.appendChild(artistDiv);

        //audio
        let audioTag = document.createElement("audio");
        audioTag.classList.add("audio");
        audioTag.src = track.previewUrl;
        audioTag.controls = true;
        songDiv.appendChild(audioTag);

        // append songDiv to results
        resultsDiv.appendChild(songDiv);
    }
}
