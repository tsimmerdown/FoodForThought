import User from "../models/userModel.js";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const checkPass = await bcyrpt.compare(password, existingUser.password);
    //check if email exists and password is correct
    if (!existingUser || !checkPass) {
      res.status(400).json({ message: "Incorrect Password or Email" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET_WORD,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists. Please use a different email.",
      });
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPass = await bcyrpt.hash(password, 12);

    const newUser = User.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPass,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.SECRET_WORD,
      { expiresIn: "1h" }
    );
    console.log(newUser);
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
