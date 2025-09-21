import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import MapView from '../components/MapView';
import DataFilters from '../components/DataFilters';
import { Search, Filter, Map, MessageSquare } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const Explore = () => {
  const [activeView, setActiveView] = useState('map');
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [filters, setFilters] = useState({
    region: 'Global',
    parameter: 'temperature',
    dateRange: '1year',
    depthRange: { min: 0, max: 2000 },
    quality: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const viewOptions = [
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFloatSelect = (float) => {
    setSelectedFloat(float);
  };

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
                Explore Ocean Data
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Interact with ARGO float data through maps and conversational AI
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                {viewOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActiveView(option.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeView === option.id
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
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-1"
            >
              <DataFilters 
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
            </motion.div>
          )}
          
          {/* Main Content Area */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'map' ? (
                <div className="space-y-6">
                  {/* Map Container */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Map className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white">
                              Global ARGO Float Network
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {filters.region} • {filters.parameter} • {filters.dateRange}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {selectedFloat ? `Float ${selectedFloat.id} selected` : 'Click a float for details'}
                        </div>
                      </div>
                    </div>
                    
                    <MapView 
                      selectedRegion={filters.region}
                      onFloatSelect={handleFloatSelect}
                    />
                  </div>
                  
                  {/* Selected Float Details */}
                  {selectedFloat && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6"
                    >
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                        Float {selectedFloat.id} Details
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Position</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedFloat.latitude.toFixed(2)}°N, {selectedFloat.longitude.toFixed(2)}°W
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Temperature</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedFloat.temperature}°C
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Salinity</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedFloat.salinity} PSU
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Depth</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedFloat.depth}m
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Chat Interface */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white">
                            AI-Powered Data Assistant
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Ask questions about ocean data in natural language
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <ChatInterface />
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="p-4 text-left border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="font-medium text-slate-800 dark:text-white mb-1">
                          Temperature Trends
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Analyze temperature changes over time
                        </div>
                      </button>
                      <button className="p-4 text-left border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="font-medium text-slate-800 dark:text-white mb-1">
                          Salinity Profiles
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Explore salinity variations by depth
                        </div>
                      </button>
                      <button className="p-4 text-left border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="font-medium text-slate-800 dark:text-white mb-1">
                          Float Trajectories
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Track float movements and paths
                        </div>
                      </button>
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

export default Explore;