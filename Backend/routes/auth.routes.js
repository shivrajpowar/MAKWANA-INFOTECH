const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [admin, user, subuser]
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       400:
 *         description: Validation error or duplicate email
 *       500:
 *         description: Server error
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt_token_here"
 *               user:
 *                 id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: user
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/signin", authController.signin);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get logged-in user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/profile", auth, authController.profile);

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     tags: [Auth]
 *     summary: Admin only access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *         content:
 *           application/json:
 *             example:
 *               message: Admin access
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get("/admin", auth, role("admin"), (req, res) => {
  res.json({ message: "Admin access" });
});

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     tags: [Auth]
 *     summary: User or SubUser access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User/SubUser access granted
 *         content:
 *           application/json:
 *             example:
 *               message: User/SubUser access
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get("/user", auth, role(["user","subuser"]), (req, res) => {
  res.json({ message: "User/SubUser access" });
});

module.exports = router;
