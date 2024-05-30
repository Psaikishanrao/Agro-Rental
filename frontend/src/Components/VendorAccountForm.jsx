import React, { useState } from 'react';

const VendorAccountForm = ({ initialDetails={} ,onSave,onCancel}) => {
  console.log(initialDetails);
  const [details, setDetails] = useState(initialDetails);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(details);
  };

  const handleCancel = () => {
    onCancel();
  };
  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="vendor-account-form">
      <h3>Vendor Account Details</h3>
      
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={details.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          value={details.mobileNumber}
          onChange={handleChange}
        />
        <button onClick={handleButtonClick}>verify</button>
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={details.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Nearest Police Station:
        <input
          type="text"
          name="nearestPoliceStation"
          value={details.nearestPoliceStation}
          onChange={handleChange}
        />
      </label>
      <label>
        City/Village:
        <input
          type="text"
          name="cityVillage"
          value={details.cityVillage}
          onChange={handleChange}
        />
      </label>
      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={details.pincode}
          onChange={handleChange}
        />
      </label>
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default VendorAccountForm;