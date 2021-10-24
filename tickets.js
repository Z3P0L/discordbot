const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Create a ticket',

    open_ticket(message, args) {
        let everyone = message.guild.roles.cache.find(rol => rol.name == "@everyone");

        // Check if the user has a ticket already open and if so, send an error message
        if (message.guild.channels.cache.find(ch => ch.name == `ticket-${message.author.username}`.toLowerCase())) {
            message.reply(`You already have a ticket open! Please close it before opening a new one.`);
            return;
        }

        const reason = args.join('');
        if (!reason) return message.reply(`Please provide a reason for your ticket!`);

        const embed = new Discord.MessageEmbed()
        .setTitle(`Ticket Created`)
        .setDescription(`${message.author} has created a ticket!`)
        .addField(`Reason`, reason)
        .addField("How to close this ticket", "Use the command `-ticket-close`")
        .setColor(`#ff0000`)
        .setTimestamp();

        message.guild.channels.create(`ticket-${message.author.username}`, {
            permissionOverwrites: [
                {
                    id: everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: message.author,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ],
            parent: "901599997550805022",
        }).then((c) => c.send({embeds: [embed]}));

        message.reply(`Your ticket has been created!`);

    },

    close_ticket(message, args) {
        // Check if the user has a ticket open and if so, close it
        if (message.guild.channels.cache.find(ch => ch.name == `ticket-${message.author.username}`.toLowerCase())) {
            message.guild.channels.cache.find(ch => ch.name == `ticket-${message.author.username}`.toLowerCase()).delete();
            message.reply(`Your ticket has been closed!`);
        }
        else {
            message.reply(`You don't have a ticket open!`);
        }
    }
}