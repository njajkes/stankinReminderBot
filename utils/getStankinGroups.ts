import * as fs from "fs/promises"
import * as path from "path"

export async function getStankinGroups(): Promise<Array<string>> {
  const groupFiles = await fs.readdir("..\\schedule\\assets")
  const result = groupFiles.map(file => path.basename(file, ".json"))
  return result
}