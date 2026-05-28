const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/campaigns", require("./routes/campaignRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/surveys", require("./routes/surveyRoutes"));

app.use(
    "/api/games",
    require(
        "./routes/gameRoutes"
    )
);

app.use(
    "/api/microoffers",
    require(
        "./routes/microOfferRoutes"
    )
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

app.use(
    "/api/reels",
    require("./routes/reelRoutes")
);

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/store-categories",
    require(
        "./routes/storeCategoryRoutes"
    )
);

app.use(
    "/api/leaderboards",
    require(
        "./routes/leaderboardRoutes"
    )
);

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`);
});