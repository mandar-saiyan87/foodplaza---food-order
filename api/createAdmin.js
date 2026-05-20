import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { Admin } from "./models/UserSchema.js";
import { connectDB } from "./db.js";
import dotenv from 'dotenv';
// import dns from 'dns'

// dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config();


// Create Admin user
async function createAdmin(username, passwd) {
  try {
    const passwordsalt = await bcrypt.genSalt(5)
    const passwordhash = await bcrypt.hash(passwd, passwordsalt)

    const newAdmin = await new Admin({
      username,
      password: passwordhash,
      role: "admin"
    })
    await newAdmin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Main Function to create user
async function main() {
  await connectDB()

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  await createAdmin(username, password)
}

main();