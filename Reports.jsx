import React from 'react';
import { FileText, Download, Share2 } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Monthly Farm Performance Report',
      date: '2025-02-15',
      type: 'Performance Analysis'
    },
    {
      id: 2,
      title: 'Soil Health Assessment',
      date: '2025-02-10',
      type: 'Environmental Report'
    },
    {
      id: 3,
      title: 'Credit Score History',
      date: '2025-02-05',
      type: 'Financial Report'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reports & Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map(report => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="text-green-600 h-6 w-6" />
              <h2 className="text-xl font-semibold">{report.title}</h2>
            </div>
            <div className="text-gray-600 mb-4">
              <p>Type: {report.type}</p>
              <p>Generated: {new Date(report.date).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Generate Custom Report</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Farm Performance Analysis</option>
              <option>Environmental Impact Assessment</option>
              <option>Financial Health Report</option>
              <option>Credit Score Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Generate Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reports;