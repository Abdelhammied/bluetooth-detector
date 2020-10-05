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

        // discover: function (peripheral) {
        //     console.log(peripheral);
        // },

        randomIdWasCreated: function (integer) {
            this.devices.push({ address: integer });
        },
    },
};
</script>