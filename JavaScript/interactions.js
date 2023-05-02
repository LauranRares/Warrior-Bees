//////////////////Start button///////////////////////
const form=document.querySelector('.chooseColorForm');
const label = document.querySelector('.chooseColorForm').getElementsByTagName('label');
const startBtn=document.querySelector('.chooseColorBtn');
const chosenColor=document.getElementsByName('chosenColor');
const startPage=document.querySelector('.startPage');
const playPage=document.querySelector('.playPage');
const topSquares=document.querySelector('.playTop').getElementsByTagName('p');
const endTurnBtn=document.getElementById('endTurn');
const hexagons=document.getElementById('hexDiv').getElementsByTagName('polygon');
const hexNumbers=document.querySelector('.numbersBee').getElementsByTagName('p');
const theBees=document.getElementById('theBees').getElementsByTagName('img');
const message=document.getElementById('message');

Array.from(label).forEach( i=>
    {
        i.addEventListener('click', ()=>     
        {
            startBtn.removeAttribute('style','display:none');

            startBtn.addEventListener('mouseover', ()=>
            {
                message.removeAttribute('style','display:none');
            });

            startBtn.addEventListener('mouseout', ()=>
            {
                message.setAttribute('style','display:none');
            });
        });
   });

form.addEventListener('submit', e=>
{
    e.preventDefault();

    let count = 0;
    chosenColor.forEach( i=>
     {
       if(i.checked)
       {
           player.color=i.value;
       }
       else
       {
           botColors[count] = i.value;
           count++;
       }
    });

    startPage.setAttribute('style', 'display:none');
    playPage.removeAttribute('style', 'display:none');

    endTurnBtn.style.backgroundColor= `${player.color}`;   
    topSquares[0].style.backgroundColor= `${player.color}`;
    topSquares[0].style.border='6px solid black';
    for(let i=1; i<topSquares.length; i++)
    {
        topSquares[i].style.backgroundColor= `${botColors[i-1]}`;
    }

    bot1.color=botColors[0];
    bot2.color=botColors[1];
    bot3.color=botColors[2];
    
    distributeHexes();

    topSquares[0].style.marginLeft='100';
    topSquares[1].style.display='';
    topSquares[2].style.display='';
    topSquares[3].style.display='';

    muteRestart(startMusic);
    changePage(startMusicOff,playMusic,playMusicOn,playMusicOff);
});

////////////////////Other buttons////////////////////
const reset=document.getElementById('reset');
const concede=document.getElementById('concede');
const winPage=document.querySelector('.winPage');
const losePage=document.querySelector('.losePage');
const playAgainWin=document.getElementById('winBtn');
const playAgainLose=document.getElementById('loseBtn');

reset.addEventListener('click', ()=>     
{
    player.hexagons.length=0;
    player.hexNo.length=0;
    player.bees.length=0;
    bot1.hexagons.length=0;
    bot1.hexNo.length=0;
    bot1.bees.length=0;
    bot2.hexagons.length=0;
    bot2.hexNo.length=0;
    bot2.bees.length=0;
    bot3.hexagons.length=0;
    bot3.hexNo.length=0;
    bot3.bees.length=0;

    topSquares[0].style.marginLeft='100';
    topSquares[1].style.display='';
    topSquares[2].style.display='';
    topSquares[3].style.display='';

    Array.from(hexNumbers).forEach( i=>
        {
            i.innerText = '1';
        });
    
    distributeHexes();        
});

concede.addEventListener('click', ()=>     
{
    playPage.setAttribute('style','display:none');
    muteRestart(playMusic);
    losePage.removeAttribute('style','display:none');
    changePage(playMusicOff,loseMusic,loseMusicOn,loseMusicOff);

    setInterval(()=>
    {
        playAgainLose.removeAttribute('style', 'display:none');
    },5000);
    
});

playAgainWin.addEventListener('click', ()=>
{
    winPage.setAttribute('style','display:none');
    muteRestart(winMusic);
    startPage.removeAttribute('style','display:none');
    changePage(winMusicOff,startMusic,startMusicOn,startMusicOff);

    player.hexagons.length=0;
    player.hexNo.length=0;
    player.bees.length=0;
    bot1.hexagons.length=0;
    bot1.hexNo.length=0;
    bot1.bees.length=0;
    bot2.hexagons.length=0;
    bot2.hexNo.length=0;
    bot2.bees.length=0;
    bot3.hexagons.length=0;
    bot3.hexNo.length=0;
    bot3.bees.length=0;

    Array.from(hexNumbers).forEach( i=>
        {
            i.innerText = '1';
        });
});

playAgainLose.addEventListener('click', ()=>
{
    losePage.setAttribute('style','display:none');
    muteRestart(loseMusic);
    startPage.removeAttribute('style','display:none');
    changePage(loseMusicOff,startMusic,startMusicOn,startMusicOff);

    player.hexagons.length=0;
    player.hexNo.length=0;
    player.bees.length=0;
    bot1.hexagons.length=0;
    bot1.hexNo.length=0;
    bot1.bees.length=0;
    bot2.hexagons.length=0;
    bot2.hexNo.length=0;
    bot2.bees.length=0;
    bot3.hexagons.length=0;
    bot3.hexNo.length=0;
    bot3.bees.length=0;

    Array.from(hexNumbers).forEach( i=>
        {
            i.innerText = '1';
        });
});

/////////////////////////Functions/////////////////////////
function distributeHexes () {
    let i=0;
    let counter=[];
    while(i<hexagons.length)
    {
        let random = randomNo(0,19);
        if(counter[random]==null)
        {
            if(player.hexagons.length<5)
            {
                player.hexagons.push(hexagons[random]);
                player.hexNo.push(hexNumbers[random]);
                player.bees.push(theBees[random]);
                hexagons[random].setAttribute('style',`fill:${player.color}`);
                i++;
            }
            else if(bot1.hexagons.length<5)
            {
                bot1.hexagons.push(hexagons[random]);
                bot1.hexNo.push(hexNumbers[random]);
                bot1.bees.push(theBees[random]);
                hexagons[random].setAttribute('style',`fill:${bot1.color}`);
                i++;
            }
            else if(bot2.hexagons.length<5)
            {
                bot2.hexagons.push(hexagons[random]);
                bot2.hexNo.push(hexNumbers[random]);
                bot2.bees.push(theBees[random]);
                hexagons[random].setAttribute('style',`fill:${bot2.color}`);
                i++;
            }
            else
            {
                bot3.hexagons.push(hexagons[random]);
                bot3.hexNo.push(hexNumbers[random]);
                bot3.bees.push(theBees[random]);
                hexagons[random].setAttribute('style',`fill:${bot3.color}`);
                i++;
            }
        }
        counter[random] = 1;
    }

    distributeBees(player);
    distributeBees(bot1);
    distributeBees(bot2);
    distributeBees(bot3);
}