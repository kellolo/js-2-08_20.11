const express = require ('express')
const fs = require ('fs')
const handler = require ('./handler')

const router = express.Router ()

router.get('/', (req, res) => {
    fs.readFile('dist/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post ('/', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'add', file)
})

router.put ('/:id', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'modify', file)
})

router.delete ('/:id', (req, res) => {
    let file = 'dist/server/db/userCart.json'
    handler (req, res, 'remove', file)
})

module.exports = router