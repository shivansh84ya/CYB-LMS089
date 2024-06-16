require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const ErrorHandler = require('./middlewares/ErrorHandling');
const studentRoutes = require("./Routes/studentRoutes")
const authRoutes = require('./Routes/authRoutes');
const courseRoutes = require('./Routes/courseRoutes');
const instructor = require('./Routes/instructorRoutes')
const app = express();
const PORT = process.env.PORT || 5000;
const cors= require("cors");
const bodyParser = require("body-parser")

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v2', studentRoutes);
app.use('/api/v2', instructor);
app.use('/api/auth', authRoutes);
app.use('/api/v2', courseRoutes); 


app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
