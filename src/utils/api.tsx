export async function apiReq(
  endPoint: string,
  method?: string,
  body?: object,
  headers?: {
    "Content-Type": "application/json",
  },
) {
  if (method === "GET" || method === 'DELETE') {
    return fetch(endPoint, { method: method }).then(res => res.json()).catch(err => err || "Something Went Wrong");
  }
  if (method === "POST" || method === "PUT") {
    let data = {
      method: method,
      headers: headers
    };
    body && Object.assign(data, { ['body']: JSON.stringify(body) })
    return fetch(endPoint, data).then(res => res.json()).catch(err => err || "Something Went Wrong");
  }
}
