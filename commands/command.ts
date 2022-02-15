import { comDesc } from "./comDesc";

export class command {
  func: (ctx: any) => Promise<void>;
  name: string;
  description: comDesc;

  constructor(func: (ctx: any) => Promise<void>, name: string, desc?: comDesc) {
    this.func = func;
    this.name = name;
    this.description = desc;
  }
}
