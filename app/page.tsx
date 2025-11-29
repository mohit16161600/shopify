import TopBanner from "@/app/components/Home/header/TopBanner";
import MainHeader from "@/app/components/Home/header/MainHeader";
import HomeHeroSection from "@/app/components/Home/HeroSection";
import ProductSection from "@/app/components/Home/NewProductSection";
import CategorySelector from "@/app/components/Home/Category";
import ConsultationTestimonial from "@/app/components/Home/ConsultationTestimonial";
import BestSeller from "@/app/components/Home/BestSeller";
import PowerpackCombo from "@/app/components/Home/PowerpackCombo";
import WatchAndShop from "@/app/components/Home/youtube/WatchAndShop";
import WhyChooseUs from "@/app/components/Home/WhyChooseUs";
import SpotingNews from "@/app/components/Home/SpotingNews";
import EasyShoppingPlatform from "@/app/components/Home/EasyShoppingPlatform";
import CustomerReviews from "@/app/components/Home/CustomerReviews";
import DoctorSection from './components/Home/DoctorSection';
import BeardCareSection from './components/Home/BeardCareSection';
import InstagramFeed from "@/app/components/Home/InstagramFeed";
import Note from "@/app/components/Home/Note";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBanner />
      <MainHeader />
      <HomeHeroSection />
      <CategorySelector />
      <ProductSection />
      <ConsultationTestimonial />
      <BestSeller />
      <PowerpackCombo />
      <WatchAndShop />
      <WhyChooseUs />
      <SpotingNews />
      <BeardCareSection />
      <DoctorSection />
      <EasyShoppingPlatform />
      <CustomerReviews />
      <InstagramFeed />
      <Note />
      <Footer />
    </main>
  );
}
