// components/ProfessionalCardStack.jsx
"use client";

import { motion } from "framer-motion";
import {
  FaChartLine,
  FaMobileAlt,
  FaCode,
  FaSearch,
  FaBell,
  FaUser,
  FaHome,
  FaFile,
  FaCog,
  FaPlus,
  FaClipboardList,
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

const TEAM = [
  { name: "Ansh Rajput", role: "Lead Developer", color: "from-sky-500 to-sky-700" },
  { name: "Paramhansh", role: "Product", color: "from-indigo-500 to-indigo-700" },
  { name: "Prashant", role: "Full-Stack", color: "from-emerald-500 to-emerald-700" },
  { name: "Nitin", role: "DevOps", color: "from-amber-500 to-amber-700" },
];

export default function ProfessionalCardStack() {
  return (
    <div className="w-full lg:w-1/2 lg:flex justify-center hidden">
      <div className="relative w-full max-w-xl h-[520px]">
        {/* soft background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-16 -left-10 w-72 h-72 bg-sky-200/40 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-indigo-200/40 blur-3xl rounded-full" />
        </div>

        <div
          className="relative w-full h-full"
          style={{ perspective: "1200px" }}
        >
          {/* Main dashboard card */}
          <motion.div
            className="relative z-10 overflow-hidden rounded-3xl border border-sky-100 bg-white/75 backdrop-blur-xl shadow-[0_25px_60px_-20px_rgba(2,132,199,0.35)]"
            animate={{ y: [0, -10, 0], rotateY: [0, 3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* top accent line */}
            <div className="h-[3px] bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400" />

            {/* Header */}
            <div className="flex items-center px-5 py-4 bg-gradient-to-l from-sky-500 to-sky-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-white text-sm" />
                </div>
                <div className="leading-tight">
                  <h3 className="text-white font-semibold text-sm">Analytics Dashboard</h3>
                  <p className="text-white/80 text-[11px]">Softkingo • Live metrics</p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <FaSearch className="text-white/90 text-xs" />
                </button>
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <FaBell className="text-white/90 text-xs" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/30 bg-white/10 flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="flex gap-5">
                {/* Sidebar */}
                <div className="w-[28%]">
                  <div className="space-y-1 mb-5">
                    <Item active icon={<FaHome className="text-xs" />} label="Dashboard" />
                    <Item icon={<FaMobileAlt className="text-xs" />} label="Devices" />
                    <Item icon={<FaFile className="text-xs" />} label="Reports" />
                    <Item icon={<FaUser className="text-xs" />} label="Users" />
                    <Item icon={<FaCog className="text-xs" />} label="Settings" />
                  </div>

                  {/* mini card */}
                  <div className="rounded-2xl bg-sky-50 border border-sky-100 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] text-slate-600 font-medium">Active Users</p>
                      <span className="text-[11px] text-sky-700 font-semibold">+12%</span>
                    </div>
                    <div className="flex items-end h-16 gap-1">
                      {[32, 44, 58, 62, 78].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-sky-600 to-sky-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* team strip */}
                  {/* <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-3">
                    <p className="text-[11px] text-slate-600 font-medium mb-2">Our Team</p>
                    <div className="flex -space-x-2">
                      {TEAM.map((m) => (
                        <div
                          key={m.name}
                          title={m.name}
                          className={`w-9 h-9 rounded-full border-2 border-white shadow-sm bg-gradient-to-br ${m.color} flex items-center justify-center`}
                        >
                          <span className="text-white text-[11px] font-bold">
                            {m.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500">
                      Ansh Rajput • Paramhansh • Prashant • Nitin
                    </div>
                  </div> */}
                </div>

                {/* Main content */}
                <div className="w-[72%]">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <Stat
                      title="Total Users"
                      value="24.8K"
                      delta="↑12.4%"
                      icon={<FaUser className="text-xs text-sky-600" />}
                    />
                    <Stat
                      title="Sessions"
                      value="142K"
                      delta="↑8.2%"
                      icon={<FaChartLine className="text-xs text-sky-600" />}
                    />
                    <Stat
                      title="Uptime"
                      value="99.9%"
                      delta="↑0.2%"
                      icon={<FaShieldAlt className="text-xs text-sky-600" />}
                    />
                  </div>

                  {/* Performance strip */}
                  {/* <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-500 p-4 text-white border border-white/10 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-white/80">Performance</p>
                        <p className="font-semibold text-sm">Realtime Platform Health</p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-1 rounded-full bg-white/15">Trending</span>
                        <span className="font-semibold">↑24%</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-end gap-1 h-16">
                      {[35, 52, 48, 66, 74, 58, 80, 62, 70, 76, 64, 78].map((h, i) => (
                        <div key={i} className="flex-1">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-white/10 to-white/60"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-white/75">
                      <span>Last 30 days</span>
                      <span className="inline-flex items-center gap-1">
                        <FaBolt /> Optimized
                      </span>
                    </div>
                  </div> */}

                  {/* Recent activity */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm">Recent Activity</h4>
                      <span className="text-sky-600 text-xs font-medium">View All</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        
                        { txt: "Paramhansh Singh updated roadmap", time: "5h ago" },
                        { txt: "Prashant kumar fixed payment flow edge case", time: "1d ago" },
                        { txt: "Ansh Raj singh deployed new build", time: "2h ago" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
                            <div className="w-2 h-2 bg-sky-600 rounded-full" />
                          </div>
                          <span className="text-slate-700 text-[13px]">{item.txt}</span>
                          <span className="ml-auto text-slate-400 text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating action button */}
              <div className="absolute bottom-4 right-4 w-11 h-11 bg-gradient-to-br from-sky-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <FaPlus className="text-white text-sm" />
              </div>
            </div>
          </motion.div>

          {/* Floating Mobile card */}
          <motion.div
            className="absolute -bottom-8 -right-14 w-[42%] max-w-xs rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-xl shadow-2xl p-4 z-20"
            animate={{ y: [0, -10, 0], rotateY: [0, 6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3 shadow-md">
                <FaMobileAlt className="text-white text-base" />
              </div>
              <div className="leading-tight">
                <h4 className="font-semibold text-slate-900 text-sm">Softkingo App</h4>
                <p className="text-slate-500 text-[11px]">Mobile • UI Preview</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 h-44">
              <div className="absolute inset-2 bg-white rounded-xl overflow-hidden shadow-sm">
                {/* Status bar */}
                <div className="flex justify-between items-center h-6 bg-gradient-to-r from-sky-500 to-indigo-500 px-3">
                  <span className="text-white text-[10px] font-semibold">9:41</span>
                  <div className="flex items-center space-x-1">
                    <FaSignal className="text-white text-[10px]" />
                    <FaWifi className="text-white text-[10px]" />
                    <FaBatteryFull className="text-white text-[10px]" />
                  </div>
                </div>

                {/* tiles */}
                <div className="p-2 grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-slate-100 flex items-center justify-center h-8"
                    >
                      <div className="w-2 h-2 bg-sky-300 rounded-full" />
                    </div>
                  ))}
                </div>

                {/* notification */}
                <div className="mx-2 mb-2 flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl p-2">
                  <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center">
                    <FaBell className="text-white text-[10px]" />
                  </div>
                  <p className="text-slate-700 text-[11px]">3 new notifications</p>
                  <span className="ml-auto text-slate-400 text-[10px]">now</span>
                </div>

                {/* nav */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-slate-200 flex items-center justify-around">
                  <FaHome className="text-sky-600 text-base" />
                  <FaClipboardList className="text-slate-400 text-base" />
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-indigo-500 rounded-full flex items-center justify-center -mt-5 shadow-lg">
                    <FaPlus className="text-white text-sm" />
                  </div>
                  <FaUser className="text-slate-400 text-base" />
                  <FaCog className="text-slate-400 text-base" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Web card */}
          <motion.div
            className="absolute -top-14 -left-40 w-[52%] rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-xl p-3 z-20"
            animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-sky-600 to-indigo-500 rounded-lg flex items-center justify-center">
                  <FaCode className="text-white text-xs" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Web Application</h4>
                  <p className="text-[10px] text-slate-500">Admin • Preview</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Online
              </span>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              {/* Browser header */}
              <div className="h-7 bg-slate-100 flex items-center px-2 gap-2">
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-full h-4 text-[9px] flex items-center px-2 text-slate-500">
                  www.softkingo.com/dashboard
                </div>
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <FaUser className="text-slate-500 text-[9px]" />
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-2 flex gap-2">
                <div className="w-1/4 bg-slate-50 rounded-lg p-2">
                  <div className="h-1.5 bg-slate-200 rounded-full mb-2 w-3/4" />
                  <div className="h-1.5 bg-slate-200 rounded-full mb-2 w-1/2" />
                  {/* <div className="h-1.5 bg-slate-200 rounded-full w-5/6" /> */}
                </div>

                <div className="w-3/4 rounded-lg bg-slate-50 p-2 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-sky-100 rounded flex items-center justify-center">
                      <FaChartLine className="text-sky-600 text-[9px]" />
                    </div>
                    <div className="text-[11px] text-slate-700 font-medium">Dashboard</div>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full mb-2 w-3/4" />
                  {/* <div className="h-1.5 bg-slate-200 rounded-full mb-2 w-1/2" /> */}
                  {/* <div className="h-1.5 bg-slate-200 rounded-full w-5/6" /> */}

                  <div className="absolute bottom-2 right-2 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center shadow-md">
                    <FaPlus className="text-white text-[10px]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* tiny floating chip */}
          <motion.div
            className="absolute top-24 right-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-md px-3 py-2 z-20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <FaBolt className="text-emerald-700 text-xs" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold text-slate-800">Build Status</p>
                <p className="text-[10px] text-slate-500">Passing • Nitin</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Item({ active, icon, label }) {
  return (
    <div
      className={[
        "flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors",
        active
          ? "bg-sky-50 border-sky-200 text-sky-700"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      <span className={active ? "text-sky-600" : "text-slate-400"}>{icon}</span>
      <span className={active ? "font-semibold text-[13px]" : "text-[13px]"}>
        {label}
      </span>
    </div>
  );
}

function Stat({ title, value, delta, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-[11px] mb-1">{title}</p>
          <p className="font-bold text-[18px] text-slate-900 leading-none">{value}</p>
        </div>
        <div className="w-8 h-8 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <span className="text-emerald-600 text-[11px] font-semibold">{delta}</span>
        <span className="text-slate-400 text-[11px]">this month</span>
      </div>
    </div>
  );
}
