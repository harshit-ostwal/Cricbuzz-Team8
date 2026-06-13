/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 684b5f9c4f8a6c1234567890
 *         fullName:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: Harshit
 *             lastName:
 *               type: string
 *               example: Jain
 *         avatar:
 *           type: string
 *           example: https://cdn.example.com/avatar.jpg
 *         avatarPublicId:
 *           type: string
 *           example: profiles/avatar_123
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *
 *   post:
 *     tags:
 *       - Profile
 *     summary: Create profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Harshit
 *               lastName:
 *                 type: string
 *                 example: Jain
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *
 *   patch:
 *     tags:
 *       - Profile
 *     summary: Update profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Harshit
 *               lastName:
 *                 type: string
 *                 example: Jain
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
