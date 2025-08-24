class Employee {
  name: string;
  salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  work(): void {
    console.log(this.name);
  }

  getSalary(): number {
    return this.salary;
  }
}
class Manager extends Employee {
  constructor(name: string, salary: number) {
    super(name, salary);
  }

  manageTeam(): void {
    console.log(this.name);
  }
}
class Developer extends Employee {
  programmingLanguage: string;

  constructor(name: string, salary: number, programmingLanguage: string) {
    super(name, salary);
    this.programmingLanguage = programmingLanguage;
  }

  writeCode(): void {
    console.log(this.name);
  }
}
