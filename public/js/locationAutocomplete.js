const locationInput = document.getElementById('location-input');
const countryInput = document.getElementById('country-input');
const suggestionsDiv = document.getElementById('location-suggestions');
const previewMapDiv = document.getElementById('preview-map');
const currentLocationBtn = document.getElementById('current-location-btn');
const locationStatus = document.getElementById('location-status');
const mapLoading = document.getElementById('map-loading');

let map;
let marker;
let selectedCoordinates = null;

// Initialize preview map
mapboxgl.accessToken = mapToken;

// Hide loading spinner after map loads
setTimeout(() => {
    if (mapLoading) mapLoading.style.display = 'none';
    
    map = new mapboxgl.Map({
        container: 'preview-map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [78.9629, 20.5937], // India center
        zoom: 4
    });

    map.addControl(new mapboxgl.NavigationControl());
}, 500);

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fetch location suggestions from Mapbox Geocoding API
async function fetchLocationSuggestions(query) {
    if (query.length < 3) {
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapToken}&types=place,locality,neighborhood,address&limit=5`
        );
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            displaySuggestions(data.features);
        } else {
            suggestionsDiv.innerHTML = '<div class="suggestion-item">No locations found</div>';
            suggestionsDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
}

// Display suggestions dropdown
function displaySuggestions(features) {
    suggestionsDiv.innerHTML = '';
    
    features.forEach(feature => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <div class="suggestion-name">${feature.text}</div>
                <div class="suggestion-context">${feature.place_name}</div>
            </div>
        `;
        
        div.addEventListener('click', () => {
            selectLocation(feature);
        });
        
        suggestionsDiv.appendChild(div);
    });
    
    suggestionsDiv.style.display = 'block';
}

// Handle location selection
function selectLocation(feature) {
    // Set location name
    locationInput.value = feature.text;
    
    // Extract and set country
    const context = feature.context || [];
    const country = context.find(c => c.id.startsWith('country'));
    if (country) {
        countryInput.value = country.text;
    } else {
        countryInput.value = feature.place_name.split(',').pop().trim();
    }
    
    // Store coordinates
    selectedCoordinates = feature.geometry.coordinates;
    
    // Update preview map
    updatePreviewMap(selectedCoordinates, feature.text);
    
    // Hide suggestions
    suggestionsDiv.style.display = 'none';
    
    // Update status
    locationStatus.innerHTML = '<i class="fas fa-check-circle text-success"></i> Location selected';
}

// Update preview map with marker
function updatePreviewMap(coordinates, placeName) {
    // Remove existing marker
    if (marker) {
        marker.remove();
    }
    
    // Add new marker
    marker = new mapboxgl.Marker({ color: '#fe424d' })
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h6>${placeName}</h6>`)
        )
        .addTo(map);
    
    // Fly to location
    map.flyTo({
        center: coordinates,
        zoom: 12,
        duration: 1500
    });
}

// Get user's current location using browser geolocation
async function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    // Update button state
    currentLocationBtn.disabled = true;
    currentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    locationStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting your location...';

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                // Reverse geocode to get location name
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapToken}&types=place,locality,neighborhood`
                );
                const data = await response.json();
                
                if (data.features && data.features.length > 0) {
                    const feature = data.features[0];
                    
                    // Set location details
                    locationInput.value = feature.text;
                    
                    // Extract country
                    const context = feature.context || [];
                    const country = context.find(c => c.id.startsWith('country'));
                    if (country) {
                        countryInput.value = country.text;
                    }
                    
                    // Store coordinates
                    selectedCoordinates = [longitude, latitude];
                    
                    // Update map
                    updatePreviewMap(selectedCoordinates, feature.text);
                    
                    // Update status
                    locationStatus.innerHTML = '<i class="fas fa-check-circle text-success"></i> Current location detected!';
                } else {
                    throw new Error('Could not find location name');
                }
            } catch (error) {
                console.error('Error reverse geocoding:', error);
                locationStatus.innerHTML = '<i class="fas fa-exclamation-circle text-warning"></i> Location detected but name not found. Please enter manually.';
                
                // Still set coordinates and update map
                selectedCoordinates = [longitude, latitude];
                updatePreviewMap(selectedCoordinates, 'Your Location');
            } finally {
                // Reset button
                currentLocationBtn.disabled = false;
                currentLocationBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i>';
            }
        },
        (error) => {
            console.error('Geolocation error:', error);
            
            let errorMessage = '';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please enable location permissions.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
                default:
                    errorMessage = 'An error occurred while getting location.';
            }
            
            locationStatus.innerHTML = `<i class="fas fa-exclamation-triangle text-danger"></i> ${errorMessage}`;
            
            // Reset button
            currentLocationBtn.disabled = false;
            currentLocationBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i>';
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Event listeners
locationInput.addEventListener('input', debounce((e) => {
    fetchLocationSuggestions(e.target.value);
}, 300));

// Current location button click
if (currentLocationBtn) {
    currentLocationBtn.addEventListener('click', getCurrentLocation);
}

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!locationInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
        suggestionsDiv.style.display = 'none';
    }
});

// Prevent form submission if no location selected
document.querySelector('form').addEventListener('submit', (e) => {
    if (!selectedCoordinates) {
        e.preventDefault();
        alert('Please select a location from the suggestions or use your current location');
        locationInput.focus();
    }
});