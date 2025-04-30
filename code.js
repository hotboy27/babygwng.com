function _(query){
    return document.querySelector(query);
}
function _all(query){
    return document.querySelectorAll(query);
}
//song list generator
let songList = [
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"BABYGWNG2.mp3",
        songname:"BABY GWNG 2",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"PLAYWITHME.mp3",
        songname:"PLAYWITHME",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"PG.mp3",
        songname:"PG",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"ONEOFONE.mp3",
        songname:"ONE OF ONE",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"NOTMYX.mp3",
        songname:"NOT MY X",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"NEWMATRESS.mp3",
        songname:"NEW MATRESS",
        artistname:"gWng x big bag",
    },
    {
        thumbnail:"babygwng2coverupscaled.jpg",
        audio:"NOTMYX.mp3",
        songname:"IG MODELZ",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"GWITARSWWNDS.mp3",
        songname:"GUITAR SWWNDS",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"SKEESH.mp3",
        songname:"SKEESH",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"URTOASTTOUS.mp3",
        songname:"UR TOAST TO US",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"BUDDHA.mp3",
        songname:"BUDDHA",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"FEDUP.mp3",
        songname:"FED UP",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"DISSSHWT.mp3",
        songname:"DISS SHWT",
        artistname:"gWng",
    },
    {
        thumbnail:"babygwngremasterupscale.jpg",
        audio:"BABYGWNG.mp3",
        songname:"BABY GWNG",
        artistname:"gWng",
    },
];

let currentSongIndex = 0;

let player = _(".player"),
    toggleSongList = _(".player .toggle-list");

let main = {
    audio:_(".player .main audio"),
    thumbnail:_(".player .main img"),
    seekbar:_(".player .main input"),
    songname:_(".player .main .details h2"),
    artistname:_(".player .main .details p"),
    prevControl:_(".player .main .controls .prev-control"),
    playPauseControl:_(".player .main .controls .play-pause-control"),
    nextControl:_(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function(){
    player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
    return `
        <div class="item" songIndex="${songIndex}">
            <div class="thumbnail">
                <img src="./files/${song.thumbnail}">
            </div>
            <div class="details">
                <h2>${song.songname}</h2>
                <p>${song.artistname}</p>
            </div>
        </div>
    `;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
    songListItems[i].addEventListener("click",function(){
        currentSongIndex = songListItems[i].getAttribute("songIndex");
        loadSong(currentSongIndex);
        player.classList.remove("activeSongList");
    })
}
function loadSong(songIndex){
    let song = songList[songIndex];
    main.thumbnail.setAttribute("src","./files/"+song.thumbnail);
    main.songname.innerText = song.songname;
    main.artistname.innerText = song.artistname;
    main.audio.setAttribute("src","./files/"+song.audio);
    main.seekbar.setAttribute("value",0);
    main.seekbar.setAttribute("min",0);
    main.seekbar.setAttribute("max",0);
    main.audio.addEventListener("canplay",function(){
        main.audio.play();
        if(!main.audio.paused){
            main.playPauseControl.classList.remove("paused");
        }
        main.seekbar.setAttribute("max",parseInt(main.audio.duration));
        main.audio.onended = function(){
            main.nextControl.click();
        }
    })
}
setInterval(function(){
    main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
    currentSongIndex--;
    if(currentSongIndex < 0){
        currentSongIndex = songList.length + currentSongIndex
    }
    loadSong(currentSongIndex);
});

main.nextControl.addEventListener("click",function(){
    currentSongIndex = (currentSongIndex+1) % songList.length;
    loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
    if(main.audio.paused){
        main.playPauseControl.classList.remove("paused");
        main.audio.play();
    } else {
        main.playPauseControl.classList.add("paused");
        main.audio.pause();
    }
});
main.seekbar.addEventListener("change",function(){
    main.audio.currentTime = main.seekbar.value;
})
loadSong(currentSongIndex);
//some of the code is sourced from https://youtu.be/14SmNeUqd0Q?si=ow-oCRQXCGL7iC1n
