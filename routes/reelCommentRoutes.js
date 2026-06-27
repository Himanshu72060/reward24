const express = require("express");

const router = express.Router();


const auth = require("../middleware/authMiddleware");


const {

    addComment,

    getComments,

    deleteComment

} = require("../controllers/reelCommentController");





// ==========================
// ADD COMMENT
// ==========================

router.post(

    "/",

    auth,

    addComment

);





// ==========================
// GET COMMENTS
// ==========================

router.get(

    "/:reelId",

    auth,

    getComments

);





// ==========================
// DELETE COMMENT
// ==========================

router.delete(

    "/:id",

    auth,

    deleteComment

);



module.exports = router;