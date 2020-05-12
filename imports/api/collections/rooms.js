import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {defaultDeck} from "../static/defaultDeck"

export const Rooms = new Mongo.Collection('rooms');


Meteor.methods({
  "rooms.insert"({title, author}) {

    check(title, String)
    check(author, String)
    const deck = defaultDeck;
    const randomNumber = Math.floor(Math.random() * defaultDeck.length)
    const drawnCard = deck.splice(randomNumber, 1)[0];
    return Rooms.insert({
      title,
      deck: deck,
      people: [],
      lastCard: drawnCard,
      author,
      turn: 0,
      direction: 1
    })
  },
  "rooms.join"({id, name}) {
    check(id, String)
    check(name, String)

    Rooms.update({ _id: id },{ $push: { people: {
      name,
      cards: []
    }}})
  },
  "rooms.drawCard"({id, name}) {
    check(id, String)
    check(name, String)
    const room = Rooms.findOne({_id: id})

    if (room?.deck.length > 0) {
      const randomNumber = Math.floor(Math.random() * room.deck.length)
      const drawnCard = room.deck.splice(randomNumber, 1)[0];
      room.people.find(({name: n}) => n === name).cards.push(drawnCard);

      Rooms.update({_id: id}, {$set: room})
    }
  },
  "rooms.playCard"({id, name, card}) {
    check(id, String)
    check(name, String)
    check(card, Object)
    const room = Rooms.findOne({_id: id})

    if(room) {
      const indexOfPerson = room.people.map(({name}) => name).indexOf(name);
      const newCards = room
        .people[indexOfPerson]
        .cards
        .filter(cardO => !(card.value === cardO.value && card.type === cardO.type))

      if(card.value === 'H') room.direction *= -1

      const nextTurn = room.turn + room.direction;

      if(nextTurn >= room.people.length) {
        room.turn = 0;
      } else if (nextTurn < 0) {
        room.turn = room.people.length -1;
      } else {
        room.turn = nextTurn
      }

      room.people[indexOfPerson].cards = newCards;
      room.lastCard = card

      Rooms.update({_id: id}, {$set: room})
    }
  }
})
