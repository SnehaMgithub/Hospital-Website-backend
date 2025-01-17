import express from "express";
import { approvePost, createPost, deletePost, getPost,getUnapprovedPost  } from "../Controllers/postController.js";
import { adminMiddleware, authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create",authMiddleware ,createPost)
router.patch("/:id/approve",authMiddleware,adminMiddleware,approvePost)
router.delete("/delete/:id",authMiddleware,adminMiddleware,deletePost)
router.get("/getpost",getPost)
router.get("/unapprovedpost",authMiddleware,adminMiddleware,getUnapprovedPost)


export default router;