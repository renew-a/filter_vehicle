'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SelectorVehicle() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [modelYears, setModelYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setVehicleTypes(data.Results || []);
      } catch (error) {
        console.error('Error fetching', error);
      }
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 2015 + 1 },
      (_, index) => currentYear - index
    ).reverse();
    setModelYears(years);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Filter Vehicles</h1>
        <div className="mb-4">
          <label htmlFor="vehicle-type" className="text-gray-700 block text-sm font-medium">Vehicle Type</label>
          <select
            id="vehicle-type"
            name="vehicle-type"
            className="mt-1 block w-full border-gray-300 shadow-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select type</option>
            {vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>{type.MakeName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="model-year" className="block text-sm font-medium text-gray-700">Model Year</label>
          <select
            id="model-year"
            name="model-year"
            className="mt-1 block w-full border-gray-300 shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select year</option>
            {modelYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <Link
            href={(selectedType && selectedYear) ? `/result/${selectedType}/${selectedYear}` : '#'}
            passHref
          >
            <div
              className={`bg-blue-500 inline-block px-4 text-white shadow-sm ${!(selectedType && selectedYear) ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={!(selectedType && selectedYear)}
            >
              Next
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

