import "./loadEnvironment";
import connectDB from "./database";
import startServer from "./server/startServer";
import noSleepMode from "./utils/noSleepMode";

const port = +(process.env.PORT ?? 3500);

const mongoUrl = process.env.MONGO_DB;

(async () => {
  try {
    noSleepMode();
    await connectDB(mongoUrl);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
