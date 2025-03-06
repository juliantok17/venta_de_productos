interface IUser {
    _id: string;       
    first_name: string;
    last_name: string;
    email: string;
    age: number;
  }
  
  class UserDTO {
    public id: string;  
    public firstName: string;
    public lastName: string;
    public email: string;
    public age: number;
  
    constructor(user: IUser) {
      this.id = user._id;
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.email = user.email;
      this.age = user.age;
    }
  }
  
  export default UserDTO;