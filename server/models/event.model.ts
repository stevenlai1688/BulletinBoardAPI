import { Schema, model, Types } from 'mongoose';

export default class Event {
    constructor(public id: Types.ObjectId, public username: String, public firstname: String, public lastname: String, public date: Date, public description: String) {}
}