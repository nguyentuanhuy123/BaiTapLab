"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    withdraw(money) {
        if (money > this.balance) {
            return "withdraw unsuccessfull";
        }
        else {
            return "withdraw successfull balance: " + (this.balance - money);
        }
    }
    deposit(money) {
        return "deposit successfull balance: " + (this.balance + money);
    }
}
exports.BankAccount = BankAccount;
