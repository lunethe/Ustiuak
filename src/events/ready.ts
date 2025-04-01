import { Events } from 'discord.js';
import { type Event } from '../typings';

const ReadyEvent: Event = {
	name: 'ready',
	eventName: Events.ClientReady,
	disabled: false,

	async run() {
		console.log('Ready!');
	}
};

export default ReadyEvent;