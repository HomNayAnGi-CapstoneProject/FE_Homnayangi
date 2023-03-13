import { useState } from 'react';

// ** componetns
import TabList from './components/TabList';
import Container from './components/Content/Container';

const YourOrder = () => {
  //** const */
  const [status, setStatus] = useState('PENDING');

  return (
    <div className="font-inter">
      <TabList setStatus={setStatus} status={status} />
      <Container status={status} />
    </div>
  );
};

export default YourOrder;
