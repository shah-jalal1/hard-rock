const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySongs(data.data))
    // .catch(error => displayError(error));

    toggleSpinner();

    // async
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data)


}


document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key == 'Enter') {
        document.getElementById('search-button').click();
    }
});

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    // document.getElementById('song-lyrics') = "";
    // songs.forEach(song => console.log(song.title));

    songs.forEach(song => {
        // console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio> 
        </div>
        <div class="col-md-3 text-md-right text-center">
                 <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button> 
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}

const getLyric = async (artist, title) => {
    // console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayLyrics(data.lyrics));

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        console.log((error));
    }

}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    // const songs = document.getElementById('song-container');
    // if(show) {
    //     spinner.classList.remove('d-none');
    // }
    // else {
    //     spinner.classList.add('d-none')
    // }
    spinner.classList.toggle('d-none');
    // song-container.classList.toggle('d-none');
}