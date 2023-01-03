import { Navigation, Footer } from '../components';
import gradientBackground from '../../assets/images/Gradient_background.png';

const DefaultLayout = ({ children }) => {
  return (
    <div className="relative bg-cover w-full">
      <div
        className="absolute top-0 bg-cover w-full h-[586px] xl:h-[1080px]"
        style={{ backgroundImage: `url(${gradientBackground})` }}
      />
      <Navigation />
      <div className="min-h-[50vh] relative z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
