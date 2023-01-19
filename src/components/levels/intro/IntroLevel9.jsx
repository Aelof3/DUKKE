import Floor from "../../parts/Floor"
import Block from "../../parts/Block"
import LevelBase from "../../parts/LevelBase"
import Spinner from "../../parts/Spinner"

export default function IntroLevel9(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]} name="level_4">
            <Spinner axes={[true,false,false]}>
                <Floor args={[20, 0.2, 5]} position={[2,-2,0]} color={'#000044'} opacity={0.95}/>
                <Floor args={[15, 0.2, 6]} position={[4.5,1,2.5]} color={'#000044'} rotation={[Math.PI / 2,0,0]} opacity={0.95} />
                <Floor args={[20, 0.2, 5]} position={[7,4,0]} color={'#000044'} opacity={0.95}/>
                <Floor args={[15, 0.2, 6]} position={[4.5,1,-2.5]} color={'#000044'} rotation={[Math.PI / 2,0,0]} opacity={0.95}/>

                <Block args={[0.2, 10, 5]} position={[-8,3,0]} opacity={0.95}/>
                <Block args={[0.2, 4, 5]} position={[-3,6,0]} opacity={0.95}/>
                <Block args={[0.2, 10, 5]} position={[-5.5,3,-2.5]} opacity={0.95} rotation={[0,Math.PI / 2,0]}/>
                <Block args={[0.2, 10, 5]} position={[-5.5,3,2.5]} opacity={0.95} rotation={[0,Math.PI / 2,0]}/>
                
                
                <Block args={[0.2, 10, 5]} position={[17,-1,0]} opacity={0.95}/>
                <Block args={[0.2, 4, 5]} position={[12,-4,0]} opacity={0.95}/>
                <Block args={[0.2, 10, 5]} position={[14.5,-1,-2.5]} opacity={0.95} rotation={[0,Math.PI / 2,0]}/>
                <Block args={[0.2, 10, 5]} position={[14.5,-1,2.5]} opacity={0.95} rotation={[0,Math.PI / 2,0]}/>

                <Block args={[0.2, 6, 5]} position={[4.5,1,0]} opacity={0.95}/>
            </Spinner>
        </LevelBase>
    )
}