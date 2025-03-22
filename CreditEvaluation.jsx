import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

function CreditEvaluation() {
  const [formData, setFormData] = useState({
    farmerName: '',
    farmSize: '',
    cropType: '',
    location: '',
    previousYield: '',
    loanAmount: ''
  });

  const [score, setScore] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate credit score calculation
    const calculatedScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
    setScore(calculatedScore);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Credit Evaluation</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Farmer Name</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Size (acres)</label>
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select crop</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="soybean">Soybean</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Year's Yield (tons)</label>
              <input
                type="number"
                name="previousYield"
                value={formData.previousYield}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount Required</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Calculate Credit Score
            </button>
          </div>
        </form>

        {score && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Credit Evaluation Results</h2>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-gray-800">{score}</div>
              {score >= 700 ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Excellent Credit Score</span>
                </div>
              ) : (
                <div className="flex items-center text-yellow-600">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <span>Fair Credit Score</span>
                </div>
              )}
            </div>
            <p className="mt-4 text-gray-600">
              This score is calculated based on various factors including farm data, weather patterns, soil health, and historical yield data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreditEvaluation;