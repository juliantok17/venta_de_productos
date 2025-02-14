import UserRepository from "../repository/usuario.repository.js";
import UserDTO from "../dto/usuario.dto.js";

interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  password: string;
}

class UserService {
  async registerUser(data: Partial<IUser>): Promise<IUser> {
    const newUser: IUser = {
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      email: data.email ?? "",
      age: data.age ?? 0,
      password: ''
    };
    return await UserRepository.createUser(newUser);
  }

  async loginUser(email: string, password: string): Promise<IUser> {
    const user = await UserRepository.findUserByEmail(email);
    return user;
  } 
}

export default new UserService();