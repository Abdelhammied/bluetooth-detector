<template>
    <div>
        <h1>Bluetooth Devices</h1>

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

    created() {
        this.sockets.subscribe("discover", (data) => {
            console.log(data);
        });
    },

    sockets: {
        connect: function () {
            console.log("socket connected");
        },
        customEmit: function (data) {
            console.log(
                'this method was fired by the socket server. eg: io.emit("customEmit", data)',
                data
            );
        },
    },
};
</script>