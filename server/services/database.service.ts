// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { Events?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    if (process.env.DB_CONN_STRING === undefined){
        return undefined;
    }
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    if (process.env.COLLECTION_NAME === undefined){
        return undefined;
    }

    const eventsCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);

    collections.Events = eventsCollection;
    
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${eventsCollection.collectionName}`);
 }