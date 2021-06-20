import { Dialogdata, Employee, User } from "../Model/employee.model";

export const ELEMENT_DATA: Employee[] = [
  {
    "_id": "60cdbdf3ceee3a945d74827d",
    "name": "Sosa Manning",
    "company": "FUTURIS",
    "address": "499 Montague Street, Fidelis, Rhode Island, 4464"
  },
  {
    "_id": "60cdbdf3707edb345577502d",
    "name": "Huff Roy",
    "company": "REALMO",
    "address": "568 Linden Boulevard, Chalfant, Utah, 5909"
  },
  {
    "_id": "60cdbdf33860c5b8c540718e",
    "name": "Reva Henderson",
    "company": "SLUMBERIA",
    "address": "987 Bragg Street, Day, Tennessee, 9282"
  },
  {
    "_id": "60cdbdf3ebfde9c270b5eabe",
    "name": "Norma Acevedo",
    "company": "POSHOME",
    "address": "543 Clark Street, Beechmont, Minnesota, 4976"
  },
  {
    "_id": "60cdbdf35079f4b968cf2b77",
    "name": "Edwards Morin",
    "company": "AFFLUEX",
    "address": "601 Saratoga Avenue, Nanafalia, Palau, 1295"
  }
]

export const DELETED_ELEMENT_DATA: Employee[] = [
  {
    "_id": "60cdbdf31fc6680c5d47d397",
    "name": "Laverne Cobb",
    "company": "ZUVY",
    "address": "559 Clifford Place, Loveland, Maryland, 954"
  },
  {
    "_id": "60cdbdf3847509b30c85a4c8",
    "name": "Alexander Kemp",
    "company": "ASIMILINE",
    "address": "923 Boerum Street, Crisman, Delaware, 8651"
  }
]

export const DialogData: Dialogdata[] = [
  {
    title: "Add",
    description: "",
    action: "Add"
  },
  {
    title: "Delete",
    description: "Employee details would be deleted.",
    action: "Delete"
  },
  {
    title: "Edit",
    description: "",
    action: "Edit"
  },
  {
    title: "Restore",
    description: "Deleted employee details would be restored.",
    action: "Restore"
  }
]

export const DeletedUsers: User[] = [
  {
    "id": 91,
    "name": "Samwell Tarly",
    "username": "sam",
    "email": "sam@april.biz",
    "address": {
      "street": "1486 Buena Vista Dr ",
      "suite": "Lake Buena Vista, FL",
      "city": " Lake Buena Vista, FL",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "HBO",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 92,
    "name": "Podrick Payne",
    "username": "pod",
    "email": "pod@melissa.tv",
    "address": {
      "street": "100 Avenue ",
      "suite": "Suite 879",
      "city": "NY 10036 USA",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Disney",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  }]
