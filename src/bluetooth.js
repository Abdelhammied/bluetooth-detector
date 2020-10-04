const noble = require('@abandonware/noble');
const io = require('socket.io')(3000);

noble.on('stateChange', async(state) => {
    if (state === 'poweredOn') {
        console.log('Bluetooth is up and running');

        await noble.startScanningAsync([], true);
    }
});

noble.on('discover', async(peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(['180f'], ['2a19']);
    const batteryLevel = (await characteristics[0].readAsync())[0];

    console.log(peripheral.address, 'Detected');

    io.emit('discover', peripheral);

    await peripheral.disconnectAsync();
    process.exit(0);

});