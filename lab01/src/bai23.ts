interface Payment{
    pay(amount:number):void;
}
class CashPayment implements Payment{
    pay(amount:number):void{
        console.log(`Pay ${amount}$ in Cash`)
    }
}
class CardPayment implements Payment{
    pay(amount:number):void{
        console.log(`Pay ${amount}$ by Card`)
    }
}