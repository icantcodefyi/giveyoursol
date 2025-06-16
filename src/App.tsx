import Silk from "@/components/Silk/Silk";
import AddressCard from "@/components/AddressCard";

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <div className="px-2">
        <AddressCard />
      </div>
    </main>
  );
}

export default App;
