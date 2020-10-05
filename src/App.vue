<template>
    <div>
        <h1>Current Active Bluetooth Devices ({{ devices.length }})</h1>

        <ul>
            <li v-for="(device, index) in devices" :key="index">
                {{ device.address }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            devices: [],
        };
    },

    sockets: {
        connect: function () {
            console.log("socket connected");
        },

        discover: function (peripheral) {
            this.devices.push({ address: peripheral });
        },

        disconnect: function (peripheral) {
            let indexOfPeripheral = this.devices.map((device, index) => {
                if (device.address == peripheral) {
                    return index;
                }
            });

            this.devices.splice(indexOfPeripheral, 1);
        },
    },
};
</script>