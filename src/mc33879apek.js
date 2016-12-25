module.exports = function(RED) {
	var SPI = require('pi-spi');
	var spi;
	
    function MC33879APEK(config) 
	{
		spi = SPI.initialize("/dev/spidev0.0")
		
		RED.nodes.createNode(this,config);
        var node = this;
		
		var remOutput = 0x00;
		
		console.log('MC33879APEK started');
		// clear output pins
		SetOutput(remOutput);
		
		this.on('input', function(msg) 
		{
			var pinNr = parseInt(msg.payload.substr(0, 1));
			
			if(msg.payload.substr(1, 2) == 'on')
			{// switch on pin and remember state
				remOutput |= 0x1 << pinNr;
			}
			else
			{
				remOutput &= ~(0x1 << pinNr);
			}
			
			SetOutput(remOutput);
		});
	}
    RED.nodes.registerType("MC33879APEK",MC33879APEK);
	
	function SetOutput(outputValue)
	{
		var outputCmd = new Uint8Array(2);
		outputCmd[0] = 0x00;
		outputCmd[1] = outputValue;
			
		spi.transfer(new Buffer(outputCmd), outputCmd.length, function (e,d) {
			if (e) console.error(e);
			else console.log("Got \""+d.toString()+"\" back.");
		});
	}
}


