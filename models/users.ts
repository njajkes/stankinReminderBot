import {Schema, model} from "mongoose"

export interface User {
  uid: number,
  groupID: number,
  role: string
}

const userSchema = new Schema<User>({
  uid: {type: Number, required: true},
  groupID: {type: Number, required: true},
  role: {type: String, required: true}
})

export const userModel = model("user", userSchema)