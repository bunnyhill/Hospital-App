import UserSidebar from '../../components/UserSidebar';
import instance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import './userslotpage.css';

const UserSlotPage = () => {
  const { Option } = Select;
  const [pageDetails, setPageDetails] = useState({ hospitals: [] });

  const [identifyDoctor, setIdentifyDoctor] = useState({
    hospitalName: '',
    departName: '',
    doctorName: '',
  });
  const [slotDetails, setSlotDetails] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
    availableSlots: 0,
    doctorId: localStorage.getItem('id'),
  });

  console.log(slotDetails);

  const fetchPageDetails = async () => {
    try {
      const response = await instance.get('/hospital');
      setPageDetails({ ...pageDetails, hospitals: response.data });
    } catch (e) {}
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onchange = (e, key) => {
    if (key == 'date') {
      const date = new Date(e.target.value);
      setSlotDetails({ ...slotDetails, date });
    } else {
      setSlotDetails({ ...slotDetails, [key]: e.target.value });
    }
  };

  const onBookSlot = async () => {
    try {
      const response = await instance.post('/slot', slotDetails);
      console.log(response.data.message);
      setSlotDetails({
        ...slotDetails,
        startTime: '',
        endTime: '',
        availableSlots: 0,
      });
    } catch (e) {}
  };

  useEffect(() => {
    fetchPageDetails();
  }, []);

  return (
    <div className="user-slot-page">
      <UserSidebar />
      <div className="user-slot-form">
        <label>Date </label>
        <Input
          type="date"
          value={formatDate(slotDetails.date)}
          onChange={e => {
            onchange(e, 'date');
          }}
        />
        <label>Hospital</label>
        <Select>
          {pageDetails?.hospitals.map(item => (
            <Option key={item.name} vlaue={item.name} />
          ))}
        </Select>
        {/* <Button onCliCk={onBookSlot}>Book Slot</Button> */}
      </div>
    </div>
  );
};

export default UserSlotPage;
