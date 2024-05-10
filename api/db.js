import mongoose from "mongoose";
import { config } from "dotenv";


config()
let { MONGODB_PASSWD } = process.env
const MongoDBURI = `mongodb+srv://foodplazaAdmin:${MONGODB_PASSWD}@cluster0.abkynuf.mongodb.net/foodplazaDB?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectDB() {
  try {
    const connection = await mongoose.connect(MongoDBURI)
    // console.log(connection)
    if (connection) { 
      console.log('Database Connected')
    }
  } catch (error) {
    console.error(error)
  }

}

