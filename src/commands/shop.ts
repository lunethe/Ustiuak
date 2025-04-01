import { type ColorResolvable, EmbedBuilder, type Message } from 'discord.js';
import { type UstiuakClient } from '..';
import { type Command } from '../typings';

export const items = [
	{
		'name': '🍬',
		'cost': 3250,
		'stock': 1000,
		'tag': ''
	},
	{
		'name': '🥓',
		'cost': 6500,
		'stock': 1000,
		'tag': ''
	},
	{
		'name': '🧀',
		'cost': 10500,
		'stock': 750,
		'tag': ''
	},
	{
		'name': '🛡️',
		'cost': 55000,
		'stock': 500,
		'tag': ''
	},
	{
		'name': '☢️',
		'cost': 100000,
		'stock': 250,
		'tag': ''
	},
	{
		'name': '🚀',
		'cost': 350000,
		'stock': 100,
		'tag': ''
	},
	{
		'name': '🌶️',
		'cost': 645000,
		'stock': 70,
		'tag': 'Spicy'
	},
	{
		'name': '🧡',
		'cost': 1000000,
		'stock': 30,
		'tag': 'Orange Heart?'
	},
	{
		'name': '🛹',
		'cost': 6600000,
		'stock': 20,
		'tag': 'Skateboards!'
	},
	{
		'name': '<:lovejug:1123015628220018708>',
		'cost': 10000000,
		'stock': 10,
		'tag': 'WE LOVE JUG!'
	},
	{
		'name': '<:loveluck:1123013321495416882>',
		'cost': 10000000,
		'stock': 10,
		'tag': 'WE LOVE LUCK!'
	},
	{
		'name': '<:lovesnow:1123013996321189991>',
		'cost': 10000000,
		'stock': 10,
		'tag': 'WE LOVE SNOW!'
	},
	{
		'name': '<:hehe:1117841755648294993>',
		'cost': 80000000,
		'stock': 5,
		'tag': '<:hehe:1117841755648294993>'
	},
	{
		'name': '🌌',
		'cost': 250000000,
		'stock': 3,
		'tag': 'Galactic.'
	},
	{
		'name': '😘',
		'cost': 1000000000,
		'stock': 3,
		'tag': 'Mwah :)'
	}
];

const ShopCommand: Command = {
	name: 'shop',
	description: 'Display the shop',
	aliases: ['store'],

	async run(client: UstiuakClient, message: Message, args: string[]) {
		const fields = items.map((i) => {
			return {
				name: `${i.name}`,
				value: `**${i.cost.toLocaleString()}**:gem: - **${i.stock.toLocaleString()} Left**${i.tag ? `\n**[${i.tag}]**` : ''}`,
				inline: true
			};
		});
		const shopEmbed = new EmbedBuilder()
			.setAuthor({ name: `${client.config.branding}`, iconURL: client.user?.displayAvatarURL() })
			.setTitle(`${client.config.branding} Shop`)
			.setDescription('Welcome to the Shop! Use `.buy :emoji:` or `.sell :emoji:` to use the shop! You can find your purchased emojis in your `.inventory`')
			.addFields(fields)
			.setFooter({ text: `${client.config.branding} | Shop` })
			.setColor('White');

		return await message.channel.send({ embeds: [shopEmbed] });
	}
};

export default ShopCommand;