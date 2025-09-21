import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import DataFilters from '../components/DataFilters';
import ExportPanel from '../components/ExportPanel';
import { BarChart3, Download, Settings, TrendingUp, Globe, Calendar } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const Analytics = () => {
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [filters, setFilters] = useState({
    region: 'Global',
    parameter: 'temperature',
    dateRange: '1year',
    depthRange: { min: 0, max: 2000 },
    quality: 'all'
  });
  const [activePanel, setActivePanel] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(true);

  const panelOptions = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'export', label: 'Export Data', icon: Download }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const quickStats = [
    {
      label: 'Active Region',
      value: filters.region,
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      label: 'Parameter',
      value: filters.parameter.charAt(0).toUpperCase() + filters.parameter.slice(1),
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Time Range',
      value: filters.dateRange === '1year' ? 'Last Year' : filters.dateRange,
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                Ocean Data Analytics
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive analysis and visualization of ARGO oceanographic data
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Panel Toggle */}
              <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                {panelOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActivePanel(option.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activePanel === option.id
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters
                    ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-600'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xl font-semibold text-slate-800 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-1 space-y-6"
            >
              <DataFilters 
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
              
              {/* Analysis Summary */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                  Analysis Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Data Points:</span>
                    <span className="font-medium text-slate-800 dark:text-white">15,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Float Count:</span>
                    <span className="font-medium text-slate-800 dark:text-white">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Coverage:</span>
                    <span className="font-medium text-slate-800 dark:text-white">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Quality:</span>
                    <span className="font-medium text-green-600">Excellent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Main Content Area */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activePanel === 'dashboard' ? (
                <Dashboard 
                  selectedFloat={selectedFloat}
                  selectedRegion={filters.region}
                />
              ) : (
                <div className="space-y-6">
                  <ExportPanel 
                    selectedData={null}
                    filters={filters}
                  />
                  
                  {/* Export History */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Recent Exports
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'North_Atlantic_Temperature_2024.csv', date: '2024-01-15', size: '2.3 MB' },
                        { name: 'Global_Salinity_Profile.netcdf', date: '2024-01-14', size: '1.8 MB' },
                        { name: 'Pacific_Ocean_Data.json', date: '2024-01-13', size: '3.1 MB' }
                      ].map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white text-sm">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {file.date} • {file.size}
                            </p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;