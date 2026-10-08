import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { changePassword } from "../controllers/userControllers/changePassword.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { testWhatsApp } from "../controllers/whatsappControllers/testWhatsApp.js";
import { sendWhatsAppMessage } from "../controllers/whatsappControllers/sendWhatsAppMessage.js";
import { sendHelloWorldWhatsApp } from "../controllers/whatsappControllers/sendHelloWorldWhatsApp.js";

const router = Router();

//POST
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").post(changePassword);
router.route("/logout").post(authMiddleware, logoutUser);

router.route("/test-whatsapp").get(testWhatsApp);
router.route("/send-whatsapp").post(sendWhatsAppMessage);
router.route("/send-hello-world").post(sendHelloWorldWhatsApp);

export default router;