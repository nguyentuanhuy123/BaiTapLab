"use strict";
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    work() {
        console.log(this.name);
    }
    getSalary() {
        return this.salary;
    }
}
class Manager extends Employee {
    constructor(name, salary) {
        super(name, salary);
    }
    manageTeam() {
        console.log(this.name);
    }
}
class Developer extends Employee {
    constructor(name, salary, programmingLanguage) {
        super(name, salary);
        this.programmingLanguage = programmingLanguage;
    }
    writeCode() {
        console.log(this.name);
    }
}
