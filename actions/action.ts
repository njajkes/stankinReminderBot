export class Action {
  func: (ctx: any) => Promise<void>;
  name: string;

  constructor(f: (ctx: any) => Promise<void>, n: string) {
    this.func = f;
    this.name = n;
  }
}