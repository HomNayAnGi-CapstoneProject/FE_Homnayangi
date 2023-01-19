import ic_loading from '../../../assets/images/sand-clock.png';

const Loading = () => {
  return (
    <div className="w-full h-[10vh] flex items-center justify-center">
      <div className="w-[30px] h-[30px] bg-cover animate-spin" style={{ backgroundImage: `url(${ic_loading})` }} />
    </div>
  );
};

export default Loading;
