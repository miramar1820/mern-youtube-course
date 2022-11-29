import express from "express";
import config from "config";
import mongoose from "mongoose";
import apiAuth from "./routes/auth.routes.js";
import apiLink from "./routes/link.routes.js";
import apiRedirect from "./routes/redirect.routes.js";
import path from "path";
// import cors from 'cors'

const app = express();

app.use(express.json({ extended: true }));

// app.use(cors())

app.use("/api/auth", apiAuth);
app.use("/api/link", apiLink);
app.use("/t", apiRedirect);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

(async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
})();

//start();
