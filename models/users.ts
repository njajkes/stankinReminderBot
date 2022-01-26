import {Schema, model} from "mongoose"

export interface User {
  uid: number,
  username: string,
  groupName: string,
  role: string
}

const userSchema = new Schema<User>({
  uid: {type: Number, required: true},
  username: {type: String, required: true},
  groupName: {type: String, required: true},
  role: {type: String, required: true}
})

export const userModel = model("user", userSchema)