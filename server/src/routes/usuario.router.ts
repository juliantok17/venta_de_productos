import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/usuario.controller"; 

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);      
router.get("/logout", logoutUser); 