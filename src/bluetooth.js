const noble = require('@abandonware/noble');
const io = require('socket.io')(3000);

noble.on('stateChange', async(state) => {
    console.log(state);
    if (state === 'poweredOn') {
        noble.startScanningAsync([], false)
            .then(res => {
                console.log('we are up and runing');
            }).catch(err => {
                console.log(err);
            });
    }
});

noble.on('discover', (peripheral) => {
    io.emit('discover', peripheral.address)

    console.log(peripheral.address, 'was discovered');

    peripheral.once('disconnect', (peripheral) => {
        io.emit('disconnect', peripheral.address)

        console.log(peripheral.address, 'was disconnected');
    });
});