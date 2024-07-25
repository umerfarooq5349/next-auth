import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGOSE_URL!);
    console.log("DB connected");

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`DB is connected`);
    });

    connection.on("error", (err) => {
      console.log(`DB connection error: ${err}`);
      process.exit(1); // Exit the process with a failure code
    });
  } catch (error) {
    console.log("Something went wrong while connecting to the DB");
    console.log(error); // Log the actual error
  }
}
