export function formatDate(date : string){
  return new Date(date).toLocaleDateString("en-US" , {
    month : "long",
    year : "numeric",
    day : "numeric"
  })
}

export function parseServerActionResponse<T>(response : T){
  return JSON.parse(JSON.stringify(response))
}
