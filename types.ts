export enum EJobs {
  Background,
  Async,
  Sync,
}

export type TResult<T, E = Error> =
  | { ok: true, value: T }
  | { ok: false, value: E }


export type TCommand = "Strict" | "Lex" | "Important"

export interface IAction {
  func: Function
  context: Object

  run(): TResult<any>
}
