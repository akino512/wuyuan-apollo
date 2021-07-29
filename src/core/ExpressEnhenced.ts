// import { Express } from "express-serve-static-core"
// import Mongo from "./Mongo";


// class ExpressEnhenced {
//     app: Express
//     constructor(app: Express) {
//         this.app = app
//     }
//     async post(uri: String, collection:String,fn: (request: Request) => void) {
//         const client = Mongo.getClient()
//         try {
//             await client.connect();
//             const database = client.db('apollo');
//             const todos = database.collection(collection);
//             this.app.post("", fn)

//         } finally {
//             await client.close()
//         }
//     }

// }