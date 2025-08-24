class Box<T>{
    value:T;
    constructor(value:T){
        this.value=value
    }
    setValue(value:T){
        this.value=value;
    }
    getValue(): T{
        return this.value;
    }
}