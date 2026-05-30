const express =
    require("express");

const router =
    express.Router();

const {

    createNotification,

    getNotifications,

    getSingleNotification,

    updateNotification,

    deleteNotification

} = require(
    "../controllers/notificationController"
);

router.post(
    "/",
    createNotification
);

router.get(
    "/",
    getNotifications
);

router.get(
    "/:id",
    getSingleNotification
);

router.put(
    "/:id",
    updateNotification
);

router.delete(
    "/:id",
    deleteNotification
);

module.exports =
    router;