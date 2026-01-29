import React, { useState } from 'react';
import { Download } from 'lucide-react';

export default function QuantumSDKDashboard() {
  const [installStep, setInstallStep] = useState(0);
  const installCommand = 'rm -rf QKDISN_VERIFY 2>/dev/null; git clone -b QKDISN --depth=1 https://github.com/shellworlds/TFIMTDMVEQ.git QKDISN_VERIFY && cd QKDISN_VERIFY && read -p "Enter quantum code: " code && python3 quantum_verify.py "$code"';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a5568] via-[#5a6678] to-[#6b7688] text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Quantum SDK Dashboard</h1>
      <button 
        onClick={() => setInstallStep(1)}
        className="px-6 py-3 bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black rounded-lg font-medium"
      >
        <Download className="w-5 h-5 inline mr-2" />
        Install SDK Now
      </button>
      
      {installStep > 0 && (
        <div className="mt-8 p-6 bg-black/50 rounded-xl">
          <h3 className="text-xl text-[#bef264] mb-4">Installation Command:</h3>
          <pre className="bg-black/70 p-4 rounded-lg overflow-x-auto text-sm">
            {installCommand}
          </pre>
          <p className="mt-4 text-white/70">
            Copy this command and paste in Termux after installation.
          </p>
        </div>
      )}
    </div>
  );
}
