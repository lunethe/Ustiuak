import { Document, Schema, model } from 'mongoose';

export interface Guild extends Document {
	_id: string;
	prefix: string;
}

export const GuildSchema = new Schema<Guild>({
	_id: { type: String },
	prefix: { type: String, default: '.' }
});

export default model<Guild>('Guild', GuildSchema);