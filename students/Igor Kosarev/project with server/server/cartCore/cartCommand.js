const fs = require('fs');
const event = require('./cartEvent');

class Event {
  constructor(action, payload) {
    this.action = action
    this.event = payload
  }
}

// let createEvent = (req, res, action) => {
//   return new Promise(function(resolve, reject) {
//       let event = new Event(action, req)
//       resolve(event)
//     })
//     .then(event => {
//       fs.readFile('db/events/events.json', 'utf-8', (err, data) => {
//         if (err) {
//           console.log("ComandHandler can not write events")
//             //res.sendStatus(404, JSON.stringify({ result: 0 }))
//         } else {
//           let events = JSON.parse(data)
//           events.push(event)
//           fs.writeFile("db/events/events.json", JSON.stringify(events), function(err) {
//             if (err) {
//               console.log("ComandHandler can not write events")
//                 //res.sendStatus(404, JSON.stringify({ result: 0 }))
//             }
//           })
//         }
//       })
//     })
//     .then(() => event.createAggregate())
//     //.then(() => res.sendStatus(200, JSON.stringify({ result: 1 })))
// }

let createEvent = (req, res, action) => {
  return new Promise(function(resolve, reject) {
      let event = new Event(action, req)
      resolve(event)
    })
    .then(event => {
      fs.readFile('db/events/events.json', 'utf-8', (err, data) => {
        if (err) {
          console.log("ComandHandler can not read existing events")
          res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
          let events = JSON.parse(data)
          events.push(event)
          fs.writeFileSync("db/events/events.json", JSON.stringify(events))
        }
      })
    })
    .then(() => {
      //console.log("_______________")
      //console.log("Создаём агрегат")
      setTimeout(() => event.createAggregate(), 1000); //!костыли из-за отсутствия реальнйо ДБ
    })
    .then(() => res.sendStatus(200, JSON.stringify({ result: 1 })))
}

module.exports = {
  createEvent
}