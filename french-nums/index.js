"use strict";

const chalk = require("chalk"); // Colours

const numToFrench = require('./numtofrench.js'); // Convert number to french written number

const rl = require('readline-sync'); // User input

/**
 *  Prints an error in bold red
 *  @param {string} txt The error message
*/
function error(txt) {
    console.error(chalk.bold.red(`Error: ${txt}`));
}

/**
 * Asks the user what to do with choice of convert or list
 */
function choice() {
    let input = ask("What do you want to do? (Convert/list) ");

    input = input.toLowerCase();
    switch(input) {
        case 'convert':
        case 'c':
            prompt();
            break;
        case 'list':
        case 'quizlet':
        case 'study':
        case 'l':
            let start = ask("Start number: ");
            let end = ask("End number: ");
            let step = ask("Step: ");
                if(step == "" || isNaN(parseInt(step))) step = 1;
                else step = parseInt(step);
            let separator = ask("Separator: ");
                if(separator == "") separator = ": ";
                else if(separator == "tab") separator = "\t";

            if(start < 0)       return error("start is less than 0!"); else
            if(start >= 999999) return error("start is too large!"); else
            if(end > 999999)    return error("end is too large!"); else
            if(end <= 0)        return error("end is too small!"); else
            if(start > end)     return error("end must be larger than start!");
            list(start, end, step, separator);
            setTimeout(choice, 0);
            break;
        case 'test':
            quiz();
            break;
        case undefined || "":
            setTimeout(choice, 0);
            break;
        case 'quit':
        case 'exit':
            process.exit(0);
            break;
        default:
            //Unrecognised option
            error(`'${input}' is not an option`);
            setTimeout(choice, 0);
            break;
    }
    setTimeout(choice, 0);
}

/**
 * Prompts the user for a number
 */
function prompt() {
    let input = ask("Input a number (0-999999) or 'exit' to stop: ");

    if(["exit", "break", "leave", "stop"].indexOf(input) != -1)
        return setTimeout(choice, 0);
    else {
        let word = numToFrench(input, error);

        if(word != undefined) console.log(word);
        setTimeout(prompt, 0);
    }
}

/**
 * Lists numbers en français from start to end, inclusive
 * @param {number} start >= 0
 * @param {number} end < 1,000,000
 * @param {number} step Number to iterate by
 * @param {string} separator String that separates numeral from french word
 */
function list(start, end, step, separator) {
    if(!step) step = 1;

    start = parseInt(start);
    end = parseInt(end);
    step = parseInt(step);

    let startTime = new Date();
    //for(let i = 0; i < 1000000; i++)
    for(let i = start; i <= end; i += step) {
        console.log(`${i}${separator}${numToFrench(i, error)}`);
    }
    let endTime = new Date();
    console.log(`\nTime taken: ${endTime - startTime}ms\n`);
}

function quiz() {
	announce("Quiz time!");
	announce("Answer with the given number written in French.");
	console.log(chalk.bold("Correct answers will be marked as ") + chalk.bold.green("green") + chalk.bold.white("."));
	console.log(chalk.bold("Incorrect answers will be marked as ") + chalk.bold.red("red") + chalk.bold.white("."));
	announce("Let's begin!");
}

/**
 * Prompt the user for input
 */
let ask = rl.question;
/**
 * Print in bold white
 * @param {string} txt The message
*/
function announce(txt) {
	console.log(chalk.bold(txt));
}

console.log(chalk.yellow("Use Ctrl+Z to stop the program"));
choice();
