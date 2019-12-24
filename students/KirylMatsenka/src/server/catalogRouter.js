const express = require ('express')
const fs = require ('fs')

const router = express.Router ()

router.get ('/', (req, res) => {
    fs.readFile('./dist/server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

module.exports = router