import "./loadEnvironment";
import connectDB from "./database";
import startServer from "./server/startServer";

const port = +(process.env.PORT ?? 3500);

const mongoUrl = process.env.MONGO_DB;

(async () => {
  try {
    await connectDB(mongoUrl);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
