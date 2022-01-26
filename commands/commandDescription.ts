export class comDesc {
  commandName: string
  commandDescription: string
  permissions: number
  args?: string[]

  constructor(commandName: string, commandDescription: string, permissions: number, ...args: string[]) {
    this.commandName = commandName
    this.commandDescription = commandDescription
    this.permissions = permissions
    this.args = args
  }
}