import { useState } from 'react';
import { Fingerprint } from 'lucide-react';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[14:02:11] INITIALIZING SIMULATION...']);
  const [password, setPassword] = useState('');

  const handleSimulate = () => {
    if (isLocked) {
      setLogs(prev => [...prev, '[SYSTEM] Account locked. Contact admin.']);
      return;
    }

    if (password === 'mockpassword123') {
      setLogs(prev => [...prev, '[SUCCESS] Correct credentials provided.', '[ACCESS] Access Granted']);
      alert('Access Granted');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setLogs(prev => [...prev, `[FAIL] Attempt ${newAttempts}: Invalid credentials`]);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLogs(prev => [...prev, '[ALERT] Rate limit engaged.', '[CRITICAL] Account locked due to repeated failures.']);
      }
    }
    setPassword('');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-white font-sans text-center">
        <h1 className="text-4xl font-bold mb-8">Authorized Security Portal</h1>
        <button 
          onClick={() => setIsAuthorized(true)}
          className="group flex flex-col items-center gap-6 p-12 bg-slate-900 border border-slate-700 rounded-3xl hover:border-amber-500 transition-colors cursor-pointer"
        >
          <Fingerprint className="w-32 h-32 text-amber-500 group-hover:scale-110 transition-transform" />
          <p className="text-xl font-bold text-amber-500">Put Your Thumbs In To Grant Access</p>
          <p className="text-lg text-slate-400">Welcome, Authorized Operator!</p>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white font-sans" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-4xl w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col h-[600px]">
        <header className="bg-slate-700 p-6 border-b border-slate-600 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">🛡️</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Authorized Security Portal</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Educational Access Only</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-slate-800 rounded text-xs border border-slate-600 text-slate-300">Session: {isLocked ? 'Locked' : 'Active'}</div>
            <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">Defense Mode</div>
          </div>
        </header>
        <main className="flex-1 flex overflow-hidden">
          <aside className="w-64 bg-slate-800/50 border-r border-slate-700 p-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Modules</div>
              <a href="#" className="flex items-center gap-3 p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span className="text-lg">📊</span>
                <span className="text-sm font-medium">Vulnerability Lab</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-2 rounded text-slate-400 hover:bg-slate-700 transition-colors">
                <span className="text-lg">🔒</span>
                <span className="text-sm font-medium">Encryption Test</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-2 rounded text-slate-400 hover:bg-slate-700 transition-colors">
                <span className="text-lg">📡</span>
                <span className="text-sm font-medium">Network Audit</span>
              </a>
            </nav>
            <div className="mt-auto p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-[10px] text-amber-500 font-bold uppercase mb-1">Important Notice</p>
              <p className="text-[11px] text-slate-300 leading-tight">This interface is designed for white-hat security training. Use responsibly to protect your data.</p>
            </div>
          </aside>
          <section className="flex-1 p-8 flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Brute-Force Defense Simulation</h2>
              <p className="text-slate-400 text-sm">Analyze how modern authentication systems detect and block rapid credential testing attempts.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Testing Vector</label>
                  <input type="text" value="simulation_target_01@example.com" className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-slate-300 focus:outline-none" readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-slate-300" />
                </div>
                <button onClick={handleSimulate} disabled={isLocked} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-blue-900/20 disabled:bg-slate-700 disabled:text-slate-500">
                  Run Defense Simulation
                </button>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-3 flex justify-between">
                  <span>System Threat Logs</span>
                  <span className="text-green-500">● Real-time</span>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto font-mono text-[10px] pr-2">
                  {logs.map((log, i) => <div key={i} className="text-slate-400">{log}</div>)}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="mt-8 text-slate-500 text-xs flex gap-6">
        <span>© 2024 Cybersecurity Research Lab</span>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  );
}


