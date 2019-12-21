const fs = require('fs');
let get = (req, res) => {
  fs.readFile('db/aggregates/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 })).end
    } else(
      res.send(data).end
    )
  })
}

let getHystory = (req, res) => {
  fs.readFile('db/events/events.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 })).end
    } else(
      res.send(data).end
    )
  })
}

module.exports = {
  get,
  getHystory
}