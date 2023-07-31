const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const cors = require("cors");

mongoDB();

// Set up CORS to allow requests from your updated frontend URL
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://sameer-mern-app.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// More CORS setup
app.use(
  cors({
    origin: "https://sameer-mern-app.netlify.app/",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
