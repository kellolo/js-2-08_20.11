const command = require('./cartCommand');
const query = require('./cartQuery');
const event = require('./cartEvent');


let get = (req, res) => {
  query.get(req, res)
}

let getHystory = (req, res) => {
  query.getHystory(req, res)
}

let aggregate = () => {
  event.createAggregate()
}

let createEvent = (req, res, action) => {
  command.createEvent(req, res, action)
}

module.exports = {
  get,
  getHystory,
  aggregate,
  createEvent
}