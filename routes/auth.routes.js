import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import config from "config";
import { check, validationResult } from "express-validator";
import Jwt from "jsonwebtoken";

const router = Router();
router.post(
  "/register",
  [
    check("email", "Wrong email").isEmail(),
    check("password", "Min length of password is 6 symbols").isLength({
      min: 6,
    })
  ],
  async (req, res) => {
    try {
      // console.log('Body:', req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res.status(400).json({ message: "User existed" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User was created" });
    } catch (e) {
      res.status(500).json({ message: "Something going wrong, try again" });
    }
  }
);
router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: " User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password, try again" });
      }

      const token = Jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({token, userId: user.id})
    } catch (e) {
      res.status(500).json({ message: "Something going wrong, try again" });
    }
  }
);

export default router;
