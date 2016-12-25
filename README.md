# app4v8

[![npm](https://img.shields.io/npm/v/node-red-contrib-app4v8.svg?maxAge=2592000)](https://www.npmjs.com/package/node-red-contrib-app4v8)

The app4v8 is a industrial grade, electromagnetic compatibile(EMC) and electro static discharge protected,
raspberry pi io extension board.

4 digital inputs
8 digital short circuit protected outputs with max 0.4 ampere per channel (daisy chainable mc33879apek spi output controler)
1 battery backed RTC including board temperature sensor and sram (ds3232m)
1 RS485 full duplex interface
1 SPI with 2 chip select wires
1 I2C 
1 Onboard buzzer

variable power supply 12-24V DC, also supplying the backpack mounted Raspberry pi.

The node-red-nodes included in this package delivers nodes to gain simple access to
the app4v8 extension board.
including:

RTC - Set/get current real time
Output - Set output pin state

## Requirements
RaspberryPi 3 with Raspbian Jessie version: November 2016 
Enio - app4v8 io extension board.

##
> prep the apt
> ```bash
> sudo apt update
> sudo apt full-upgrade
> ```

Finaly the apdu2pcsc node-red node to send and receive apdus can be installed
```bash
cd ~\node-red
sudo npm install node-red-contrib-app4v8
```
A sample node-red wiring to detect the austrian maestro bank card:
```javascript
wiring example here
```
