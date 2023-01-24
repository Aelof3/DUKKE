import Zone from "../../parts/ZoneBase"

export default function City(props) {
    return (
        <Zone
            slug="city"
            zone="City"
            env='city_canary_wharf_2k.hdr'
            camera={{ position: [-40, 20, 50], fov: 25 }}
        />
    )
}