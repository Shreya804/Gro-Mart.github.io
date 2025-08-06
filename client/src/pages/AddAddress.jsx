import { useState } from 'react';
import { assets } from '../assets/assets';

const InputField = ({ type, placeholder, name, handleChange, value }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={value}
    required
    className="w-full border border-gray-300 px-4 py-2 rounded outline-none"
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Address:', address);
    alert('Address Saved Successfully!');
  };

  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      <p className="text-2xl font-semibold mb-6">
        Shipping <span className="text-indigo-600">Address</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Form Section - left, wider */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 w-full space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              placeholder="First Name"
              name="firstName"
              handleChange={handleChange}
              value={address.firstName}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              name="lastName"
              handleChange={handleChange}
              value={address.lastName}
            />
          </div>

          <InputField
            type="email"
            placeholder="Email"
            name="email"
            handleChange={handleChange}
            value={address.email}
          />

          <InputField
            type="tel"
            placeholder="Phone Number"
            name="phone"
            handleChange={handleChange}
            value={address.phone}
          />

          <InputField
            type="text"
            placeholder="Full Address"
            name="street"
            handleChange={handleChange}
            value={address.street}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              placeholder="City"
              name="city"
              handleChange={handleChange}
              value={address.city}
            />
            <InputField
              type="text"
              placeholder="State"
              name="state"
              handleChange={handleChange}
              value={address.state}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              placeholder="Country"
              name="country"
              handleChange={handleChange}
              value={address.country}
            />
            <InputField
              type="text"
              placeholder="Zip Code"
              name="zipcode"
              handleChange={handleChange}
              value={address.zipcode}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600 transition"
          >
            Save Address
          </button>
        </form>

        {/* Image Section - right, smaller */}
        <div className="md:col-span-5 flex justify-center">
          <img
            src={assets?.add_address_image}
            alt="Add Address"
            className="w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
