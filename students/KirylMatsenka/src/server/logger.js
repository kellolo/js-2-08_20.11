const fs = require ('fs')
const logfile = './dist/server/db/stats.json'
const moment = require ('moment')

let writeJsonFile = (file, result) => {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            console.log (err)
        } else {
            let logs  = JSON.parse (data)
            logs.push (result)
            fs.writeFile (file, JSON.stringify (logs, null, 4), (err) => {
                if (err) {
                    console.log (err)
                }
            })
        }
    })
}

let log = (req) => {
    let status

    switch (req.method) {
        case 'DELETE':
            status = 'удален'
            break
        case 'PUT':
            status = 'изменён' 
            break
        case 'POST':
            status = 'добавлен'
            break
        default:
            status = 'не понял я что произошло'
            break
    } 

    let result = {
        status: status,
        date: moment ().format ('YYYY-MM-DD h:mm:ss'),
        product: req.body.product
    }

    writeJsonFile (logfile, result)
}

module.exports = {
    log,
}