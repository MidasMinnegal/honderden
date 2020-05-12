import {Rooms} from '../collections/rooms'
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('rooms', (roomId) =>
    Rooms.find({roomId})
  )
}
