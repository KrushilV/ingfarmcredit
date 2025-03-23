import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function CreditEvaluation() {
  const initialFormState = {
    farmerName: "",
    farmSize: "",
    cropType: "",
    location: "",
    previousYield: "",
    loanAmount: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [score, setScore] = useState(null);
  const [userEntries, setUserEntries] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let baseScore = 400;
    const farmSize = parseFloat(formData.farmSize);
    let farmSizeScore = farmSize * 6;
    const previousYield = parseFloat(formData.previousYield);
    let yieldScore = previousYield * 8;

    if (farmSize >= 5 && previousYield >= 5) baseScore += 100;
    if (farmSize >= 10 && previousYield >= 10) baseScore += 150;

    const cropTypeScore = {
      wheat: 100,
      rice: 90,
      corn: 85,
      soybean: 95,
    }[formData.cropType] || 80;

    const topAgriCitiesIndia = ["Ludhiana", "Amritsar", "Indore", "Patna", "Kanpur"];
    const locationScore = topAgriCitiesIndia.includes(formData.location) ? 120 : 60;

    const loanAmount = parseFloat(formData.loanAmount);
    const farmValue = farmSize * 10000;
    const yieldValue = previousYield * 15000;

    let loanFactor = 50;
    if (loanAmount < farmValue + yieldValue) loanFactor = 120;
    else if (loanAmount > 2 * (farmValue + yieldValue)) loanFactor = 30;

    const finalScore =
      baseScore +
      farmSizeScore * 0.25 +
      yieldScore * 0.3 +
      cropTypeScore * 0.2 +
      locationScore * 0.15 +
      loanFactor * 0.1;

    const calculatedScore = Math.min(Math.floor(finalScore), 850);
    setScore(calculatedScore);

    const newUserEntry = { ...formData, creditScore: calculatedScore };

    setUserEntries([...userEntries, newUserEntry]);

    setFormData(initialFormState);
  };

  const downloadExcel = () => {
    const headers = [
      "Farmer Name",
      "Farm Size (acres)",
      "Crop Type",
      "Location",
      "Previous Year's Yield (kilos)",
      "Loan Amount",
      "Credit Score",
    ];

    const data = userEntries.map((entry) => [
      entry.farmerName,
      entry.farmSize,
      entry.cropType,
      entry.location,
      entry.previousYield,
      entry.loanAmount,
      entry.creditScore,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Credit Data");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(dataBlob, "CreditEvaluation.xlsx");
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
                required
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Year's Yield (kilos)</label>
              <input
                type="number"
                name="previousYield"
                value={formData.previousYield}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
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
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
            >
              Calculate Credit Score
            </button>
          </div>
        </form>
      </div>

      {score !== null && (
        <div className="mt-6 text-center text-lg font-semibold text-green-700">
          Credit Score for last user: {score}
        </div>
      )}

      {userEntries.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">User Entries</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Farmer Name</th>
                <th className="border border-gray-300 p-2">Crop Type</th>
                <th className="border border-gray-300 p-2">Credit Score</th>
              </tr>
            </thead>
            <tbody>
              {userEntries.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{entry.farmerName}</td>
                  <td className="border border-gray-300 p-2">{entry.cropType}</td>
                  <td className="border border-gray-300 p-2">{entry.creditScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={downloadExcel} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            View File
          </button>
        </div>
      )}
    </div>
  );
}

export default CreditEvaluation;