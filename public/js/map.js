console.log('map.js loaded');
console.log('mapboxgl available?', typeof mapboxgl !== 'undefined');
console.log('mapToken:', mapToken);
console.log('listing:', listingData);

if (typeof mapboxgl === 'undefined') {
    console.error('Mapbox GL JS not loaded!');
} else {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listingData.geometry.coordinates,
        zoom: 12
    });

    map.on('load', () => {
        console.log('Map loaded successfully!');
    });

    map.on('error', (e) => {
        console.error('Map error:', e);
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add custom directions button control
    class DirectionsControl {
        onAdd(map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
            this._container.innerHTML = `
                <button class="mapbox-directions-btn" title="Get Directions">
                    <i class="fa-solid fa-diamond-turn-right"></i>
                </button>
            `;
            
            this._container.querySelector('button').addEventListener('click', () => {
                const coords = listingData.geometry.coordinates;
                const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[0]}`;
                window.open(url, '_blank');
            });
            
            return this._container;
        }

        onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }

    map.addControl(new DirectionsControl(), 'top-right');

    // Add marker
    const marker = new mapboxgl.Marker({ color: '#fe424d' })
        .setLngLat(listingData.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h6>${listingData.title}</h6><p>${listingData.location}, ${listingData.country}</p>`
                )
        )
        .addTo(map);
    
    console.log('Marker added');
}