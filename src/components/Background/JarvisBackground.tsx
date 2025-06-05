import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleField from './ParticleField';

const JarvisBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 5], // Adjust camera position as needed
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.3} color="#0af" />
        <pointLight position={[10, 10, 10]} intensity={0.2} color="#0af" />
        <ParticleField />
        {/* Optional: Add OrbitControls for development/debugging */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
};

export default JarvisBackground; 