import { Document, Schema, model } from 'mongoose';

export interface Cooldown extends Document {
	uid: string;
	command: string;
	expiresAt: string;
}

export const CooldownSchema = new Schema<Cooldown>({
	uid: { type: String },
	command: { type: String },
	expiresAt: { type: String }
});

export default model<Cooldown>('Cooldown', CooldownSchema);