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
