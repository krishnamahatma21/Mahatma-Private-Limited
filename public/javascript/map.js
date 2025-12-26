const map = L.map("map").setView([28.63576, 77.22445], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([28.6139, 77.2090]).addTo(map);

marker.bindPopup("<b>Hey!</b><br>Exact location will be provide after booking.").openPopup();