class Stack<T>{
    items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }
    pop():T|undefined{
        return this.items.pop();
    }
    isEmpty():boolean{
        return this.items.length==0
    }
}