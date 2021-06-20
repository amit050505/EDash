import { Injectable } from '@angular/core';
import { User } from '../Model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  users: User[] = [];
  deletedUsers: User[] = [];

  constructor() { }

  updateUsers(_users: User[]) {
    this.users.length = 0;
    this.users = _users;
  }
  deleteUser(id: string) {
    let index = this.users.findIndex(i => i.id.toString() === id.toString());

    if (index > -1) {
      const deleted: User = this.users[index];
      this.users.splice(index, 1);
      this.deletedUsers.push(deleted);
    }
  }

  restoreUser(id: string) {
    let index = this.deletedUsers.findIndex(i => i.id.toString() === id.toString());
    if (index > -1) {
      const restored: User = this.deletedUsers[index];
      this.deletedUsers.splice(index, 1);
      this.users.push(restored);
    }
  }
  getUsers(): User[] {
    return this.users;
  }
  addUser(user: User) {
    return this.users.push(user);
  }
  updateUser(id: string, user:User) {
    const index = this.users.findIndex(item=> item.id.toString() == id.toString())
    debugger;
    this.users[index].name = user.name;
    this.users[index].company = user.company;
    this.users[index].address = user.address;
    
  }
  getUser(id: string) {
    const index = this.users.findIndex(item=> item.id.toString() == id.toString())
    return this.users[index];
  }

}
