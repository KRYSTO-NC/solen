import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import options from "./data/options.js";
import installations from "./data/installations.js";
import User from "./models/userModel.js";
import Installation from "./models/installationModel.js";
import Intervention from "./models/interventionModel.js";
import MaintenanceContract from "./models/maintenanceContractModel.js";
import TypeInstallation from "./models/typeInstallationModel.js";
import Option from "./models/optionModel.js";



import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Installation.deleteMany();
    await Intervention.deleteMany();
    await MaintenanceContract.deleteMany();
    await TypeInstallation.deleteMany();
    await Option.deleteMany();


    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    
    const sampleInstallations = installations.map((installation) => {
      return { ...installation, createdBy: adminUser };
    });
    
    for (const installation of sampleInstallations) {
      const newInstallation = new Installation(installation);
      await newInstallation.save();
    }

    await Option.insertMany(options);
    
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Installation.deleteMany();
    await Intervention.deleteMany();
    await MaintenanceContract.deleteMany();
    await TypeInstallation.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
