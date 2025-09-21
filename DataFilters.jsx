import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, MapPin, Layers, Sliders } from 'lucide-react';

const DataFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    region: 'Global',
    parameter: 'temperature',
    dateRange: '1year',
    depthRange: { min: 0, max: 2000 },
    quality: 'all'
  });

  const regions = [
    'Global',
    'North Atlantic',
    'South Atlantic', 
    'North Pacific',
    'South Pacific',
    'Indian Ocean',
    'Arctic Ocean',
    'Southern Ocean',
    'Mediterranean Sea',
    'Gulf of Mexico'
  ];

  const parameters = [
    { value: 'temperature', label: 'Temperature', unit: '°C' },
    { value: 'salinity', label: 'Salinity', unit: 'PSU' },
    { value: 'pressure', label: 'Pressure', unit: 'dbar' },
    { value: 'oxygen', label: 'Dissolved Oxygen', unit: 'μmol/kg' },
    { value: 'ph', label: 'pH', unit: '' },
    { value: 'nitrate', label: 'Nitrate', unit: 'μmol/kg' },
    { value: 'chlorophyll', label: 'Chlorophyll', unit: 'mg/m³' }
  ];

  const dateRanges = [
    { value: '1week', label: 'Last Week' },
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' },
    { value: '5years', label: 'Last 5 Years' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const qualityLevels = [
    { value: 'all', label: 'All Data' },
    { value: 'good', label: 'Good Quality Only' },
    { value: 'realtime', label: 'Real-time' },
    { value: 'delayed', label: 'Delayed Mode' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleDepthChange = (type, value) => {
    const newDepthRange = { ...filters.depthRange, [type]: parseInt(value) };
    handleFilterChange('depthRange', newDepthRange);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: 'Global',
      parameter: 'temperature',
      dateRange: '1year',
      depthRange: { min: 0, max: 2000 },
      quality: 'all'
    };
    setFilters(defaultFilters);
    onFilterChange && onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Data Filters</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Customize your data selection
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sliders className="h-5 w-5 text-slate-400" />
          </motion.div>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          {/* Region Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Geographic Region
              </label>
            </div>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Parameter Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Layers className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Parameter
              </label>
            </div>
            <select
              value={filters.parameter}
              onChange={(e) => handleFilterChange('parameter', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {parameters.map((param) => (
                <option key={param.value} value={param.value}>
                  {param.label} {param.unit && `(${param.unit})`}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Time Period
              </label>
            </div>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Depth Range Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sliders className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Depth Range (meters)
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Min Depth</label>
                <input
                  type="number"
                  value={filters.depthRange.min}
                  onChange={(e) => handleDepthChange('min', e.target.value)}
                  min="0"
                  max="6000"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Max Depth</label>
                <input
                  type="number"
                  value={filters.depthRange.max}
                  onChange={(e) => handleDepthChange('max', e.target.value)}
                  min="0"
                  max="6000"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Quality Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Data Quality
              </label>
            </div>
            <select
              value={filters.quality}
              onChange={(e) => handleFilterChange('quality', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {qualityLevels.map((level) => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onFilterChange && onFilterChange(filters)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DataFilters;