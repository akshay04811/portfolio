import React, { useState } from 'react';
import {
  Car,
  FolderGit2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  CheckCircle,
  Calendar,
  DollarSign,
  Fuel,
  Cpu,
  ChevronRight,
  X,
  Code,
  Smartphone,
  Eye
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { filterProjects } from '../utils/portfolioLogic';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // DriveFlow Interactive Simulator State
  const [showDriveFlowDemo, setShowDriveFlowDemo] = useState<boolean>(false);
  const [demoTab, setDemoTab] = useState<'rent' | 'buy'>('rent');
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number>(0);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const categories = ['All', 'Main', 'Web App', 'Python Scripting', 'Quality Assurance'];
  const filteredProjects = filterProjects(projects, searchQuery, selectedCategory);

  // Mock fleet for DriveFlow interactive simulator
  const demoCars = [
    {
      name: 'Hyundai Creta SX (O)',
      category: 'SUV',
      fuel: 'Petrol / Automatic',
      dailyRate: 45,
      buyPrice: '$21,500',
      seats: '5 Seater',
      mileage: '17.4 kmpl',
      status: 'Available'
    },
    {
      name: 'Toyota Innova Crysta',
      category: 'Premium MPV',
      fuel: 'Diesel / Manual',
      dailyRate: 65,
      buyPrice: '$28,000',
      seats: '7 Seater',
      mileage: '15.2 kmpl',
      status: 'Available'
    },
    {
      name: 'Honda City ZX',
      category: 'Sedan',
      fuel: 'Petrol / CVT',
      dailyRate: 40,
      buyPrice: '$18,900',
      seats: '5 Seater',
      mileage: '18.1 kmpl',
      status: 'Available'
    },
    {
      name: 'Tata Nexon EV',
      category: 'Electric Compact',
      fuel: 'Electric (312km range)',
      dailyRate: 50,
      buyPrice: '$20,200',
      seats: '5 Seater',
      mileage: '312 km/charge',
      status: 'Available'
    }
  ];

  const currentCar = demoCars[selectedCarIndex];
  const calculatedRentalTotal = currentCar.dailyRate * rentalDays;

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO & CAPSTONE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Real software built for real problems. Exploring full-stack design, automated workflows, and comprehensive quality assurance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="max-w-3xl mx-auto mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 font-semibold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-white/5 hover:bg-slate-800/60'
              }`}
            >
              {cat === 'Main' ? '⭐ Flagship Project' : cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project) => {
            const isMain = project.isMainProject;

            return (
              <div
                key={project.id}
                className={`relative rounded-3xl transition-all duration-300 ${
                  isMain
                    ? 'p-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-blue-500/20'
                    : 'glass-panel border border-white/10'
                }`}
              >
                <div className="bg-[#0b1022]/95 backdrop-blur-xl rounded-[22px] p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Project Details & Information */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {isMain && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-blue-500/30">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>MAIN CAPSTONE PROJECT</span>
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-blue-300 border border-blue-500/20">
                          {project.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-blue-300/90">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {project.overview}
                      </p>

                      {/* Key Features List Preview */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Key Capabilities:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          {project.keyFeatures.slice(0, 4).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat.split(':')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        {isMain && (
                          <button
                            type="button"
                            onClick={() => setShowDriveFlowDemo(true)}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/30 flex items-center gap-2 active:scale-95 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Launch Live Simulator</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center gap-2 active:scale-95 transition-all"
                        >
                          <Layers className="w-4 h-4 text-purple-400" />
                          <span>Case Study &amp; Architecture</span>
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-colors"
                            title="View Repository"
                            aria-label="View Project on GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: Visual Showcase Mockup */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl bg-[#070b16] border border-white/10 p-5 shadow-2xl overflow-hidden group">
                        {/* Decorative Top Browser Bar */}
                        <div className="flex items-center justify-between pb-4 border-b border-white/5 text-[11px] font-mono text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="text-slate-500 truncate max-w-[180px]">
                            {isMain ? 'driveflow-portal.local' : `${project.id}.local`}
                          </span>
                        </div>

                        {/* Visual Mockup Container */}
                        <div className="py-5 space-y-4">
                          {isMain ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                                    <Car className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-white">DriveFlow Portal</div>
                                    <div className="text-[10px] text-slate-400">Rentals &amp; Direct Sales</div>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  Live Demo Ready
                                </span>
                              </div>

                              {/* Mini Car Preview Card */}
                              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#0d162e] border border-blue-500/20 space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="text-xs font-bold text-white">Featured: Creta SUV</div>
                                    <div className="text-[11px] text-slate-400">5 Seater • Automatic • Petrol</div>
                                  </div>
                                  <span className="text-xs font-bold font-mono text-blue-400">$45/day</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1">
                                  <div className="bg-slate-950/60 p-2 rounded-lg border border-white/5">
                                    <span className="text-slate-500 block">Mileage</span>
                                    <span className="font-semibold text-white">17.4 kmpl</span>
                                  </div>
                                  <div className="bg-slate-950/60 p-2 rounded-lg border border-white/5">
                                    <span className="text-slate-500 block">Instant Tariff</span>
                                    <span className="font-semibold text-emerald-400">Calculated</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setShowDriveFlowDemo(true)}
                                  className="w-full py-2 rounded-lg text-xs font-semibold text-white bg-blue-600/80 hover:bg-blue-600 flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <span>Test DriveFlow Simulator</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
                              <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-semibold text-white">Project Highlights</span>
                              </div>
                              <div className="space-y-1.5 text-xs text-slate-300">
                                {project.architecture.map((arch, aIdx) => (
                                  <p key={aIdx} className="text-[11px] text-slate-400 font-mono">
                                    • {arch}
                                  </p>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveModalProject(project)}
                                className="w-full py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:text-white transition-colors"
                              >
                                View Case Details
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Project Stats Footer */}
                        {project.stats && (
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-center">
                            {project.stats.slice(0, 3).map((st, sIdx) => (
                              <div key={sIdx} className="p-2 rounded-lg bg-slate-950/40">
                                <span className="text-xs font-bold text-white block">{st.value}</span>
                                <span className="text-[10px] text-slate-400 truncate block">{st.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* DRIVEFLOW INTERACTIVE SIMULATOR MODAL */}
      {/* ========================================================================= */}
      {showDriveFlowDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0f24] border border-blue-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>DriveFlow Interactive Portal Simulator</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Prototype
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Capstone Project by Akshay B • Python / Web Architecture
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowDriveFlowDemo(false);
                  setBookingSuccess(false);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close simulator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher: Rentals vs Sales */}
            <div className="flex items-center justify-between gap-4 p-1.5 rounded-2xl bg-slate-900 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setDemoTab('rent');
                  setBookingSuccess(false);
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  demoTab === 'rent'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🚗 Car Rental Fleet &amp; Tariff Calculator
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemoTab('buy');
                  setBookingSuccess(false);
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  demoTab === 'buy'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏷️ Vehicle Sales Showroom
              </button>
            </div>

            {/* Main Interactive Fleet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Fleet Selection List */}
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select a Vehicle:
                </span>
                <div className="space-y-2.5">
                  {demoCars.map((car, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedCarIndex(idx);
                        setBookingSuccess(false);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedCarIndex === idx
                          ? 'bg-blue-950/50 border-blue-400 shadow-md shadow-blue-500/10'
                          : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{car.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {car.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {car.fuel} • {car.seats}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-blue-400 block">
                          {demoTab === 'rent' ? `$${car.dailyRate}/day` : car.buyPrice}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          {car.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator & Booking Form Mockup */}
              <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-white/10 p-5 space-y-4">
                <div className="space-y-1 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-blue-400">Selected Vehicle</span>
                  <h4 className="text-sm font-bold text-white">{currentCar.name}</h4>
                  <p className="text-xs text-slate-400">{currentCar.fuel} • {currentCar.seats}</p>
                </div>

                {demoTab === 'rent' ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-slate-300">
                      Rental Duration (Days): <span className="text-blue-400 font-bold">{rentalDays}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />

                    {/* Calculated Price Breakdown */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Daily Rate:</span>
                        <span>${currentCar.dailyRate} / day</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Days Selected:</span>
                        <span>{rentalDays} days</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Security Deposit (Refundable):</span>
                        <span>$100</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                        <span>Estimated Total:</span>
                        <span className="text-emerald-400 font-mono">${calculatedRentalTotal + 100}</span>
                      </div>
                    </div>

                    {bookingSuccess ? (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center space-y-1">
                        <CheckCircle className="w-5 h-5 mx-auto text-emerald-400" />
                        <p className="font-bold">Reservation Request Simulated!</p>
                        <p className="text-[11px] text-emerald-400/80">
                          DriveFlow recorded booking for {currentCar.name} ({rentalDays} days).
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBookingSuccess(true)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 active:scale-95"
                      >
                        Book {currentCar.name} Now
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Showroom Sticker Price:</span>
                        <span className="text-white font-mono font-bold">{currentCar.buyPrice}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Registration &amp; Warranty:</span>
                        <span className="text-emerald-400">Included</span>
                      </div>
                    </div>

                    {bookingSuccess ? (
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs text-center space-y-1">
                        <CheckCircle className="w-5 h-5 mx-auto text-purple-400" />
                        <p className="font-bold">Inquiry Sent to Dealership!</p>
                        <p className="text-[11px] text-purple-300/80">
                          DriveFlow sales engine routed your inquiry.
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBookingSuccess(true)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30 active:scale-95"
                      >
                        Request Quote / Schedule Test Drive
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAILED CASE STUDY & ARCHITECTURE MODAL */}
      {/* ========================================================================= */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a0f24] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Case Study &amp; System Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Problem Statement */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-blue-300 font-mono uppercase tracking-wider">
                1. Problem Statement
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
                {activeModalProject.problemStatement}
              </p>
            </div>

            {/* Features Breakdown */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-purple-300 font-mono uppercase tracking-wider">
                2. Key Engineering Features
              </h4>
              <div className="space-y-2">
                {activeModalProject.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-xs text-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 font-mono text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Architecture */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-emerald-300 font-mono uppercase tracking-wider">
                3. Technical Architecture &amp; Data Flow
              </h4>
              <div className="space-y-2">
                {activeModalProject.architecture.map((arch, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-emerald-500/20 text-xs text-slate-200">
                    {arch}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
