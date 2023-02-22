import { useState, useEffect } from 'react';
import { getRandom } from '../../utils/getRandom';
import placeholder from '../../assets/images/placeholderImg.png';
import placeholder2 from '../../assets/images/placeholderImg2.png';
import placeholder3 from '../../assets/images/placeholderImg3.png';

const Image = (props) => {
  const { src, alt, className } = props;
  const [loaded, setLoaded] = useState(false);
  const placeholderList = [placeholder, placeholder2, placeholder3];

  return (
    <>
      {!loaded && <img className={`${className}`} src={getRandom(placeholderList, 1)} alt={''} />}
      <img
        className={className}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt}
        style={loaded ? {} : { display: 'none' }}
      />
    </>
  );
};

export default Image;
