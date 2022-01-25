export class comDesc {
  commandName: string
  commandDescription: string
  args?: string[]

  constructor(commandName: string, commandDescription: string, ...args: string[]) {
    this.commandName = commandName
    this.commandDescription = commandDescription
    this.args = args
  }
}