abstract class Appliance {
    abstract turnOn():void;
}
class Fan extends Appliance{
    turnOn():void{
        console.log("spinning");
        
    }
}
class AirConditioner  extends Appliance{
    turnOn():void{
        console.log("cooling");
        
    }
}