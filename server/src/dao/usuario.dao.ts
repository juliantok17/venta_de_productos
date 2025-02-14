import UserModel, { IUser } from "./models/usuario.js";

class UserDAO {
  async createUser(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }

  async findUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean<IUser>();
  }
}

export default new UserDAO();