import { WebView } from "react-native-webview";

type LeafletMapProps = {
  userLocation: { latitude: number; longitude: number } | null;
  markedLocation: { latitude: number; longitude: number } | null;
  onLocationPick: (location: { latitude: number; longitude: number }) => void;
  staticMap?: boolean;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ userLocation, markedLocation, onLocationPick, staticMap }) => {

  const generateMapHTML = () => {
    const lng = userLocation?.longitude ?? 35.6892;
    const lat = userLocation?.latitude ?? 51.3890;
    const markerLat = markedLocation?.latitude ?? null;
    const markerLng = markedLocation?.longitude ?? null;

    return `
                <!DOCTYPE html>
                <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
                      <style>#map { height: 100vh; width: 100%; margin:0; padding:0; }</style>
                    </head>

                    <body>
                      <div id="map"></div>

                      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                      <script>
                        const map = L.map('map', {
                          dragging: ${!staticMap},
                          touchZoom: ${!staticMap},
                          scrollWheelZoom: ${!staticMap},
                          doubleClickZoom: ${!staticMap},
                          boxZoom: ${!staticMap},
                          keyboard: ${!staticMap},
                          zoomControl: ${!staticMap}
                        }).setView([${lat}, ${lng}], 16);

                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

                        let marker = null;

                        function addMarker(lat, lng) {
                          if(marker) map.removeLayer(marker);
                          marker = L.marker([lat, lng]).addTo(map).bindPopup("Picked Location").openPopup();

                          marker.on('click', function() {
                            if (${staticMap}) return;
                            map.removeLayer(marker);
                            marker = null;
                            window.ReactNativeWebView.postMessage(JSON.stringify(null));
                          });

                          window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
                        }

                        if (${markerLat} && ${markerLng}) {
                          addMarker(${markerLat}, ${markerLng});
                        }

                        map.on('click', function(e) {
                          if (!${staticMap}) { 
                            const { lat, lng } = e.latlng;
                            addMarker(lat, lng);
                          }
                        });
                      </script>
                    </body>
                </html>
    `;
  };

  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    onLocationPick(data);
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: generateMapHTML() }}
      onMessage={handleWebViewMessage}
      javaScriptEnabled
      style={{ flex: 1 }}
    />
  );
};

export default LeafletMap;