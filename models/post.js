const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "貼文姓名 未填寫"],
    },
    tags: {
      type: String,
      required: [true, "貼文標籤 未填寫"],
    },
    type: {
      type: String,
      // enum 只能填以下字串
      enum: ["group", "person"],
      required: [true, "貼文類型 未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: [true, "貼文內容 未填寫"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
