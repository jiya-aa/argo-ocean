import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { mockFloats } from '../utils/mockData';

const MapView = ({ selectedRegion, onFloatSelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 35.0, lng: -40.0 });
  const [zoomLevel, setZoomLevel] = useState(3);
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [layerType, setLayerType] = useState('temperature');

  const regions = {
    'North Atlantic': { lat: 45.0, lng: -30.0, zoom: 4 },
    'Pacific': { lat: 0.0, lng: -160.0, zoom: 3 },
    'Southern Ocean': { lat: -60.0, lng: 0.0, zoom: 3 },
    'Global': { lat: 0.0, lng: 0.0, zoom: 2 }
  };

  useEffect(() => {
    if (selectedRegion && regions[selectedRegion]) {
      const region = regions[selectedRegion];
      setMapCenter({ lat: region.lat, lng: region.lng });
      setZoomLevel(region.zoom);
    }
  }, [selectedRegion]);

  const handleFloatClick = (float) => {
    setSelectedFloat(float);
    onFloatSelect && onFloatSelect(float);
  };

  const resetView = () => {
    setMapCenter({ lat: 35.0, lng: -40.0 });
    setZoomLevel(3);
    setSelectedFloat(null);
  };

  const getFloatColor = (float) => {
    if (layerType === 'temperature') {
      return float.temperature > 15 ? 'bg-red-500' : float.temperature > 10 ? 'bg-yellow-500' : 'bg-blue-500';
    } else if (layerType === 'salinity') {
      return float.salinity > 35 ? 'bg-purple-500' : float.salinity > 34 ? 'bg-indigo-500' : 'bg-cyan-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 border border-slate-200 dark:border-slate-700">
          <select
            value={layerType}
            onChange={(e) => setLayerType(e.target.value)}
            className="text-sm bg-transparent border-none focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="temperature">Temperature</option>
            <option value="salinity">Salinity</option>
            <option value="depth">Depth</option>
          </select>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 8))}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ZoomIn className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border-t border-slate-200 dark:border-slate-600"
          >
            <ZoomOut className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={resetView}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border-t border-slate-200 dark:border-slate-600"
          >
            <RotateCcw className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 mb-2">
          <Layers className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Legend</span>
        </div>
        <div className="space-y-1">
          {layerType === 'temperature' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">&gt;15°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">10-15°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">&lt;10°C</span>
              </div>
            </>
          )}
          {layerType === 'salinity' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">&gt;35 PSU</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">34-35 PSU</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">&lt;34 PSU</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Simulated Map with Float Markers */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 opacity-20"></div>
        
        {/* Ocean Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-blue-300 dark:border-blue-700"></div>
            ))}
          </div>
        </div>

        {/* Float Markers */}
        {mockFloats.map((float) => (
          <motion.div
            key={float.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
              selectedFloat?.id === float.id ? 'z-20' : 'z-10'
            }`}
            style={{
              left: `${((float.longitude + 180) / 360) * 100}%`,
              top: `${((90 - float.latitude) / 180) * 100}%`
            }}
            onClick={() => handleFloatClick(float)}
          >
            <div className={`w-3 h-3 rounded-full ${getFloatColor(float)} ${
              selectedFloat?.id === float.id 
                ? 'ring-4 ring-white dark:ring-slate-800 shadow-lg' 
                : 'shadow-md'
            }`}></div>
            
            {selectedFloat?.id === float.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700 min-w-48"
              >
                <div className="text-sm font-medium text-slate-800 dark:text-white mb-1">
                  Float {float.id}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div>Lat: {float.latitude.toFixed(2)}°</div>
                  <div>Lng: {float.longitude.toFixed(2)}°</div>
                  <div>Temp: {float.temperature}°C</div>
                  <div>Salinity: {float.salinity} PSU</div>
                  <div>Depth: {float.depth}m</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MapView;