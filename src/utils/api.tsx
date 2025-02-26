export async function apiReq(
  endPoint: string,
  method?: string,
  body?: object,
  headers?: {
    "Content-Type": "application/json",
  },
) {
  if (method === "GET" || method === 'DELETE') {
    //For GET and DELETE methods body and headers aren't required
    return fetch(endPoint, { method: method }).then(res => res.json()).catch(err => err || "Something Went Wrong");
  }
  if (method === "POST" || method === "PUT") {
    let data = {
      method: method,
      headers: headers
    };
    //Add body to data object only if body has recievd a value in params
    body && Object.assign(data, { ['body']: JSON.stringify(body) })
    return fetch(endPoint, data).then(res => res.json()).catch(err => err || "Something Went Wrong");
  }
}
