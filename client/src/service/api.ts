export default class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  get<T>(path: string): Promise<T> {
    return fetch(`${this.url}${path}`).then((res) => {
      if (!res.ok) {
        throw res;
      }
      try {
        return res.json();
      } catch (e) {
        console.error("Error reading json.", e);
      }
    });
  }

  post(path: string, body: Object) {
    return fetch(`${this.url}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => {
      try {
        return res.json();
      } catch (e) {
        console.error("Error reading json.", e);
      }
    });
  }
}
