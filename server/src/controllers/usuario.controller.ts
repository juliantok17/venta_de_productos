import { Request, Response } from "express";
import UserService from "../services/usuario.service";

interface IUser{
    id: string,
    email: string,
    password?: string
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: IUser = await UserService.registerUser(req.body);
      res.status(201).json({ success: true, message: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      res.status(400).json({ success: false, message: "Error al registrar usuario" });
    }
  };
  
  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const user: IUser = await UserService.loginUser(req.body.email, req.body.password);
      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        user
        })
    } catch (error) {
      console.error("Error en el proceso de login", error);
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  };
  
  export const logoutUser = (req: Request, res: Response): void => {
    res.status(200).json({ success: true, message: "Cierre de sesión exitoso" });
};