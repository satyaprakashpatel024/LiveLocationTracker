const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        let { latitude, longitude } = position.coords;
        socket.emit('send-location', { latitude, longitude });
    }, (error) => {
        console.log(error);
    },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );

}

const map = L.map("map").setView([0, 0], 10)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "OpenStreetMap"
}).addTo(map)

const marker = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    // console.log(longitude,",,",latitude);

    map.setView([latitude, longitude], 15);

    if (marker[id]) {
        marker[id].setLatLng([latitude, longitude]);
    } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map);
    }
})

// socket.on('user-disconnected', (userId) => {
//     if (marker[userId]) {
//         map.removeLayer(marker[userId]);
//         delete marker[userId];
//     }
// })