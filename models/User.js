import { Schema, model, Types } from "mongoose";

const schema = new Schema({
  email: { type: String, reqired: true, unique: true },
  password: {type: String, reqired: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
});

export default model('User', schema)