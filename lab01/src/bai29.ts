interface Moveable{
    move():void;
}
class Car implements Moveable{
   move():void{
        console.log("4 wheels");
   } 
}
class Robot implements Moveable{
   move():void{
        console.log("2 legs");
   } 
}