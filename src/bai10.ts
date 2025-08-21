export class Account{
    readonly id:string;
    public userName:string;
    private balance:string;
    constructor(id:string,userName:string,balance:string){
        this.id=id;
        this.balance=balance;
        this.userName=userName
    }
}