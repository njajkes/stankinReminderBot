import { Schema, model } from "mongoose"

const counterSchema = new Schema({
  _id: {type: String, required: true},
  count: {type: Number, default: 0}
})

export const counterModel = model('counter', counterSchema)