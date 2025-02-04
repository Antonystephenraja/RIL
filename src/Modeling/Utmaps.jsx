import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";



const Model = () => {
    const group = useRef();
  
    const gltfPath ="./utmaps_curve.glb";
    
    const {scene} = useGLTF(gltfPath);
    useFrame(() => {
        if (group.current) {
          group.current.rotation.y += 0.01; 
        }
      });
    return (
      <primitive
        ref={group}
        object={scene}
        // srotation={[Math.PI, 0, 0]}
      />
    );
  };
  

const Utmaps = () => {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 30 }}>
    <ambientLight intensity={0.5} />

    <PresentationControls
      speed={1.5}
      global
    //   polar={[-Math.PI / 4, Math.PI / 4]}
    >
      <Stage environment={"warehouse"}>
        <Model 
        />
      </Stage>
    </PresentationControls>
    <OrbitControls />
  </Canvas>
  )
}

export default Utmaps
