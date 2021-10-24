const Discord = require('discord.js');
const { close_ticket } = require('./tickets.js');
const Tickets = require('./tickets.js');

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.login(process.env.TOKEN);

client.on("messageCreate", async (message) => {
    console.log(message.content);

    let prefix = "-";

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }

    // Ticket System

    if (command === "ticket") {
        Tickets.open_ticket(message, args);
    }

    if (command === "ticket-close") {
       close_ticket(message);
    }

    // End Ticket System

});