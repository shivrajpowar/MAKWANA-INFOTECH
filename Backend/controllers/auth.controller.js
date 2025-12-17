const db = require("../config/db");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");

const query = util.promisify(db.query).bind(db);

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1️⃣ Check if role exists
    const roleResult = await query("SELECT id FROM roles WHERE name = ?", [role]);
    if (!roleResult.length) return res.status(400).json({ message: "Invalid role" });

    const role_id = roleResult[0].id;

    // 2️⃣ Check if email exists
    const emailCheck = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (emailCheck.length) return res.status(400).json({ message: "Email already exists" });

    // 3️⃣ Hash password & insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    await query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role_id]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const users = await query(
      `SELECT u.id, u.name, u.email, u.password, r.name AS role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );

    if (!users.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await query(
      `SELECT u.id, u.name, u.email, r.name AS role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (!user.length) return res.status(404).json({ message: "User not found" });

    res.json({ user: user[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
