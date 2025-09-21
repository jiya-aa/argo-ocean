import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Droplets, Thermometer, Gauge } from 'lucide-react';
import { mockTimeSeriesData, mockProfileData, mockStatistics } from '../utils/mockData';

const Dashboard = ({ selectedFloat, selectedRegion }) => {
  const [activeChart, setActiveChart] = useState('temperature');
  const [timeRange, setTimeRange] = useState('1year');

  const chartTypes = [
    { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'text-red-500' },
    { id: 'salinity', label: 'Salinity', icon: Droplets, color: 'text-blue-500' },
    { id: 'depth', label: 'Depth Profile', icon: Activity, color: 'text-green-500' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          title.includes('Temperature') ? 'bg-red-100 dark:bg-red-900/20' :
          title.includes('Salinity') ? 'bg-blue-100 dark:bg-blue-900/20' :
          'bg-green-100 dark:bg-green-900/20'
        }`}>
          <Icon className={`h-6 w-6 ${
            title.includes('Temperature') ? 'text-red-600' :
            title.includes('Salinity') ? 'text-blue-600' :
            'text-green-600'
          }`} />
        </div>
      </div>
    </motion.div>
  );

  const renderChart = () => {
    switch (activeChart) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#dc2626' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'salinity':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="salinity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'depth':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={mockProfileData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="temperature" name="Temperature" unit="°C" className="text-xs" />
              <YAxis dataKey="depth" name="Depth" unit="m" className="text-xs" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Scatter dataKey="depth" fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockStatistics.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.title.includes('Temperature') ? Thermometer : 
                  stat.title.includes('Salinity') ? Droplets : Gauge}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                Data Visualization
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedRegion ? `Region: ${selectedRegion}` : 'Global Ocean Data'}
                {selectedFloat && ` • Float ${selectedFloat.id}`}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="1year">Last Year</option>
                <option value="5years">Last 5 Years</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {chartTypes.map((chart) => {
              const Icon = chart.icon;
              return (
                <button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeChart === chart.id
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${activeChart === chart.id ? chart.color : ''}`} />
                  <span>{chart.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {renderChart()}
        </div>
      </div>

      {/* Data Insights */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Data Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Temperature Anomaly Detected</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Unusual warming trend observed in the selected region over the past 3 months.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Data Quality Excellent</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">98.5% of measurements meet quality control standards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;