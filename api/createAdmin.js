import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { Admin } from "./models/UserSchema.js";
import { connectDB } from "./db.js";


// Create Admin user
async function createAdmin(username, passwd) {
  try {
    const passwordsalt = await bcrypt.genSalt(5)
    const passwordhash = await bcrypt.hash(passwd, passwordsalt)

    const newAdmin = await new Admin({
      username,
      password: passwordhash
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

  const username = 'admin'
  const password = 'admin1234##'

  await createAdmin(username, password)
}

main();