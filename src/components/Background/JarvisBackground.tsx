import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

const JarvisBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(20,120,180,0.2),transparent_50%),linear-gradient(180deg,#030712_0%,#020617_100%)]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 4.6],
          fov: 70,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.25} color="#34d5ff" />
        <pointLight position={[2, 2, 3]} intensity={0.45} color="#34d5ff" />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default JarvisBackground;
