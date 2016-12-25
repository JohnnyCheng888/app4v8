module.exports = function(RED) {
    function DS3232M(config) 
	{
		RED.nodes.createNode(this,config);
		var node = this;
		
		var i2c = require('i2c');
		var address = 0x68;
		var wire = new i2c(address, {device: '/dev/i2c-1'});
		
		console.log('DS3232M started');
		setInterval(function () {
			wire.readBytes(0, 10, function(err, res) {
				var yearMs2Digits = '20';
				if(res[5] & 0x80)
				{
					yearMs2Digits = '21';
				}
				 
				//        0123456789012345678
				// format dd.mm.yyyy hh:mm:ss
				var msg = { 
					payload: 
				        ((res[4] & 0x30) >> 4).toString() + (res[4] & 0xF).toString() + '.' + 
						((res[5] & 0x70) >> 4).toString() + (res[5] & 0xF).toString() + '.' + 
						yearMs2Digits +
						((res[6] & 0xF0) >> 4).toString() + (res[6] & 0xF).toString() + ' ' + 
						 
						((res[2] & 0xF0) >> 4).toString() + (res[2] & 0xF).toString() + '.' + 
						((res[1] & 0xF0) >> 4).toString() + (res[1] & 0xF).toString() + '.' + 
						((res[0] & 0xF0) >> 4).toString() + (res[0] & 0xF).toString()
				}

				node.send(msg);
			});
		}
		, 1000);
		
		this.on('input', function(msg) 
		{
			console.log('input msg arrived: ', msg.payload);

		    // set year
			var year = parseInt(msg.payload.substr(6, 4));
			var centuryBit = 0;
			if(year >= 2100)
			{
				centuryBit = 1;
			}
			
			var bytesToWrite = new Uint8Array(7);
			// year
			bytesToWrite[6] = parseInt(msg.payload.substr(8, 1)) * 0x10 + parseInt(msg.payload.substr(9, 1));
			// month
			bytesToWrite[5] = (parseInt(msg.payload.substr(3, 1)) * 0x10 + parseInt(msg.payload.substr(4, 1))) | 
							 (centuryBit << 7);
            // day							
			bytesToWrite[4] = (parseInt(msg.payload.substr(0, 1)) * 0x10) + parseInt(msg.payload.substr(1, 1));
			// hour
			bytesToWrite[2] = parseInt(msg.payload.substr(11, 1)) * 0x10 + parseInt(msg.payload.substr(12, 1));
			// minute
			bytesToWrite[1] = parseInt(msg.payload.substr(14, 1)) * 0x10 + parseInt(msg.payload.substr(15, 1));
			// second
			bytesToWrite[0] = parseInt(msg.payload.substr(17, 1)) * 0x10 + parseInt(msg.payload.substr(18, 1));
			
			console.log(bytesToWrite);
			
			wire.writeBytes(0x00, bytesToWrite, function(err) {
				console.log('Unable to write new date to RTC err:' + err)
			});
		});
    }
	
    RED.nodes.registerType("DS3232M",DS3232M);
}

