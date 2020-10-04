const noble = require('@abandonware/noble');
const io = require('socket.io')(3000);


noble.on('stateChange', async(state) => {
    if (state === 'poweredOn') {
        console.log('Bluetooth is up and running');

        await noble.startScanningAsync([], true);
    }
});

noble.on('discover', async(peripheral) => {
    console.log(peripheral.address, 'Detected');
    io.emit('discover', peripheral);
});