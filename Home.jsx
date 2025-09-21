import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, Globe, BarChart3, MessageSquare, ArrowRight, Users, Database, TrendingUp } from 'lucide-react';
import { fadeIn, slideUp } from '../utils/motion';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'Conversational Interface',
      description: 'Ask questions about ocean data in natural language and get instant insights.',
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
    },
    {
      icon: Globe,
      title: 'Interactive Maps',
      description: 'Explore ARGO float positions and data across global ocean regions.',
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Visualize temperature, salinity, and depth profiles with powerful charts.',
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
    },
    {
      icon: Database,
      title: 'Data Export',
      description: 'Export filtered data in multiple formats including CSV, NetCDF, and PNG.',
      color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600'
    }
  ];

  const stats = [
    { label: 'Active Floats', value: '4,000+', icon: Waves },
    { label: 'Ocean Profiles', value: '2.5M+', icon: TrendingUp },
    { label: 'Global Coverage', value: '100%', icon: Globe },
    { label: 'Research Teams', value: '500+', icon: Users }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={slideUp}
              className="flex justify-center mb-8"
            >
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Waves className="h-16 w-16 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              variants={slideUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Ocean ARGO
              <span className="block text-blue-200">Data Platform</span>
            </motion.h1>
            
            <motion.p
              variants={slideUp}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Explore the world's oceans through advanced data visualization and AI-powered insights from the global ARGO float network.
            </motion.p>
            
            <motion.div
              variants={slideUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/explore')}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explore Data</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/analytics')}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Analytics
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.1)"
              animate={{
                d: [
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                  "M0,80 C300,40 900,100 1200,80 L1200,120 L0,120 Z",
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Powerful Ocean Data Tools
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Access comprehensive oceanographic data through intuitive interfaces designed for researchers and scientists worldwide.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className={`p-3 rounded-lg ${feature.color} mb-4 inline-block`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore Ocean Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your journey into oceanographic research with our comprehensive data platform.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;