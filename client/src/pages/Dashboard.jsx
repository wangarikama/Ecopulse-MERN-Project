import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  LogOut, 
  Plus, 
  Leaf, 
  Wind, 
  Zap, 
  Car, 
  ShoppingBag,
  Trash2
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [category, setCategory] = useState('transport');
  const [amount, setAmount] = useState('');
  
  const navigate = useNavigate();

  // 1. Check Auth & Fetch Data on Load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');

    if (!token) {
      navigate('/login');
      return;
    }

    setUser({ name });
    fetchLogs(token);
  }, []);

  const fetchLogs = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/logs', {
        headers: { 'x-access-token': token }
      });
      if (res.data.status === 'ok') {
        setLogs(res.data.logs);
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // 3. Handle Add Log
  const handleAddLog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Simple calculation logic (In a real app, this might be more complex)
    let multiplier = 0.2; // Default
    if (category === 'energy') multiplier = 0.5;
    if (category === 'food') multiplier = 2.0;
    
    const co2 = (parseFloat(amount) * multiplier).toFixed(2);

    try {
      await axios.post('http://localhost:5000/api/logs', {
        category,
        type: 'Standard', 
        amount: parseFloat(amount),
        co2: parseFloat(co2)
      }, {
        headers: { 'x-access-token': token }
      });
      
      setShowModal(false);
      setAmount('');
      fetchLogs(token); // Refresh data
    } catch (err) {
      alert("Failed to add log");
    }
  };

  // 4. Calculations
  const totalEmissions = logs.reduce((acc, log) => acc + log.co2, 0);

  if (loading) return <div className="min-h-screen bg-slate-950 text-emerald-500 flex items-center justify-center">Loading EcoPulse...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6">
      
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Leaf className="text-slate-900" size={20} />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            Eco<span className="text-emerald-400">Pulse</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-slate-400">Hello, <span className="text-emerald-400 font-bold">{user?.name}</span></span>
          <button onClick={handleLogout} className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-rose-400">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white">Dashboard</h2>
              <p className="text-slate-400">Overview of your sustainability impact</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all"
            >
              <Plus size={20} /> Log Emission
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              icon={Wind} 
              label="Total CO2" 
              value={`${totalEmissions.toFixed(1)} kg`} 
              color="text-emerald-400" 
              bg="bg-emerald-500/10"
            />
            <StatCard 
              icon={LayoutDashboard} 
              label="Total Logs" 
              value={logs.length} 
              color="text-cyan-400" 
              bg="bg-cyan-500/10"
            />
             <StatCard 
              icon={Leaf} 
              label="Status" 
              value={totalEmissions < 50 ? "Good" : "High"} 
              color={totalEmissions < 50 ? "text-emerald-400" : "text-rose-400"} 
              bg={totalEmissions < 50 ? "bg-emerald-500/10" : "bg-rose-500/10"}
            />
          </div>

          {/* Recent History */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 text-white">Recent Activity</h3>
            <div className="space-y-3">
              {logs.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No logs yet. Click "Log Emission" to start!</p>
              ) : (
                logs.map((log) => (
                  <div key={log._id} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        log.category === 'transport' ? 'bg-blue-500/20 text-blue-400' :
                        log.category === 'food' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {log.category === 'transport' ? <Car size={18} /> : 
                         log.category === 'food' ? <ShoppingBag size={18} /> : <Zap size={18} />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200 capitalize">{log.category}</p>
                        <p className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{log.co2} <span className="text-xs text-slate-500">kg CO2</span></p>
                      <p className="text-xs text-slate-500">{log.amount} units</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Goal */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Your Daily Limit</h3>
            <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-slate-700"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent rotate-45 transition-all duration-1000"
                style={{ transform: `rotate(${Math.min((totalEmissions / 50) * 360, 360)}deg)` }}
              ></div>
              <div className="text-3xl font-bold text-white">{Math.round((totalEmissions / 50) * 100)}%</div>
            </div>
            <p className="text-slate-400 text-sm">
              You have used <span className="text-white font-bold">{totalEmissions.toFixed(1)}kg</span> of your 50kg daily carbon budget.
            </p>
          </div>
        </div>

      </main>

      {/* Add Log Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Log New Activity</h2>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                >
                  <option value="transport">Transport (km)</option>
                  <option value="energy">Energy (kWh)</option>
                  <option value="food">Food (meals)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-1">Amount</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                  placeholder="e.g., 10"
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl font-bold bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple Helper Component
function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-slate-400 text-sm uppercase font-bold">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}