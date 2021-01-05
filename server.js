require('dotenv').config();

/////////////////////// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const morgan = require('morgan');


/////////////////////// APPLICATION SETUP
const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

/////////////////////// MISC
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

/////////////////////// ROUTE DEFINITIONS/CALLBACKS
app.get('/', indexEjsHandler);
app.get('/album', albumEjsHandler);


//////////// INDEX (HOME) EJS HANDLER
function indexEjsHandler(req, res) {
    console.log('////////////////////////// FUNCTION LOAD //////////////////////////')

    // pokiData.forEach( data => {
    //     sortedPoki.push(data.name);
    //     sortedPoki.sort();
    // });

    // res.render('pages/show', {pokiOBJ: sortedPoki});
    res.render('pages/index', {cards: redBeltCard});
};

//////////// INDEX (HOME) EJS HANDLER

function albumEjsHandler(req, res) {
    console.log('////////////////////////// FUNCTION LOAD //////////////////////////')

    // pokiData.forEach( data => {
    //     sortedPoki.push(data.name);
    //     sortedPoki.sort();
    // });

    // res.render('pages/show', {pokiOBJ: sortedPoki});
    res.render('pages/album', {cards: redBeltCard});
};

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





/////////// Unit Card - Creation ////////////////////////////////////////////////////////////
const redBeltCard = new Unit("Red Belt Ninja", 3, 3, 4);
const blackBeltCard = new Unit("Black Belt Ninja", 4, 5, 4);

/////////// Effect Card - Creation ////////////////////////////////////////////////////////////
const hardAlgo = new Effect("Hard Algorithm", 2, "increase target's resilience by 3", "res", +3)
const unhandledPromiseRejection = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "res", -2)
const pairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "power", +2)


/////////// Effect Card - Played/Used
hardAlgo.play(redBeltCard);
unhandledPromiseRejection.play(redBeltCard);
pairProgramming.play(redBeltCard);


/////////// Attacks
redBeltCard.attack_res(blackBeltCard);



console.log(redBeltCard);
console.log(redBeltCard);
console.log(redBeltCard);
console.log(redBeltCard);
console.log(blackBeltCard);
console.log(blackBeltCard);
console.log(blackBeltCard);




// startServer();
app.listen(PORT, () => console.log('Server is running on PORT: ', PORT));
