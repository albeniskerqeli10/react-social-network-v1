"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = __importDefault(require("cloudinary"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var db_1 = __importDefault(require("./config/db"));
var commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
var postRoutes_1 = __importDefault(require("./routes/postRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config({
    path: './.env',
});
// define port
var PORT = process.env.PORT;
// initialize express
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
// initialize helmet to secure express app
app.use((0, helmet_1.default)());
//connect to db
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.default)();
// configure cloudinary
cloudinary_1.default.v2.config({
    cloud_name: 'social-network-101',
    api_key: '397828424674875',
    api_secret: 'ZRMnO8CC7-SY-kUOXU9sjGRRNNc',
});
// initialize cors
// Other Middlewares
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/', function (req, res) {
    res.send('<h1>Social Network API</h1>');
});
app.use('/posts', postRoutes_1.default);
app.use('/auth', userRoutes_1.default);
app.use('/comment', commentRoutes_1.default);
// initialize server
app.listen(PORT, function () {
    console.log("Server is running in port ".concat(PORT));
});
