'use strict'

let text = `Lorem ipsum dolor sit amet 'consectetur' adipisicing elit. 
Dignissimos arn't hic voluptatem doloribus quisquam laboriosam 'reprehenderit' doloremque ducimus, saepe autem blanditiis. Give 'em a try.`

let regExp1 = /\s'/g;

let regExp2 = /'\s/g;

text = text.replace(regExp1, ` "` );
text = text.replace(regExp2, `" `)

console.log(text);

let text2 = `Lorem ipsum dolor sit amet 'consectetur' adipisicing elit. 
Dignissimos arn't hic voluptatem doloribus quisquam laboriosam 'reprehenderit' doloremque ducimus, saepe autem blanditiis. Give 'em a try.`

let regExp = /'[^\s]+'/g;
console.log(text2.match(regExp));

text2 = text2.replace(regExp, function(match) {
    console.log(match);
    let str = match.slice(1, match.length - 1);
    str = `"` + str + `"`;
    return str;
})

console.log(text2);