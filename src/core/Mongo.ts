import { MongoClient } from "mongodb";
import fs from "fs"
export default class Mongo {
    static getClient():MongoClient {
        const config = fs.readFileSync("./src/core/config.json")
        const url = JSON.parse(config.toString()).connection_url
        return new MongoClient(url);
    }
}