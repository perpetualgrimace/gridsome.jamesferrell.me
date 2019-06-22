/**
converts the first letter of a string to uppercase
*/
export function uppercaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
takes an array of arrays and flattens them into a single array
*/
export function flattenArray(arr) {
  return arr.reduce(function(a, b){
     return a.concat(b);
}, [])
}

/**
takes a URL hash and converts it to tag title
*/
export function formatHashAsTag(hash) {
  return hash
    .replace("#", "")
    .replace(/-/g, " ")
    .replace("front end", "front-end");
}
