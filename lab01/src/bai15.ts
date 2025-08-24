export class Book{
    ten:string;
    constructor(ten:string){
        this.ten=ten
    }
}
export class User{
    id:string;
    constructor(id:string){
        this.id=id
    }
}
export class Library{
    books:Book[]=[]
    users:User[]=[]
    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Sach "${book.ten}" duoc them vao thu vien`);
    }
}