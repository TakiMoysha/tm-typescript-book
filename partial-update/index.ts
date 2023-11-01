
export interface IObjectUpdate {
  id?: number;
  name?: string;
  age?: number;
  repo?: number;
}

export function handler(body: IObjectUpdate) {
  const updatedFields = [
    body.id ? { field: "id", value: body.id } :  undefined,
    body.name ? { field: "name", value: body.name } : undefined,
    body.age ? { field: "age", value: body.age } : undefined,
    body.repo ? { field: "repo", value: body.repo } : undefined,
  ].filter((value) => Boolean(value));

  console.log(updatedFields);
}
