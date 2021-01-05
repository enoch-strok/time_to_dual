require('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');

// Initialize the App
const app = express();
app.use(cors());

// Global Variables
const PORT = process.env.PORT;


/////////// Card Class - Creation ////////////////////////////////////////////////////////////
class Card {
    constructor(name, cost){
        this.name = name;
        this.cost = cost;
    }
}

/////////// Child Card Class - Unit - Creation ////////////////////////////////////////////////////////////
class Unit extends Card {
    constructor(name, cost, power, res){
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    attack_res(target){
        target.res = target.res - this.power;
        console.log(`${this.name} attacked ${target.name}`)
    }
}

/////////// Child Card Class - Effect - Creation ////////////////////////////////////////////////////////////
class Effect extends Card {
    constructor(name, cost, text, stat, magnitude){
        super(name, cost);
        this.stat = stat;
        this.magnitude = magnitude;
        this.text = text;
    }
    play( target ) {
        if( target instanceof Unit ) {
            if(this.stat === 'res'){
                console.log(`${this.text} against ${target.name}`);
                target.res += this.magnitude;
            }else if(this.stat === 'power'){
                console.log(`${this.text} against ${target.name}`);
                target.power += this.magnitude;
            }   
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}





/////////// Red Belt Card - Creation ////////////////////////////////////////////////////////////
const redBeltCard = new Unit("Red Belt Ninja", 3, 3, 4);
console.log(redBeltCard);
/////////// Buff Effect - Created
const hardAlgo = new Effect("Hard Algorithm", 2, "increase target's resilience by 3", "res", +3)
// console.log(hardAlgo);
/////////// Buff Effect - Played
hardAlgo.play(redBeltCard);
console.log(redBeltCard);

/////////// Black Belt Card - Creation ////////////////////////////////////////////////////////////
const blackBeltCard = new Unit("Black Belt Ninja", 4, 5, 4);
console.log(blackBeltCard);
/////////// Nerf Effect - Creation
const unhandledPromiseRejection = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "res", -2)
// console.log(unhandledPromiseRejection);
/////////// Nerf Effect - Played
unhandledPromiseRejection.play(redBeltCard);
console.log(redBeltCard);


/////////// Nerf Effect - Creation ////////////////////////////////////////////////////////////
const pairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "power", +2)
// console.log(pairProgramming);
/////////// Nerf Effect - Played
pairProgramming.play(redBeltCard);
console.log(redBeltCard);

/////////// Red vs Black - Attack
console.log(blackBeltCard);
redBeltCard.attack_res(blackBeltCard);
console.log(blackBeltCard);



// startServer();
app.listen(PORT, () => console.log('Server is running on PORT: ', PORT));
