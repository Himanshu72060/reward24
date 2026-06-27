// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();


// const connectDB = require("./config/db");

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/tasks", require("./routes/taskRoutes"));

// app.use("/api/categories", require("./routes/categoryRoutes"));

// app.use("/api/campaigns", require("./routes/campaignRoutes"));

// app.use("/api/admin", require("./routes/adminRoutes"));

// app.use("/api/surveys", require("./routes/surveyRoutes"));

// app.use(
//     "/api/games",
//     require(
//         "./routes/gameRoutes"
//     )
// );

// app.use(
//     "/api/microoffers",
//     require(
//         "./routes/microOfferRoutes"
//     )
// );

// app.use(
//     "/api/upload",
//     require("./routes/uploadRoutes")
// );

// app.use(
//     "/api/rewards",
//     require("./routes/rewardRoutes")
// );

// app.use(
//     "/api/earnings",
//     require("./routes/earningRoutes")
// );

// app.use(
//     "/api/reels",
//     require("./routes/reelRoutes")
// );

// app.use(
//     "/api/auth",
//     require("./routes/authRoutes")
// );

// app.use(
//     "/api/stores",
//     require("./routes/storeRoutes")
// );

// app.use(
//     "/api/leaderboards",
//     require(
//         "./routes/leaderboardRoutes"
//     )
// );

// app.use(
//     "/api/challenges",
//     require("./routes/challengeRoutes")
// );

// app.use(
//     "/api/daily-rewards",
//     require("./routes/dailyRewardRoutes")
// );

// app.use(
//     "/api/referearn",
//     require("./routes/referEarnRoutes")
// );

// app.use(
//     "/api/leaderboard-categories",
//     require(
//         "./routes/leaderboardCategoryRoutes"
//     )
// );

// app.use(
//     "/api/scratch-rewards",
//     require(
//         "./routes/scratchRewardRoutes"
//     )
// );

// app.use(
//     "/api/userprofiles",
//     require(
//         "./routes/userProfileRoutes"
//     )
// );

// app.use(
//     "/api/support",
//     require(
//         "./routes/supportRoutes"
//     )
// );

// app.use(
//     "/api/notifications",
//     require(
//         "./routes/notificationRoutes"
//     )
// );

// app.use(
//     "/api/task-partners",
//     require(
//         "./routes/taskPartnerRoutes"
//     )
// );

// app.use(
//     "/api/partner-details",
//     require(
//         "./routes/partnerDetailRoutes"
//     )
// );

// app.use(
//     "/api/giftcards",
//     require(
//         "./routes/giftCardRoutes"
//     )
// );

// app.use(
//     "/api/user-stats",
//     require(
//         "./routes/userStatsRoutes"
//     )
// );

// app.use(
//     "/api/network",
//     require(
//         "./routes/networkRoutes"
//     )
// );

// app.use(
//     "/api/transactions",
//     require(
//         "./routes/transactionRoutes"
//     )
// );

// app.use(
//     "/api/promo-banners",
//     require(
//         "./routes/promoBannerRoutes"
//     )
// );

// app.use(
//     "/api/featured-task-banners",
//     require(
//         "./routes/featuredTaskBannerRoutes"
//     )
// );

// app.use(
//     "/api/campaign-details",
//     require(
//         "./routes/campaignDetailRoutes"
//     )
// );

// app.use(
//     "/api/redeem-options",
//     require(
//         "./routes/redeemOptionRoutes"
//     )
// );

// app.use("/api/ad-config", require("./routes/adConfigRoutes"));


// app.use(
//     "/api/spin",
//     require("./routes/spinRoutes")
// );

// app.use(
//     "/api/redeem",
//     require("./routes/redeemRoutes")
// );

// app.use(
//     "/api/withdraw",
//     require("./routes/withdrawRoutes")
// );

// app.use("/api/upi",require("./routes/upiRoutes"));
// app.use("/api/daily-streak",require("./routes/dailyStreakRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes"));
// app.use("/api/wallet", require("./routes/walletRoutes"));

// app.get("/", (req, res) => {
//     res.send("API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server Running ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();


const connectDB = require("./config/db");

connectDB();


const app = express();


// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());





// ==========================
// ROUTES
// ==========================


app.use("/api/tasks", require("./routes/taskRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/campaigns", require("./routes/campaignRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/surveys", require("./routes/surveyRoutes"));

app.use(
    "/api/streak",
    require("./routes/earningRoutes")
);

app.use(
    "/api/games",
    require("./routes/gameRoutes")
);



app.use(
    "/api/microoffers",
    require("./routes/microOfferRoutes")
);



app.use(
    "/api/upload",
    require("./routes/uploadRoutes")
);



app.use(
    "/api/rewards",
    require("./routes/rewardRoutes")
);



app.use(
    "/api/earnings",
    require("./routes/earningRoutes")
);



// ==========================
// REELS MODULE
// ==========================


app.use(
    "/api/reels",
    require("./routes/reelRoutes")
);


app.use(
    "/api/reels/watch",
    require("./routes/reelWatchRoutes")
);


app.use(
    "/api/reels/like",
    require("./routes/reelLikeRoutes")
);


app.use(
    "/api/reels/comment",
    require("./routes/reelCommentRoutes")
);


app.use(
    "/api/reels/save",
    require("./routes/reelSaveRoutes")
);



// ==========================
// COINS
// ==========================


app.use(
    "/api/coins",
    require("./routes/coinRoutes")
);





app.use(
    "/api/auth",
    require("./routes/authRoutes")
);



app.use(
    "/api/stores",
    require("./routes/storeRoutes")
);



app.use(
    "/api/leaderboards",
    require("./routes/leaderboardRoutes")
);



app.use(
    "/api/challenges",
    require("./routes/challengeRoutes")
);



app.use(
    "/api/daily-rewards",
    require("./routes/dailyRewardRoutes")
);



app.use(
    "/api/referearn",
    require("./routes/referEarnRoutes")
);



app.use(
    "/api/leaderboard-categories",
    require("./routes/leaderboardCategoryRoutes")
);



app.use(
    "/api/scratch-rewards",
    require("./routes/scratchRewardRoutes")
);



app.use(
    "/api/userprofiles",
    require("./routes/userProfileRoutes")
);



app.use(
    "/api/support",
    require("./routes/supportRoutes")
);



app.use(
    "/api/notifications",
    require("./routes/notificationRoutes")
);



app.use(
    "/api/task-partners",
    require("./routes/taskPartnerRoutes")
);



app.use(
    "/api/partner-details",
    require("./routes/partnerDetailRoutes")
);



app.use(
    "/api/gift-cards",
    require("./routes/giftCardRoutes")
);



app.use(
    "/api/user-stats",
    require("./routes/userStatsRoutes")
);



app.use(
    "/api/network",
    require("./routes/networkRoutes")
);



app.use(
    "/api/transactions",
    require("./routes/transactionRoutes")
);



app.use(
    "/api/promo-banners",
    require("./routes/promoBannerRoutes")
);



app.use(
    "/api/featured-task-banners",
    require("./routes/featuredTaskBannerRoutes")
);



app.use(
    "/api/campaign-details",
    require("./routes/campaignDetailRoutes")
);



app.use(
    "/api/redeem-options",
    require("./routes/redeemOptionRoutes")
);



app.use(
    "/api/ad-config",
    require("./routes/adConfigRoutes")
);



app.use(
    "/api/spin",
    require("./routes/spinRoutes")
);



app.use(
    "/api/redeem",
    require("./routes/redeemRoutes")
);



app.use(
    "/api/withdraw",
    require("./routes/withdrawRoutes")
);



app.use(
    "/api/upi",
    require("./routes/upiRoutes")
);



app.use(
    "/api/daily-streak",
    require("./routes/dailyStreakRoutes")
);



app.use(
    "/api/payment",
    require("./routes/paymentRoutes")
);



app.use(
    "/api/wallet",
    require("./routes/walletRoutes")
);





// ==========================
// TEST API
// ==========================

app.get("/", (req, res) => {

    res.send("Reward24 API Running");

});





const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {


    console.log(
        `Server Running ${PORT}`
    );


});