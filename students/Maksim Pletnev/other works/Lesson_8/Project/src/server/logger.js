const moment = require ('moment')
const fs = require ('fs')

const logger = (name, action) => {
    fs.readFile ('./src/server/db/logger.json', 'utf-8', (err, data) => {
        if (err) {
            console.log ('log file not found')
        } else {
            let stats = JSON.parse (data)
            stats.push ({
                time: moment().format ('DD MM YYYY, hh:mm:ss'),
                action: action,
                prod_name: name
            })

            fs.writeFile ('./src/server/db/logger.json', JSON.stringify (stats), err => {
                if (err) {
                    console.log ('is not able to write')
                } 
            })
        }
    })
}

module.exports = logger