import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Database, Image, Settings, CheckCircle } from 'lucide-react';

const ExportPanel = ({ selectedData, filters }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeMetadata: true,
    includeQualityFlags: true,
    dateFormat: 'iso',
    compression: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Comma-separated values for spreadsheet applications',
      icon: FileText,
      size: '~2.5MB'
    },
    {
      id: 'netcdf',
      name: 'NetCDF',
      description: 'Network Common Data Form for scientific data',
      icon: Database,
      size: '~1.8MB'
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'JavaScript Object Notation for web applications',
      icon: FileText,
      size: '~3.2MB'
    },
    {
      id: 'png',
      name: 'PNG Image',
      description: 'High-resolution chart export',
      icon: Image,
      size: '~800KB'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportComplete(false);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      
      // Reset completion status after 3 seconds
      setTimeout(() => {
        setExportComplete(false);
      }, 3000);
    }, 2000);
  };

  const handleOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Download className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">Export Data</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Download your filtered oceanographic data
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Export Format Selection */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Select Export Format
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <motion.button
                  key={format.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExportFormat(format.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    exportFormat === format.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${
                      exportFormat === format.id ? 'text-blue-600' : 'text-slate-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          exportFormat === format.id 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {format.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {format.size}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {format.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Export Options */}
        {exportFormat !== 'png' && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Settings className="h-4 w-4 text-slate-500" />
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Export Options
              </h4>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeMetadata}
                  onChange={(e) => handleOptionChange('includeMetadata', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Include metadata and float information
                </span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeQualityFlags}
                  onChange={(e) => handleOptionChange('includeQualityFlags', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Include quality control flags
                </span>
              </label>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-700 dark:text-slate-300 min-w-0 flex-shrink-0">
                  Date format:
                </span>
                <select
                  value={exportOptions.dateFormat}
                  onChange={(e) => handleOptionChange('dateFormat', e.target.value)}
                  className="flex-1 px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="iso">ISO 8601 (2024-01-15T10:30:00Z)</option>
                  <option value="excel">Excel format (1/15/2024 10:30)</option>
                  <option value="julian">Julian day</option>
                </select>
              </div>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.compression}
                  onChange={(e) => handleOptionChange('compression', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Compress file (ZIP format)
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Data Summary */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Export Summary
          </h4>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <div>Region: {filters?.region || 'Global'}</div>
            <div>Parameter: {filters?.parameter || 'Temperature'}</div>
            <div>Time Range: {filters?.dateRange || 'Last year'}</div>
            <div>Estimated Records: ~15,847 measurements</div>
            <div>Float Count: 342 active floats</div>
          </div>
        </div>

        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={isExporting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
            exportComplete
              ? 'bg-green-600 text-white'
              : isExporting
              ? 'bg-blue-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {exportComplete ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Export Complete!</span>
            </>
          ) : isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </>
          )}
        </motion.button>

        {exportComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-green-600 dark:text-green-400"
          >
            Your data has been prepared for download. Check your downloads folder.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExportPanel;