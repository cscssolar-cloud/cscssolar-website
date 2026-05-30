import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { QuoteForm } from "./components/QuoteForm";
import { ServiceArea } from "./components/ServiceArea";
import { Services } from "./components/Services";
import { TrustedBy } from "./components/TrustedBy";
import { WhyClean } from "./components/WhyClean";

const SITE_URL = "https://cscssolar.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CSCS — Commercial Solar Cleaning Services",
  url: SITE_URL,
  description:
    "Commercial solar panel cleaning for businesses and public agencies across the Central Valley. Eco-friendly deionized water process.",
  telephone: "+1-559-722-1800",
  email: "info@cscssolar.com",
  image: `${SITE_URL}/logo.png`,
  logo: `${SITE_URL}/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fresno",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    "Fresno",
    "Clovis",
    "Madera",
    "Visalia",
    "Tulare",
    "Hanford",
    "Bakersfield",
    "Merced",
    "Central Valley",
  ],
  knowsAbout: [
    "Commercial solar panel cleaning",
    "Eco-friendly deionized water cleaning",
    "Solar maintenance for public agencies",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <TrustedBy />
        <Services />
        <WhyClean />
        <Process />
        <ServiceArea />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
