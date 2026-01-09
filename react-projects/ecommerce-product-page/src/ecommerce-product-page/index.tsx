import Header from "./components/Header";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";

const EcommerceProductPage = () => {
  return (
    <div className="min-h-screen font=[Kumbh Sans] bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery />
        <ProductInfo />
      </main>
    </div>
  );
};

export default EcommerceProductPage;
