
import { Person } from "./bai1";
import { Student } from "./bai2";
import { Car } from "./bai3";
import { Rectangle } from "./bai4";
import { BankAccount } from "./bai5";
import { Product } from "./bai8";
import { Library, Book } from "./bai15";
import { Logger } from "./bai17";
let person=new Person("Nguyen Van A",24);
let student=new Student("Pham Van B",29,9);
let car=new Car("Suzuki","G934293",2020);
let rec=new Rectangle(15,80);
let acc=new BankAccount(900);
let p1=new Product("Mouse",50);
let p2=new Product("Keyboard",120);
let p3=new Product("Monitor",200);
let plist=[p1,p2,p3];
let book=new Book("fdsfds")
let library=new Library()
let logger1 = Logger.getInstance();
let logger2 = Logger.getInstance();

console.log("bai1:")
  console.log(person);
console.log("bai2:")
  console.log(student);
console.log("bai3:")
  console.log(car);
console.log("bai4:")
  console.log(rec.calculateArea());
  console.log(rec.calculatePerimeter());
console.log("bai5:")
  console.log(acc);
  console.log(acc.withdraw(50));
  console.log(acc.deposit(80));
console.log("bai8:")
  console.log(plist.filter(p=>p.price>100));
console.log("bai15:")
  library.addBook(book)
console.log("bai17:")
  logger1.log("ung dung bat dau");
  logger2.log("log khac");
  console.log("cung 1 instance?", logger1 === logger2);

  