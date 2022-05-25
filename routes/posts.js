var express = require("express");
var router = express.Router();
const PostControllers = require("../controllers/posts");

// 取得所有貼文
router.get("/posts", PostControllers.getPosts);

// 取得單一貼文
router.get("/post/:id", PostControllers.getPost);

// 新增貼文
router.post("/post", PostControllers.createPost);

// 修改貼文
router.patch("/post/:id", PostControllers.updatePost);

// 刪除所有貼文
router.delete("/posts", PostControllers.delAllPosts);

// 刪除單一貼文
router.delete("/post/:id", PostControllers.delPost);

module.exports = router;
