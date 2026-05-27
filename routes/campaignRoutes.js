const express = require("express");

const router = express.Router();

const {
    createCampaign,
    getCampaigns,
    getSingleCampaign,
    updateCampaign,
    deleteCampaign
} = require("../controllers/campaignController");

router.post("/", createCampaign);

router.get("/", getCampaigns);

router.get("/:id", getSingleCampaign);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

module.exports = router;