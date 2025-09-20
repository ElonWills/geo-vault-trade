import Header from "@/components/Header";
import GeologicalMap from "@/components/GeologicalMap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-geological">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <GeologicalMap />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
