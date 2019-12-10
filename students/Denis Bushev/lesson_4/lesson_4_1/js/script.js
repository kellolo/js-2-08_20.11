const text = "He travelled in the Caucasus, the Crimea and gained the impressions for his 'southern cycle' of romantic narrative poems: 'Kavkazsky plennik' (The Prisoner of the Caucasus), 'Bratya razboyniki' (The Robber Brothers), and 'Bakhchisaraysky fontan' (The Fountain of Bakhchisaray). I can't say bad things about him";

// function addCommas(text) {
//     let before = /\s\'/g;
//     let after = /\'\s/g;
//     let test = text.replace(before, ' "');
//     test = test.replace(after, '" ');
//     return test;
// }

// document.write(addCommas(text));

function addCommas(text) {
    let regular = /\B'|'\B/g;
    let test = text.replace(regular, '"');
    return test;
}

document.write(addCommas(text));