import { useParams } from "react-router-dom";
import { CustomerReviews, Footer, SimilarProducts, ProductHero, SpecialOffers, Subscribe } from "../sections"
import Nav from "./Nav"
import { products } from "../constants";

const Item = () => {

  const params = useParams();
  const product = products.find((prod) => prod.name === params.name);

  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r xl:padding-b" id="home">
        <ProductHero {...product}/>
      </section>
      <section className="padding" id="products">
        <SimilarProducts />
      </section>
      <section className="padding" id="special-offers">
        <SpecialOffers />
      </section>
      <section className="bg-pale-blue padding" id="customer-reviews">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full" id="contact-us">
        <Subscribe />
      </section>
      <footer className="bg-black padding-x padding-t pb-8">
        <Footer />
      </footer>
    </main>
  );
}

export default Item