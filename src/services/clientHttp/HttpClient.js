import delay from "../../utils/delay";
import APIError from "../../errors/APIError";
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(1500);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;

    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("application/json")) {
      body = await response.json();
    }
    if (response.ok) {
      return body;
    }
    //mandando erro personalizado de API
    throw new APIError(response, body);
  }
  async post(path,body) {
    await delay(1500);

    const headers = new Headers ({
      'Content-Type' : 'application/json'
    })

    const response = await fetch(`${this.baseURL}${path}`,{
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;

    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("application/json")) {
      responseBody = await response.json();
    }
    if (response.ok) {
      return responseBody;
    }
    //mandando erro personalizado de API
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
