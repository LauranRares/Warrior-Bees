//////////////////////Objects///////////////////////
let player ={
    color: "",
    hexagons: [],
    hexNo: [],
    bees: []
}

let bot1 ={
    color: "",
    hexagons: [],
    hexNo: [],
    bees: []
}

let bot2 ={
    color: "",
    hexagons: [],
    hexNo: [],
    bees: []
}

let bot3 ={
    color: "",
    hexagons: [],
    hexNo: [],
    bees: []
}

let botColors = [];

//////////////////////////Intervals///////////////////////////////
const choosePlayerColor = document.getElementById('startChoose');

setInterval(()=>
{
    choosePlayerColor.removeAttribute('style', 'display:none');

},2000);

setInterval(()=>
{
    form.removeAttribute('style', 'display:none');

},3000);

///////////////////////////Music//////////////////////////////
const menuMusic=document.querySelector('.musicPlay');

menuMusic.addEventListener('click', ()=>
{
    location.reload();
});

function muteAudio (x,y,z) {
    x.muted=true;
    y.setAttribute('style','display:none');
    z.removeAttribute('style','dispaly:none');
};

function unmuteAudio (x,y,z) {
    x.muted=false;
    z.setAttribute('style','display:none');
    y.removeAttribute('style','dispaly:none');
};

function muteRestart (x) {
    x.muted=true;
};

function unmuteOpen (x) {
    x.muted=false;
    x.currentTime=0;
}

function changePage (closeOff,open,openOn,openOff) {
    if(closeOff.hasAttribute('style', 'display:none'))
    {
        unmuteOpen(open);
        openOn.removeAttribute('style','display:none');
        openOff.setAttribute('style','display:none');
    }
    else
    {
        muteAudio(open,openOn,openOff);
    }
}

const startMusic=document.getElementById('startMusic');
const startMusicOn=document.getElementById('startMusicOn');
const startMusicOff=document.getElementById('startMusicOff');

startMusicOn.addEventListener('click', ()=>
{
    muteAudio(startMusic,startMusicOn,startMusicOff);
});

startMusicOff.addEventListener('click', ()=>
{
    unmuteAudio(startMusic,startMusicOn,startMusicOff);
});

const playMusic=document.getElementById('playMusic');
const playMusicOn=document.getElementById('playMusicOn');
const playMusicOff=document.getElementById('playMusicOff');

playMusicOn.addEventListener('click', ()=>
{
    muteAudio(playMusic,playMusicOn,playMusicOff);
});

playMusicOff.addEventListener('click', ()=>
{
    unmuteAudio(playMusic,playMusicOn,playMusicOff);
});

const winMusic=document.getElementById('winMusic');
const winMusicOn=document.getElementById('winMusicOn');
const winMusicOff=document.getElementById('winMusicOff');

winMusicOn.addEventListener('click', ()=>
{
    muteAudio(winMusic,winMusicOn,winMusicOff);
});

winMusicOff.addEventListener('click', ()=>
{
    unmuteAudio(winMusic,winMusicOn,winMusicOff);
});

const loseMusic=document.getElementById('loseMusic');
const loseMusicOn=document.getElementById('loseMusicOn');
const loseMusicOff=document.getElementById('loseMusicOff');

loseMusicOn.addEventListener('click', ()=>
{
    muteAudio(loseMusic,loseMusicOn,loseMusicOff);
});

loseMusicOff.addEventListener('click', ()=>
{
    unmuteAudio(loseMusic,loseMusicOn,loseMusicOff);
});

////////////////////////Random/////////////////////////

function randomNo (min,max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
}