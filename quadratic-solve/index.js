"use strict";

const chalk = require("chalk");
const rl = require("readline-sync");
const ask = rl.question;

function choise() {
    let eq = ask("Enter equation: ");
    eq = eq.replace(/ /g, '');

    //First check if input matches standard form regex, \/
    //Regex standard form, [+/-num]x^2[+/-num]x[+/-num]

    let formCheck = eq.match(/^-?\d*x\^2[+-]\d*x[+-]\d+$/);
    if(!formCheck) {
        error("Please give a quadratic equation in standard form.");
        return setTimeout(choise, 0);
    }
    formCheck = formCheck.toString();
    if(typeof formCheck == "object" && typeof formCheck != "string") {
        error("Chill, one at a time please.");
        return setTimeout(choise, 0);
    }
    if(typeof formCheck != "string") {
        error("Tf?  type: " + typeof formCheck);
        return setTimeout(choise, 0);
    }

    let a = eq.match(/^-?\d*x\^2/).toString().subS(-3);
        if(a == "") a = 1; else if(a == "-") a = -1;
    let b = eq.match(/[+-]\d*x(?!\^2)/).toString().subS(-1);
        if(b[0] == "+") b = b.substring(1);
        if(b == "") b = 1; else if(b == "-") b = -1;
    let c = eq.match(/[+-]\d+$/).toString();
        if(c[0] == "+") c = c.substring(1);

    //Eval, one negative one positive for +/-
    let plusAns = ((b*-1)+Math.sqrt((b*b)-(4*a*c))) / (2*a);
    let minusAns = ((b*-1)-Math.sqrt((b*b)-(4*a*c))) / (2*a);

    if(plusAns == -0) plusAns = 0;
    if(minusAns == -0) minusAns = 0;

    let solution = "";

    if(plusAns == minusAns) solution = plusAns.round(3); else {
        if(!isNaN(plusAns)) solution = chalk.bold(plusAns.round(3));
        if(!isNaN(minusAns) && !isNaN(plusAns)) solution += ` & ${chalk.bold(minusAns.round(3))}`;
        if(!isNaN(minusAns) && isNaN(plusAns)) solution = chalk.bold(minusAns.round(3));
        if(isNaN(plusAns) && isNaN(minusAns)) solution = chalk.bold("none");
    }

    console.log("Real roots: " + solution);
    setTimeout(choise, 0);
}

function error(txt) {
    console.log(chalk.bold.red(txt));
}

/**
 * Substring but my own, works a tad bit differently
 * Mine starts from beginning, substring starts from end
 * @param {number} fir 
 * @param {number} sec
 * @return {string} 
 */
String.prototype.subS = function(fir, sec) {
	if       (!fir && !sec) { //No arguments
		return this;
	} else if(fir && !sec) {  //Params are (0, fir)
		sec = fir;
		fir = 0;
	}
	if       (sec < 0) {
		return this.substring(fir, this.length + sec);
	} else if(sec > 0) {
		return this.substring(fir, sec);
	} else             {
		return '';
	}
};

Number.prototype.round = function(place) {
    return Math.round((this + Number.EPSILON) * (10**place)) / (10**place); //From stackoverflow lol
}

choise();