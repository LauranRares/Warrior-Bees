//////////////////////End Turn Button/////////////////////////////
let bot1Time=2000;
let bot2Time=3500;
let bot3Time=4500;
let shortTime=0;

endTurnBtn.addEventListener('click', ()=>
{
    setTimeout(()=>
    {
        diceRoll.style.display='';
    },300);
    distributeBees(player);

    if(bot1.bees.length>=1)
    {
        setTimeout(()=>
        { 
            topSquares[2].style.border ='3px solid black';
            topSquares[3].style.border ='3px solid black';
            topSquares[0].style.border='3px solid black';
            topSquares[1].style.border ='6px solid black';
            endTurnBtn.style.backgroundColor= `${bot1.color}`;
            botTurn(bot1);
            setTimeout( ()=>
            {
                distributeBees(bot1);
            },1000);
        },bot1Time);
    }
    else
    {shortTime = 2000;}

    if(bot2.bees.length>=1)
    {
        setTimeout(()=>
        { 
            topSquares[3].style.border ='3px solid black';
            topSquares[0].style.border='3px solid black';
            topSquares[1].style.border='3px solid black';
            topSquares[2].style.border ='6px solid black';
            endTurnBtn.style.backgroundColor= `${bot2.color}`;
            botTurn(bot2);
            setTimeout( ()=>
            {
                distributeBees(bot2);
            },1000);
        },bot2Time - shortTime);
    }
    else
    {shortTime = 1500;}

    if(bot3.bees.length>=1)
    {
        setTimeout(()=>
        { 
            topSquares[1].style.border ='3px solid black';
            topSquares[0].style.border ='3px solid black';
            topSquares[2].style.border='3px solid black';
            topSquares[3].style.border ='6px solid black';
            endTurnBtn.style.backgroundColor= `${bot3.color}`;
            botTurn(bot3);
            setTimeout( ()=>
            {
                distributeBees(bot3);
            },1000);
            
        },bot3Time-shortTime);
    }
    else
    {shortTime = 1000;}

    setTimeout(()=>
    { 
        topSquares[1].style.border ='3px solid black';
        topSquares[2].style.border ='3px solid black';
        topSquares[3].style.border='3px solid black';
        topSquares[0].style.border ='6px solid black';
        endTurnBtn.style.backgroundColor= `${player.color}`;
        diceRoll.style.display='none';
    },6000-shortTime);

});

////////////////////////////////Bots////////////////////////
function botTurn (theBot) {
 
    let arrayMax=[];
    theBot.hexNo.forEach( i=>
    {
        arrayMax.push(Number(i.innerText));
    });
    let max=Math.max.apply(Math, arrayMax);

    for(let i=1; i<max; i++)
    {
        theBot.hexNo.forEach( troops=>
        {
            if(Number(troops.innerText)>1)
            {
                let botPosition=theBot.hexNo.indexOf(troops);
                let botHexPositionMap=Array.from(hexagons).indexOf(theBot.hexagons[botPosition]);
                let mapCheck=[];
                mapCheck = locationMap(botHexPositionMap);

                Array.from(hexagons).forEach( space=>
                {
                    let targetPosition=Array.from(hexagons).indexOf(space);
                    let attackedOne =Number(hexNumbers[targetPosition].innerText);
                    let theAttacker =Number(hexNumbers[botHexPositionMap].innerText);

                    if(mapCheck.includes(targetPosition) && theAttacker>=attackedOne && !theBot.hexagons.includes(space))
                    {
                        let master = checkOwner(theBees[targetPosition]);
                        let masterPosition= master.bees.indexOf(theBees[targetPosition])
                        
                        battleBots(theBot, master, botPosition, masterPosition);                      
                    }
                });
            }
        });
    }
 
}

function battleBots (attacker, defender, attackerPosition, defenderPosition) {

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

        for(let i=1; i<=attackNo; i++)
        {
            randomDiceAtk=randomNo(1,6);
            totalAtk += randomDiceAtk;
        }
        for(let i=1; i<=defendNo; i++)
        {
            randomDiceDef=randomNo(1,6);
            totalDef += randomDiceDef;
        }

        
        if(totalAtk-totalDef>0)
        {
            defender.bees.splice(defender.bees.indexOf(defender.bees[defenderPosition]), 1);
            defender.hexNo.splice(defender.hexNo.indexOf(defender.hexNo[defenderPosition]), 1);
            defender.hexagons.splice(defender.hexagons.indexOf(defender.hexagons[defenderPosition]), 1);

            attacker.bees.push(theBees[defBeeLocation]);
            attacker.hexNo.push(hexNumbers[defNoLocation]);
            attacker.hexagons.push(hexagons[defHexLocation]);

            attacker.hexNo[attackerPosition].innerText = '1';
            attacker.hexNo[attacker.hexNo.length-1].innerText= attackNo-1;
            attacker.hexagons[attacker.hexagons.length-1].style.fill=`${attacker.color}`;
        }
        else
        {
            attacker.hexNo[attackerPosition].innerText = '1';
        }
    }
}