import Sidebar from '../../components/Sidebar';
import './doctorslotpage.css';
import { useState } from 'react';
import instance from '../../utils/axiosConfig';

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
    } catch (e) {}
  };

  return (
    <div className="slot-page">
      <Sidebar role="doctor" />
      <div className="slot-form">
        <label>Date - </label>
        <input
          type="date"
          value={formatDate(slotDetails.date)}
          onChange={e => {
            onchange(e, 'date');
          }}
        />
        <br />
        <br />
        <label>StartTime - </label>
        <input
          onChange={e => {
            onchange(e, 'startTime');
          }}
          type="string"
          value={slotDetails.startTime}
        />
        <br />
        <br />
        <label>EndTime - </label>
        <input
          onChange={e => {
            onchange(e, 'endTime');
          }}
          type="string"
          value={slotDetails.endTime}
        />
        <br />
        <br />
        <label>Slots - </label>
        <input
          onChange={e => {
            onchange(e, 'availableSlots');
          }}
          type="number"
          value={slotDetails.availableSlots}
          min={0}
        />
        <br />
        <br />
        <button onClick={onBtnAdd}>Add Slot</button>
      </div>
    </div>
  );
};

export default DoctorSlotPage;
