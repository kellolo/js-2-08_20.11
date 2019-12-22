const fs = require ('fs');
const moment = require ('moment');

const logger = (action, name) => {
    fs.readFile ('./server/db/logs.json', 'utf-8', (err, data) => {
        if (err) {
            console.log ('Cannot read logs...');
        } else {
            let d = JSON.parse (data);
            let newLog = {
                user_action: action,
                name_prod: name,
                time: moment().format ('DD-MM-YYYY, h:mm:ss')
            }
            d.push (newLog);
            fs.writeFile ('./server/db/logs.json', JSON.stringify (d, null, 4), (err) => {
                if (err) {
                    console.log ('Cannot write logs...');
                }
            })
        }
    });
}


module.exports = logger;