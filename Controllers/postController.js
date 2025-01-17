
import Post from "../Models/postSchema.js";
import dotenv from "dotenv";

dotenv.config();

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { name, email, phone, date, doctor, department, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !doctor || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Post({
      name,
      email,
      phone,
      date,
      doctor,
      department,
      message,
    });
    await newAppointment.save();
    res.status(200).json({ message: "Post Created Successfully", data: newAppointment });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Approve a post
// export const approvePost = async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );
//     res.status(200).json({ message: "Post Approved Successfully", data: post });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const approvePost = async (req, res) => {
  try {
    const appointments = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Appointments fetched successfully", data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

     

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get approved posts
export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({ approved: true }).populate("user", "name");
    res.status(200).json({ message: "Posts Fetched Successfully", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get unapproved posts
export const getUnapprovedPost = async (req, res) => {
  try {
    const posts = await Post.find({ approved: false }).populate("user", "name");
    res.status(200).json({ message: "Unapproved Posts Fetched Successfully", posts });
  } catch (error) {
    console.error("Error fetching unapproved posts:", error);
    res.status(500).json({ message: error.message });
  }
};
