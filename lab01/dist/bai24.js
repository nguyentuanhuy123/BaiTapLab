"use strict";
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("spinning");
    }
}
class AirConditioner extends Appliance {
    turnOn() {
        console.log("cooling");
    }
}
