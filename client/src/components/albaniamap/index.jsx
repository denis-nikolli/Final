import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const ALBANIA_CENTER = [41.15, 20.17]
const ALBANIA_BOUNDS = [
    [39.4, 18.9],
    [42.7, 21.2],
]

const DESTINATIONS = [
    { name: "Tirana", coords: [41.3275, 19.8187], desc: "Capital city & cultural hub" },
    { name: "Durrës", coords: [41.3234, 19.4419], desc: "Ancient port city & beaches" },
    { name: "Berat", coords: [40.7058, 19.9522], desc: "UNESCO – City of a Thousand Windows" },
    { name: "Gjirokastër", coords: [40.0758, 20.1394], desc: "UNESCO – Ottoman stone city" },
    { name: "Sarandë", coords: [39.8752, 20.0053], desc: "Gateway to the Albanian Riviera" },
    { name: "Ksamil", coords: [39.7686, 20.0061], desc: "Crystal-clear beaches & islands" },
    { name: "Vlorë", coords: [40.4667, 19.4833], desc: "Historic port & Karaburun Peninsula" },
    { name: "Shkodër", coords: [42.0683, 19.5126], desc: "Northern gateway & Rozafa Castle" },
    { name: "Theth", coords: [42.3833, 19.7833], desc: "Albanian Alps – hiking & waterfalls" },
    { name: "Butrint", coords: [39.7447, 20.0178], desc: "UNESCO – Ancient Greek & Roman ruins" },
]

const AlbaniaMap = () => (
    <MapContainer
        center={ALBANIA_CENTER}
        zoom={7}
        minZoom={7}
        maxZoom={13}
        maxBounds={ALBANIA_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
        scrollWheelZoom={false}
        attributionControl={false}
    >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {DESTINATIONS.map(d => (
            <Marker key={d.name} position={d.coords}>
                <Popup>
                    <strong>{d.name}</strong>
                    <br />
                    {d.desc}
                </Popup>
            </Marker>
        ))}
    </MapContainer>
)

export default AlbaniaMap
