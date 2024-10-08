import DoctorSidebar from '../../components/DoctorSidebar';
import './doctorslotpage.css';
import { useState } from 'react';
import instance from '../../utils/axiosConfig';
import { Button, Input } from 'antd';

const DoctorSlotPage = () => {
  const [slotDetails, setSlotDetails] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
    availableSlots: 0,
    doctorId: localStorage.getItem('id'),
  });

  console.log(slotDetails);

  // Format date in YYYY-MM-DD format
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

  const onBtnAdd = async () => {
    try {
      const response = await instance.post('/slot', slotDetails);
      console.log(response.data.message);
      setSlotDetails({
        ...slotDetails,
        startTime: '',
        endTime: '',
        availableSlots: 0,
      });
    } catch (e) {
      console.log('error in POST /slot api call');
    }
  };

  return (
    <div className="doctor-slot-page">
      <DoctorSidebar />
      <div className="doctor-slot-form">
        <label>Date - </label>
        <Input
          type="date"
          value={formatDate(slotDetails.date)}
          onChange={e => {
            onchange(e, 'date');
          }}
        />
        <label>StartTime - </label>
        <Input
          onChange={e => {
            onchange(e, 'startTime');
          }}
          type="string"
          value={slotDetails.startTime}
        />
        <label>EndTime </label>
        <Input
          onChange={e => {
            onchange(e, 'endTime');
          }}
          type="string"
          value={slotDetails.endTime}
        />
        <label>Slots </label>
        <Input
          onChange={e => {
            onchange(e, 'availableSlots');
          }}
          type="number"
          value={slotDetails.availableSlots}
          min={0}
        />
        <Button onClick={onBtnAdd}>Add Slot</Button>
      </div>
    </div>
  );
};

export default DoctorSlotPage;
