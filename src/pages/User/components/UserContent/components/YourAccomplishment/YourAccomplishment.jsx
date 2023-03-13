import { useState } from 'react';

// ** components
import TabList from './components/TabList';
import Container from './components/Content/Container';

const YourAccomplishment = () => {
  const [status, setStatus] = useState('all');

  return (
    <div className="font-inter">
      <TabList setStatus={setStatus} status={status} />
      <Container status={status} />
    </div>
  );
};

export default YourAccomplishment;
