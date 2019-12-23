const fs = require ('fs');
const moment = require ('moment');

const logger = (action, name) => {
    fs.readFile ('./db/logs.json', 'utf-8', (err, data) => {
        if (err) {
            console.log ('Cannot read logs...');
        } else {
            let d = JSON.parse (data);
            let newLog = {
                name_prod: name,
                user_action: action,
                time: moment().format ('DD-MM-YYYY, h:mm:ss')
            }
            d.push (newLog);
            fs.writeFile ('./db/logs.json', JSON.stringify(d), (err) => {
                if (err) {
                    console.log ('Cannot write logs...');
                }
            })
        }
    });
}


module.exports = logger;