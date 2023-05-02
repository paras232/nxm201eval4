const {Router } = require("express");
const { authenticator } = require("../middlewares/auth");
const getIPdata = require("../controllers/ipcontroler");
const redisLimiter = require("../middlewares/redislimit");

const cityRouter = Router();

cityRouter.get("/:city",authenticator,getIPdata);

module.exports = cityRouter;