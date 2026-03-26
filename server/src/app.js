
const express = require("express");
const moviesRoutes = require("./routes/movies");
const userRouter = require("./routes/user");
const theatreRouter = require('./routes/theatres');
const screeningRouter = require('./routes/screening');
const bookingRouter = require('./routes/bookings');
const paymentRouter = require('./routes/payments');
const cors = require("cors");
const { ApiError } = require('./core/ApiErrors');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
); // It allows the request from cross origin

app.use(moviesRoutes);
app.use(userRouter);
app.use(theatreRouter);
app.use(screeningRouter);
app.use(bookingRouter);
app.use(paymentRouter);

//Global Exception handler
app.use((err, req, res, next) => {
  if(err instanceof ApiError) {
    const { status = 500, message = "Something went wrong" } = err;
    return res.status(status).json({ success: false, message });
  }
  return res.status(500).json({ success: false, message: "Something went wrong!"});
});

module.exports = app;
