const express = require ('express')
const handler = require ('./handler')
const fs = require ('fs')

const router = express.Router ()

router.get ('/', (req, res) => {
    fs.readFile ('dist/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})


router.post ('/', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'add', file)
}) 

router.put ('/:id', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'change', file)
}) 


router.delete ('/:id', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'del', file)
}) 

module.exports = router