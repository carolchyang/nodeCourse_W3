const handleSuccess = require("../service/handleSuccess");
const handleErrors = require("../service/handleErrors");
const Post = require("../models/post");
const User = require("../models/user");

const PostControllers = {
  async getPosts(req, res) {
    const posts = await Post.find();
    handleSuccess(res, posts);
  },
  async getPost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id });

      if (post) {
        handleSuccess(res, post);
      } else {
        handleErrors(res, "查無此貼文");
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async createPost(req, res) {
    try {
      const { name, tags, type, image, content, likes, comments } = req.body;

      /* 
      建議在 POST 新增貼文及 PATCH 更新貼文時新增判斷確認 content 欄位
      或其他必填欄位是否為空值，例如 if (!data.content) { ... }，
      Model 為寫入資料庫前最後一道驗證，
      比較會建議在 Controller 先驗證阻擋錯誤，
      且建議對 content 加上 .trim() 避免使用者傳送空白內容
      */
      if (!content.trim()) {
        handleErrors(res, err);
      } else {
        const newPost = await Post.create({
          name,
          tags,
          type,
          image,
          content,
          likes,
          comments,
        });
        handleSuccess(res, newPost);
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async updatePost(req, res) {
    try {
      const { _id, name, tags, type, image, content, likes, comments } =
        req.body;
      const { id } = req.params;
      const isExist = User.findById(_id).exec(); // 如果找不到就是 null

      if (isExist == null && !content.trim()) {
        handleErrors(res, err);
      } else {
        const newPost = await Post.findByIdAndUpdate(
          id,
          {
            name,
            tags,
            type,
            image,
            content,
            likes,
            comments,
          },
          {
            // 回傳更新後的值
            new: true,
            // 使 findByIdAndUpdate 跑 Schema 驗證規則
            runValidators: true,
          }
        );
        handleSuccess(res, newPost);
      }

      /**
       PATCH 更新貼文時若傳送 { } 或空資料 ( 沒有 body 內容 )，建議回傳錯誤訊息。

      * 3. PATCH 更新單筆資料時若 id 的內容很類似
      * ( 例如有一筆資料 _id: "62676ae5ad81fbfb638ac270"，
      * 若改成 _id: "62676ae5ad81fbfb638ac271" 結尾數字不同 )，
      * 但資料庫實際卻沒有這筆 id，mongoose 會回傳 null 而非錯誤訊息，
      * 可以嘗試針對此情況加入判斷自訂錯誤訊息。
      */
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async delAllPosts(req, res) {
    await Post.deleteMany({});
    handleSuccess(res, []);
  },
  async delPost(req, res) {
    try {
      const { id } = req.params;

      const delPost = await Post.findByIdAndDelete(id, {
        // 回傳刪除的值
        new: true,
      });

      if (delPost) {
        handleSuccess(res, delPost);
      } else {
        handleErrors(res, "查無此貼文");
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
};

module.exports = PostControllers;
