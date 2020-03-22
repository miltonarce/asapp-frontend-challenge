import React from "react";
import Cities from "../../components/Cities";

const Home = () => (
  <main className="container">
    <section className="container__title">
      <h1>Select your favorite cities</h1>
    </section>
    <section className="container__main">
      <Cities />
    </section>
  </main>
);

export default Home;
