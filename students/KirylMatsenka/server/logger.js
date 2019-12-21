const fs = require ('fs')
const logfile = 'server/db/stats.json'

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
    let date = new Date ()

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
        date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
         + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        product: req.body
    }

    writeJsonFile (logfile, result)
}

module.exports = {
    log,
}