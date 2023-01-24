import Zone from "../../parts/ZoneBase"

export default function Introduction(props) {
    return (
        <Zone
            slug="intro"
            zone="Introduction"
            env='park_spruit_sunrise_2k.hdr'
            camera={{ position: [-8, 12, -25], fov: 25 }}
        />
    )
}