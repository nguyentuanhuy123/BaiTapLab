export class BankAccount{
    balance:number;
    constructor(balance:number){
        this.balance=balance;
    }
    withdraw(money:number){
        if(money>this.balance){
            return "withdraw unsuccessfull";
        }else{
            return "withdraw successfull balance: "+ (this.balance-money);
        }
    }
    deposit(money:number){
        return "deposit successfull balance: "+ (this.balance+money);
    }
}