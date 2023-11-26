// pages/Form.tsx
import React, { useState } from 'react';
import Image from 'next/image'

interface FormValues {
  model: string;
  licenseLevel: number;
  quantity: number;
  date: string;
  comments: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    model: '',
    licenseLevel: 0,
    quantity: 0,
    date: '',
    comments: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'quantity' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('api/formSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className="min-h-screen flex bg-black">

      <Image src="fcllogo.svg" alt="Logo" className="h-16 w-16 m-4"  width={800} height={500} />

      <div className="flex items-center justify-center flex-grow">
        <div className="max-w-md w-full bg-black border-2 border-yellow-700 p-8 rounded-sm shadow-md">
          <h1 className='text-white'>Batch Form</h1>
          <form onSubmit={handleSubmit}>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="my-3 p-1 block w-full  rounded-sm sm:text-sm text-black"
              placeholder="Model"
            >
              <option value="Model 1">Model 1</option>
              <option value="Model 2">Model 2</option>
              <option value="Model 3">Model 3</option>
            </select>

            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="my-3 p-1 block w-full  rounded-sm sm:text-sm "
              placeholder="Date"
            />

            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="my-3 p-1 block w-full  rounded-sm sm:text-sm "
              placeholder="Quantity"
            />

            <select
              id="licenseLevel"
              name="licenseLevel"
              value={formData.licenseLevel}
              onChange={handleInputChange}
              className="my-3 p-1 block w-full  rounded-sm sm:text-sm "
              placeholder="License Level"
            >
              {[...Array(10).fill(null).keys()].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              disabled
              className="my-3 p-1 block w-full  rounded-sm sm:text-sm "
              placeholder="Comments"
              rows={2}
            ></textarea>

            <button
              type="submit"
              className="w-full bg-yellow-700  p-2 rounded hover:bg-yellow-600 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
