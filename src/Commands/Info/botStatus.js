const { Client, Message, MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const version = require('../../../package.json').version;
const os = require('os');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {
    name: 'stats',
    description: 'Returns Bot Status',
    aliases: ['bot-status', 'status'],
    emoji: '📊',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Define the capitalize function
        const capitalize = str => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        
        const supportServerLink = 'https://discord.gg/UV22V6fEAv'; // Replace with your support server link
        const websiteLink = 'https://linktr.ee/UNKNOWNPHV'; // Replace with your website link
        
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setTitle(`PHV'S Stats`)
            .setURL(websiteLink)
            .setThumbnail(client.user.displayAvatarURL({ size: 512, format: 'png' }))
            .setColor(message.guild.me.displayHexColor || client.color)
            .addFields(
                { name: ':robot: General', value: `**❯ Client:** ${client.user.tag} (${client.user.id})\n**❯ Commands:** ${client.commands.size}\n**❯ Server:** ${client.guilds.cache.size.toLocaleString()} Servers\n**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users\n**❯ Channels:** ${client.channels.cache.size.toLocaleString()} channels\n**❯ Creation date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}\n**❯ Node.js:** ${process.version}\n**❯ Version:** v${version}\n**❯ Discord.js:** v${djsversion}\n**❯ Uptime:** ${pretty(client.uptime)}` },
                { name: ':computer: System', value: `*❯ Platform:** ${capitalize(process.platform)}\n**❯ System uptime :** ${ms(os.uptime() * 1000, {long: true})}\n**❯ CPU:**\n\u3000 Cores: ${os.cpus().length}\n\u3000 Model: ${core.model}\n\u3000 Speed: ${core.speed} MHz` },
                { name: ':signal_strength: Network', value: `**❯ Latency:** ${client.ws.ping} ms` }
            )
            .setTimestamp()
            .setFooter('Support Server', client.user.displayAvatarURL())
            .setURL(supportServerLink);

        message.channel.send({ embeds: [embed] });
    },
};
