const attackDice=document.getElementById('attackDice');
const defendDice=document.getElementById('defendDice');
const diceRoll=document.getElementById('diceRoll');
const resultAtk=document.getElementById('resultAtk');
const resultDef=document.getElementById('resultDef');
const succes=document.getElementById('succes');
const fail=document.getElementById('fail');

attackPlayer ();

playPage.addEventListener('mousemove', ()=>
{   
    let margin=185;

    if(player.bees.length==20)
    {
        playPage.setAttribute('style', 'display:none');
        muteRestart(playMusic);
        winPage.removeAttribute('style','dispaly:none');
        changePage(playMusicOff,winMusic,winMusicOn,winMusicOff);

        setInterval(()=>
        {
            playAgainWin.removeAttribute('style', 'display:none');

        },3000);
    }

    if(player.bees.length==0)
    {
        setTimeout( ()=>
        {
            playPage.setAttribute('style', 'display:none');
        muteRestart(playMusic);
        losePage.removeAttribute('style','dispaly:none');
        changePage(playMusicOff,loseMusic,loseMusicOn,loseMusicOff);
        },1000);

        setInterval(()=>
        {
            playAgainLose.removeAttribute('style', 'display:none');

        },5000);
    }

    if(bot1.bees.length==0)
    {
        topSquares[0].style.marginLeft=`${margin}`;
        topSquares[1].style.display='none';
        margin=280;     
    }

    if(bot2.bees.length==0)
    {
        topSquares[0].style.marginLeft=`${margin}`;
        topSquares[2].style.display='none';
        margin=280;
    }

    if(bot3.bees.length==0)
    {
        topSquares[0].style.marginLeft=`${margin}`;
        topSquares[3].style.display='none';
        margin=280;
    }
});

/////////////////////Functions//////////////////////
function distributeBees (who) {
    let countHex = who.hexagons.length;
    let countHexPerma = countHex;
    let rest=0;
    let sum=0;

    who.hexNo.forEach( i=>
    {
        sum+=Number(i.innerText);
    });

    if(sum>7*countHex-countHex)
    {
        countHex=7*countHex-sum;
    }

    while(countHex>0)
    {
    let randomBees= randomNo(1,countHex);
    let randomHex= randomNo(0,countHexPerma-1);

        if(Number(who.hexNo[randomHex].innerText) == 7)
        {
            randomBees=0;
        }
        else
        {
            who.hexNo[randomHex].innerText = Number(who.hexNo[randomHex].innerText) + randomBees;

            if(Number(who.hexNo[randomHex].innerText) > 7)
            {
                rest= Number(who.hexNo[randomHex].innerText) - 7;
                who.hexNo[randomHex].innerText = '7';
                countHex += rest;
            }

            countHex -= randomBees;
        }
    }
}

function attackPlayer () {

let beeImgArray= [];
let hexArray=[];
let selected=0;
let positionPlayer=0;

    Array.from(theBees).forEach( beeImg=>
    {
        beeImg.addEventListener('click', ()=>
        {
            let quickIndex= '';
            quickIndex=Array.from(theBees).indexOf(beeImg);

            if(player.bees.includes(beeImg) && hexNumbers[quickIndex].innerText !== '1')
            {
                beeImgArray.push(beeImg);
                beeImgArray[selected].style.transform='scale(1.4)';
                if(selected>=1 && beeImgArray[selected-1]!=beeImgArray[selected])
                {beeImgArray[selected-1].style.transform='';} 

                positionPlayer= player.bees.indexOf(beeImgArray[beeImgArray.length-1]);
        
                hexArray.push(player.hexagons[positionPlayer]);
                hexArray[selected].style.stroke= 'white';
                if(selected>=1 && hexArray[selected-1]!=hexArray[selected])
                {hexArray[selected-1].style.stroke='';} 
                selected++;

                Array.from(theBees).forEach( beeImgtoAttack=>
                {                        
                    beeImgtoAttack.addEventListener('click', ()=>
                    {
                        let mapCheck = [];
                        let positionMap=Array.from(theBees).indexOf(beeImgArray[beeImgArray.length-1]);
                        let positionMapAttacked=Array.from(theBees).indexOf(beeImgtoAttack);
                        mapCheck= locationMap(positionMap);
                          
                        if(!player.bees.includes(beeImgtoAttack) && mapCheck.includes(positionMapAttacked))
                        {
                            let owner= checkOwner(beeImgtoAttack);
                            let positionBot=owner.bees.indexOf(beeImgtoAttack);

                            battle(player, owner, positionPlayer, positionBot);

                            setTimeout(()=>
                            {
                                beeImgArray[beeImgArray.length-1].style.transform='';
                                hexArray[selected-1].style.stroke='';  
                            },1500);
                        } 
                    }); 
                        
                });
            }
        });            
    });
}

function locationMap (x) {

    switch(x)
    {
        case 0:
            return [1, 2, 3]; 
        case 1:
            return [0, 3, 4];
        case 2:
            return [0, 3, 5, 6];    
        case 3:
            return [0, 1, 2, 4, 6, 7];
        case 4:
            return [1, 3, 7, 8];    
        case 5:
            return [2, 6, 9];
        case 6:
            return [2, 3, 5, 7, 9];    
        case 7:
            return [3, 4, 6, 8, 10];
        case 8:
            return [4, 7, 10];    
        case 9:
            return [5, 6, 11, 12];
        case 10:
            return [7, 8, 13, 14];    
        case 11:
            return [9, 12, 15];
        case 12:
            return [9, 11, 13, 15, 16];    
        case 13:
            return [10, 12, 14, 16, 17];
        case 14:
            return [10, 13, 17];    
        case 15:
            return [11, 12, 16, 18];
        case 16:
            return [12, 13, 15, 17, 18, 19];    
        case 17:
            return [13, 14, 16, 19];
        case 18:
            return [15, 16, 19];
        case 19:
            return [16, 17, 18];           
    }
}

function checkOwner (theBee) {
    if(bot1.bees.includes(theBee))
    {
         return bot1;
    }
    else if(bot2.bees.includes(theBee))
    {
        return bot2;
    }
    else if(bot3.bees.includes(theBee))
    {
        return bot3;
    }
    else
    {
        return player;
    }
}

function battle (attacker, defender, attackerPosition, defenderPosition) {

    let totalAtk=0;
    let totalDef=0;
    let randomDiceAtk=0;
    let randomDiceDef=0;

    attackNo=Number(attacker.hexNo[attackerPosition].innerText);
    if(attackNo>1)
    {
        defendNo=Number(defender.hexNo[defenderPosition].innerText);
        defHexLocation=Array.from(hexagons).indexOf(defender.hexagons[defenderPosition]);
        defBeeLocation=Array.from(theBees).indexOf(defender.bees[defenderPosition]);
        defNoLocation=Array.from(hexNumbers).indexOf(defender.hexNo[defenderPosition]);

        diceRoll.style.display='';
        attackDice.style.display='';
        attackDice.innerText = `casino x ${attackNo} * ${attackNo}`;
        defendDice.style.display='';
        defendDice.innerText = `${defendNo} * ${defendNo} x casino`;

        for(let i=1; i<=attackNo; i++)
        {
            randomDiceAtk=randomNo(1,6);
            totalAtk += randomDiceAtk;
        }
        for(let j=1; j<=defendNo; j++)
        {
            randomDiceDef=randomNo(1,6);
            totalDef += randomDiceDef;
        }
        
        setTimeout(()=>
        {
            resultAtk.style.display='';
            resultDef.style.display='';
            resultAtk.innerText=`${totalAtk}`;
            resultDef.innerText=`${totalDef}`;
            diceRoll.style.display='none';
        },1500 );
        
        
        if(totalAtk-totalDef>0)
        {
                defender.bees.splice(defender.bees.indexOf(defender.bees[defenderPosition]), 1);
                defender.hexNo.splice(defender.hexNo.indexOf(defender.hexNo[defenderPosition]), 1);
                defender.hexagons.splice(defender.hexagons.indexOf(defender.hexagons[defenderPosition]), 1);

                attacker.bees.push(theBees[defBeeLocation]);
                attacker.hexNo.push(hexNumbers[defNoLocation]);
                attacker.hexagons.push(hexagons[defHexLocation]);

            setTimeout(()=>
            { 
                succes.style.display='';

                attacker.hexNo[attackerPosition].innerText = '1';
                attacker.hexNo[attacker.hexNo.length-1].innerText= attackNo-1;
                attacker.hexagons[attacker.hexagons.length-1].style.fill=`${attacker.color}`;                      
            }, 1500);
           
            resetDice();
        }
        else
        { 
            attacker.hexNo[attackerPosition].innerText = '1';
          
            setTimeout(()=>
            {
                fail.style.display='';
               
            },1500);

            resetDice();
        }

    }
    
}

function resetDice () {
    setTimeout(()=>
    {
        resultAtk.style.display='none';
        resultDef.style.display='none';
        attackDice.style.display='none';
        defendDice.style.display='none';
        succes.style.display='none';
        fail.style.display='none';
    },2500);
}
