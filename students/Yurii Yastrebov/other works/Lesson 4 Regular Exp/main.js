let text = "Lorem ipsum dolor, 'sit aren't consectetur adipisicing elit. Sed, dignissimos nisi"
let reg = /(?![a-z])'(?![a-z]\s)/g
result = text.replace(reg, '"')
console.log(result)

