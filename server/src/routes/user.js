const express = require("express");
const User = require("../models/User");
const { BadRequestError, AuthenticationError, NotFoundError } = require("../core/ApiErrors");
const bcrypt = require("bcrypt");
const ApiResponse = require("../core/ApiResponse");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middlewares/user");
const crypto = require("crypto");
const { default: Mailgun } = require("mailgun.js");
const MailgunClient = require("../lib/MailgunClient");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequestError("User with this email is already registered.");
  }

  const hash = await bcrypt.hash(password, 12);

  const newUser = new User({ email, password: hash, role });
  newUser.save();

  res
    .status(201)
    .json(
      ApiResponse.build(
        true,
        { email: newUser.email, role: newUser.role },
        "New user created successfully",
      ),
    );
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("This email id was not registered!");
  }

  //Comparing the Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Username or Password is incorrect!");
  }

  //JWT Token
  //Sing the Token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  res
    .status(200)
    .json(ApiResponse.build(true, { token }, "LoggedIn successfully."));
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password");
  console.log(user);
  return res.json(
    ApiResponse.build(
      true,
      { email: user.email, role: user.role },
      "User Received successfully",
    ),
  );
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invalid Email");
  }

  // generate and save the token to the user.
  const token = crypto.randomBytes(8).toString("hex");
  console.log(token);

  // We can hash the token and store so that if db is compromised, token value are not exposed.
  user.resetPasswordToken = token;
  user.resetPasswordExpiry = new Date().getTime() + 10 * 60 * 1000;

  await user.save();

  // generate password reset url
  const url = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;
  // console.log(url);

  const emailText = `Please click the following link, to reset your password ${url}`;
  // Send url via email to the user
  await MailgunClient.sendMail(user.email, "Reset Password", emailText );

  res
    .status(200)
    .json(
      ApiResponse.build(
        true,
        "reset password link sent",
        "Reset password link sent",
      ),
    );
});

router.post('/reset-password', async (req, res) => {
  const { password, token } = req.body;
  
  const user = await User.findOne( { resetPasswordToken: token });

  if(!user) {
    throw new NotFoundError('User not found.');
  }

  // If user is found, then token is valid. But need to check the expiry.
  if(new Date().getTime() > user.resetPasswordExpiry) {
    throw new BadRequestError('Token has expired');
  }

  // Hash the password and save into db.
  const newHash = await bcrypt.hash(password, 12);
  user.password = newHash;
  user.resetPasswordExpiry = null;
  user.resetPasswordToken = null;
  await user.save();


  res.status(200).json(ApiResponse.build(true, "Password reset successfully", "password reset successfully"));
});

module.exports = router;
