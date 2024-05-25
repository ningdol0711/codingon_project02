const express = require("express");
const router = express.Router();
const controller = require("../controller/MainController");

router.get("/", controller.main);
router.get("/circuits", controller.circuits);
router.get("/circuit", controller.circuit);
router.get("/teams", controller.teams);
router.get("/team", controller.team);
router.get("/driver", controller.driver);
router.get("/mypage", controller.mypage);
router.get("/social", controller.social);

router.post("/login", controller.userLogin);
router.post("/register", controller.userRegister);
router.post("/logout", controller.userLogout);
router.post("/updateUser", controller.updateUser);

module.exports = router;
