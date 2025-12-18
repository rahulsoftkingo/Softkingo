// components/ProfessionalCardStack.jsx
'use client';
import { motion } from 'framer-motion';
import { FaChartLine, FaMobileAlt, FaCode, FaSearch, FaBell, FaUser, FaHome, FaFile, FaCog, FaPlus, FaClipboardList, FaSignal, FaWifi,  FaBatteryFull} from 'react-icons/fa';

const ProfessionalCardStack = () => {
  return (
    <div className="w-full lg:w-1/2 lg:flex justify-center hidden">
      <div className="relative w-full max-w-xl h-[500px] perspective-1000">
        {/* Main dashboard card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 relative z-10 overflow-hidden transform preserve-3d"
          animate={{ 
            y: [0, -10, 0],
            rotateY: [0, 3, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dashboard header */}
          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-l from-sky-400 to-sky-100 flex items-center px-5">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <FaChartLine className="text-white text-xs" />
              </div>
              <h3 className="text-white font-semibold text-sm">Analytics Dashboard</h3>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <FaSearch className="text-white/80 text-xs" />
              <FaBell className="text-white/80 text-xs" />
              <div className="w-6 h-6 rounded-full overflow-hidden border border-sky-50/30 ">
                <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-full flex items-center text-center justify-center" >
                <FaUser className="text-sky-400 text-sm" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="mt-12 flex h-full">
            {/* Sidebar */}
            <div className="w-1/4 pr-3">
              <div className="space-y-1 mb-6">
                <div className="flex items-center p-2 rounded-lg bg-[#28AFDF]/10">
                  <FaHome className="text-[#28AFDF] text-xs mr-2" />
                  <span className="text-[#28AFDF] font-medium text-sm">Dashboard</span>
                </div>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <FaMobileAlt className="text-gray-500 text-xs mr-2" />
                  <span className="text-gray-600 text-sm">Devices</span>
                </div>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <FaFile className="text-gray-500 text-xs mr-2" />
                  <span className="text-gray-600 text-sm">Reports</span>
                </div>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <FaUser className="text-gray-500 text-xs mr-2" />
                  <span className="text-gray-600 text-sm">Users</span>
                </div>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <FaCog className="text-gray-500 text-xs mr-2" />
                  <span className="text-gray-600 text-sm">Settings</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-2">Active Users</div>
                <div className="flex items-end h-16">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-[#28AFDF] to-[#1e90ff] rounded-t mx-0.5"
                      style={{ height: `${30 + i * 15}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-3/4 pl-3">
              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Total Users</p>
                      <p className="font-bold text-lg">24.8K</p>
                    </div>
                    <div className="w-8 h-8 bg-[#28AFDF]/10 rounded-full flex items-center justify-center">
                      <FaUser className="text-[#28AFDF] text-xs" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-xs font-medium mr-1">↑12.4%</span>
                    <span className="text-gray-400 text-xs">this month</span>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Sessions</p>
                      <p className="font-bold text-lg">142K</p>
                    </div>
                    <div className="w-8 h-8 bg-[#28AFDF]/10 rounded-full flex items-center justify-center">
                      <FaChartLine className="text-[#28AFDF] text-xs" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-xs font-medium mr-1">↑8.2%</span>
                    <span className="text-gray-400 text-xs">this month</span>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Retention</p>
                      <p className="font-bold text-lg">54%</p>
                    </div>
                    <div className="w-8 h-8 bg-[#28AFDF]/10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#28AFDF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-xs font-medium mr-1">↑3.1%</span>
                    <span className="text-gray-400 text-xs">this month</span>
                  </div>
                </div>
              </div>
              
              {/* Chart area */}
              <div className="bg-gradient-to-br from-[#28AFDF] to-[#1e90ff] rounded-xl p-4 hidden">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Performance Metrics</h3>
                    <p className="text-[#b3e5fc] text-xs">Last 30 days</p>
                  </div>
                  <div className="text-white text-sm font-medium flex items-center">
                    <span>↑24%</span>
                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">Trending</span>
                  </div>
                </div>
                
                {/* Chart visualization */}
                <div className="h-32 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-full flex items-end space-x-1 px-1">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 flex flex-col items-center justify-end"
                      >
                        <div 
                          className="w-3/4 bg-gradient-to-t from-[#0a7fb4] to-white/40 rounded-t"
                          style={{ height: `${40 + Math.random() * 60}%` }}
                        ></div>
                        <div className="text-[#b3e5fc] text-[8px] mt-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F'][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent activity */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Recent Activity</h4>
                  <span className="text-[#28AFDF] text-xs">View All</span>
                </div>
                <div className="space-y-2">
                  {['John Doe uploaded report', 'Sarah Smith completed task', 'Mike Johnson commented'].map((item, i) => (
                    <div key={i} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-[#28AFDF]/10 rounded-full flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-[#28AFDF] rounded-full"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                      <span className="ml-auto text-gray-400 text-xs">2h ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating action button */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#28AFDF] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <FaPlus className="text-white text-sm" />
          </div>
        </motion.div>
        
      
        {/* Floating mobile card */}
<motion.div 
  className="absolute -bottom-6 -right-16 w-2/5 max-w-xs bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 z-20 transform-style-3d"
  animate={{ 
    y: [0, -10, 0],
    rotateY: [0, 5, 0]
  }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
  style={{ transformStyle: 'preserve-3d' }}
>
  {/* Header */}
  <div className="flex items-center mb-4">
    <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
      <FaMobileAlt className="text-white text-base" />
    </div>
    <h4 className="font-semibold text-gray-900 text-sm">Softkingo App</h4>
  </div>

  {/* Screen mockup */}
  <div className="relative overflow-hidden rounded-lg border border-gray-100 shadow-inner bg-gray-50 h-40">
    {/* 3D frame edge */}
    <div className="absolute inset-0 pointer-events-none" style={{
      boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.1)'
    }} />

    {/* App UI */}
    <div className="absolute inset-2 bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Status bar */}
      <div className="flex justify-between items-center h-5 bg-gradient-to-r from-sky-400 to-sky-600 px-3">
        <span className="text-white text-[8px] font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <FaSignal className="text-white text-[8px]" />
          <FaWifi className="text-white text-[8px]" />
          <FaBatteryFull className="text-white text-[8px]" />
        </div>
      </div>

      {/* Content grid */}
      <div className="p-2 grid grid-cols-4 grid-rows-2 gap-1">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="flex items-center bg-blue-50 rounded-lg p-2 mx-2">
        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-2">
          <FaBell className="text-white text-[8px]" />
        </div>
        <p className="text-gray-700 text-[10px]">3 new notifications</p>
      </div>

      {/* Nav bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white border-t border-gray-200 flex items-center justify-around">
        <FaHome className="text-primary text-sm" />
        <FaClipboardList className="text-gray-400 text-sm" />
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center -mt-4 shadow-lg">
          <FaPlus className="text-white text-sm" />
        </div>
        <FaUser className="text-gray-400 text-sm" />
        <FaCog className="text-gray-400 text-sm" />
      </div>
    </div>
  </div>
</motion.div>

        
        {/* Floating web app card */}
        <motion.div 
          className="absolute -top-16 -left-40 w-1/2 bg-white rounded-xl shadow-xl p-3 border border-gray-100 z-20 transform preserve-3d"
          animate={{ 
            y: [0, -6, 0],
            rotate: [0, -2, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#28AFDF] to-[#1e90ff] rounded-md flex items-center justify-center mr-2">
              <FaCode className="text-white text-xs" />
            </div>
            <h4 className="font-bold text-gray-800 text-xs">Web Application</h4>
          </div>
          
          {/* Web app interface */}
          <div className="bg-gray-100 rounded-lg h-24 overflow-hidden relative">
            {/* Browser frame */}
            <div className="absolute inset-0 flex flex-col">
              {/* Browser header */}
              <div className="h-5 bg-gray-200 flex items-center px-2">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded-full h-3 text-[6px] flex items-center px-2 text-gray-500">
                  www.softkingo.com/dashboard
                </div>
                <div className="ml-2 w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500 text-[8px]" />
                </div>
              </div>
              
              {/* Browser content */}
              <div className="flex-1 bg-white p-1 flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-1">
                  <div className="h-1 bg-gray-200 rounded-full mb-1 w-3/4"></div>
                  <div className="h-1 bg-gray-200 rounded-full mb-1 w-1/2"></div>
                  <div className="h-1 bg-gray-200 rounded-full mb-1 w-5/6"></div>
                </div>
                
                {/* Main content */}
                <div className="w-3/4 p-1">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-[#28AFDF]/10 rounded mr-1 flex items-center justify-center">
                      <FaChartLine className="text-[#28AFDF] text-[6px]" />
                    </div>
                    <div className="text-xs text-gray-700">Dashboard</div>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full mb-[2px] w-3/4"></div>
                  <div className="h-1 bg-gray-200 rounded-full mb-[2px] w-1/2"></div>
                  <div className="h-1 bg-gray-200 rounded-full w-5/6"></div>
                  
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#28AFDF]/10 rounded-full flex items-center justify-center">
                    <FaPlus className="text-[#28AFDF] text-[6px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalCardStack;