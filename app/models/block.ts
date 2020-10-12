import mongoose, { Schema, Document } from "mongoose";

export interface IBlock extends Document {
  type: string;
  meta: string;
  name: string;
  textType: string;
  hqImage: boolean;
  expandable: boolean;
  credit: string;
}

const BlockSchema: Schema = new Schema({
  type: { type: String, required: true },
  meta: { type: String, required: true },
  name: { type: String, required: true },
  textType: { type: String, required: true },
  hqImage: { type: Boolean, required: true },
  expandable: { type: Boolean, required: true },
  credit: { type: String, required: true },
});

export default mongoose.model<IBlock>(
  "Block",
  BlockSchema,
  process.env.DATABASE_COLLECTION as string
);
