import { Navigation, Footer } from '../components';
import gradientBackground from '../../assets/images/Gradient_background.png';

const DefaultLayout = ({ children }) => {
  return (
    <div className="bg-cover w-full h-[586px] xl:h-[1080px]" style={{ backgroundImage: `url(${gradientBackground})` }}>
      <Navigation />
      <div className="min-h-[50vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
