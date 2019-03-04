const Discord = require('discord.js')
// OUR BASE

const client = new Discord.Client()
// MAKE A NEW CLIENT FOR IT

const config = require("./config.json")
// WE NEED THE CONFIG.JSON, DON'T WE?


client.on('ready', () => {
	// ONCE IT'S DONE LOADING:
    console.log("Connected as " + client.user.tag)
    // LET'S LIST THE SERVERS WE ARE IN:
    console.log("Servers:")
    // ALL RIGHT, NOW LET'S LIST ALL THE CHANNELS WE HAVE
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        // LIST THE DISCORD SERVER NAME
        
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
            // LIST THE CHANNELS IN THE DISCORD SERVER
        })
    })
    client.user.setActivity("O PUMBA LA PUMBA", {type: "LISTENING"})
    // SET THE BOT TO THE "LISTENING TO". YOU CAN CHANGE IT TO TYPE 'PLAYING', 'STREAMING', "LISTENING" AND "WATCHING"
})





/////////////////////////
client.on('message', (receivedMessage) => {
	// I RECEIVED A MESSAGE, WHAT SHOULD I DO?
	console.log("Message sent by "+ receivedMessage.author + ":" + receivedMessage)
	// LOGGING WHO SENT IT AND WHAT THEY SENT (WILL HAVE TO FIX IT)
    if (receivedMessage.content.startsWith(config.prefix) && !receivedMessage.author.bot) {
    	// START WITH MY PREFIX ---AND--- NOT BE A BOT (AFTER ALL WE ONLY WANT TO RESPOND USERS)
        processCommand(receivedMessage)
        // ALL RIGHT LET'S GO THE PROCESSING NOW
    }
})


function processCommand(receivedMessage) {
// OKAY I RECEIVED THE COMMAND, I'LL PROCESS IT
    let fullCommand = receivedMessage.content.substr(3).trim().toLowerCase() // Remove the leading exclamation mark
	// THE FULL THING
    let splitCommand = fullCommand.split(/ +/g) // Split the message up in to pieces for each space
    // THE FULL THING SPLITTED
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    // THE FIRST ONE, AKA THE COMMAND
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    // THE ARGUMENTS THAT COME AFTER THE COMMAND

    // LOG THE SHIT OUT OF IT SO WE KNOW THE COMMAND RECEIVED
    console.log("Command received: " + primaryCommand)
    // MORE LOGS SO WE KNOW THE ARGUMENTS
    console.log("Arguments: " + arguments) // There may not be any arguments


    // if (primaryCommand == "help") {
    //     helpCommand(arguments, receivedMessage)
    // }

    // COMMAND 1: MACONHA
    if (primaryCommand == "maconha") {
        receivedMessage.channel.send("Eu gosto de fumar maconha")
    }

    // COMMAND 2: MULTIPLY
    else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)

    // IF COMMAND NOT KNOWN THEN
    } else {
        receivedMessage.channel.send("Que porra é essa aí menor, manda um `cv!help` que tu tá perdido")
    }
}

// TO BUILD - HELP COMMANDS //

// function helpCommand(arguments, receivedMessage) {
//     if (arguments=="maconha") {
//     	receivedMessage.channel.send("Eu fumo maconha")
//     }
//     else if (arguments.length > 0) {
//         receivedMessage.channel.send("It looks like you might need help with " + arguments)
//     } 
//     else {
//         receivedMessage.channel.send("I'm not sure what you need help with. Try `cv!help [topic]`")
//     }
// }



// FUNCTION FOR THE COMMAND 2
function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
	// IF RECEIVED ONLY 1 OR NO NUMBER
        receivedMessage.channel.send("Not enough values to multiply. Try `cv!multiply 2 4 10` or `cv!multiply 5.2 7`")
        return
        // RETURN TO IGNORE THE REST
    }
    let product = 1
    // PRODUCT FOR THE MULTIPLYING * 1
    arguments.forEach((value) => {
    // FOR EACH VALUE (LITERALLY)
        product = product * parseFloat(value)
    	// MULTIPLY THE NEW VALUE TO THE TOTAL
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
    // HOW MUCH IS THE RESULT?
}



// LOGIN - YOU DON'T REALLY NEED TO TOUCH THIS UNLESS IF YOU CHANGE THE CONFIG.JSON
client.login(config.token)