# app4v8

[![npm](https://img.shields.io/npm/v/node-red-contrib-app4v8.svg?maxAge=2592000)](https://www.npmjs.com/package/node-red-contrib-app4v8)

The app4v8 is a industrial grade, electromagnetic compatibile(EMC) and electro static discharge protected,
raspberry pi io extension board.

* 4 digital inputs
* 8 digital short circuit protected outputs with max 0.4 ampere per channel (daisy chainable mc33879apek spi output controler)
* 1 battery backed RTC including board temperature sensor and sram (ds3232m)
* 1 RS485 full duplex interface
* 1 SPI with 2 chip select wires
* 1 I2C 
* 1 Onboard buzzer

variable power supply 12-24V DC, also supplying the backpack mounted Raspberry pi.

The node-red-nodes included in this package delivers nodes to gain simple access to
the app4v8 extension board.
including:

RTC - Set/get current real time
Output - Set output pin state

## Requirements
RaspberryPi 3 with Raspbian Jessie version: November 2016 
Enio - app4v8 io extension board.

## Installation
> prep the apt
> ```bash
> sudo apt update
> sudo apt full-upgrade
> ```

Install app4v8 nodes in .node-red directory
```bash
cd ~\.node-red
sudo npm install node-red-contrib-app4v8
```
Output pin number can be configured in the node-red wiring ui.

A sample node-red wiring. The trigger sets the RTC, and 5 seconds later output 1 will be set for 1 second :
```javascript
[{"id":"69534dff.d87a74","type":"DS3232M","z":"33293908.82f2ae","name":"","x":394.5,"y":150,"wires":[["9a517b2a.a3e81","e0064e79.cc56e8"]]},{"id":"e0064e79.cc56e8","type":"debug","z":"33293908.82f2ae","name":"","active":true,"console":"false","complete":"false","x":706.5,"y":151,"wires":[]},{"id":"2b8bc8fb.7f7ed8","type":"inject","z":"33293908.82f2ae","name":"","topic":"","payload":"23.12.2016 15.22.45","payloadType":"str","repeat":"","crontab":"","once":false,"x":185.50001525878906,"y":149.99998474121094,"wires":[["69534dff.d87a74"]]},{"id":"9a517b2a.a3e81","type":"function","z":"33293908.82f2ae","name":"","func":"if(msg.payload == '23.12.2016 15.22.50')\n{\n    msg.payload = \"1\";\n    return(msg);\n}\nelse\n{\n    msg.payload = \"0\";\n    return(msg);\n}\n\n","outputs":1,"noerr":0,"x":385.5,"y":231.66661071777344,"wires":[["2a2f9dcb.bddc52"]]},{"id":"2a2f9dcb.bddc52","type":"MC33879APEK","z":"33293908.82f2ae","name":"","outputpin":1,"x":618.5,"y":231.3333282470703,"wires":[[]]}]
```
