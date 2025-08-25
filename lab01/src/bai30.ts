class Student{
    name:string;
    id:number;
    constructor(name:string,id:number){
        this.name=name;
        this.id=id
    }
}
class Teacher{
    name:string;
    id:number;
    constructor(name:string,id:number){
        this.name=name;
        this.id=id
    }
}
class School{
    students:Student[];
    teachers:Teacher[];
    constructor(students:Student[],teachers:Teacher[]){
        this.students=students
        this.teachers=teachers
    }
    displayInfo(): void {
        console.log("\nStudents:");
        this.students.forEach(s => {
            console.log(`- [${s.id}] ${s.name}`);
        });
        console.log("\nTeachers:");
        this.teachers.forEach(t => {
            console.log(`- [${t.id}] ${t.name}`);
        })
    }
}