const fs = require ('fs')
const handler = require ('./handler')
const express = require ('express')

const router = express.Router ()

router.get ('/', (req, res) => {
    fs.readFile ('./dist/server/db/cart2.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }  
    })
})

router.post ('/', (req, res) => {
    handler.handle (req, res)
})

router.put ('/:id', (req, res) => {
    handler.handle (req, res)
})

router.delete('/:id', (req, res) => {
    handler.handle (req, res)
})

module.exports = router
