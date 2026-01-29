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

  const installCommand = 'pkg update -y && pkg install git python -y && rm -rf QKDISN_VERIFY && git clone -b QKDISN --depth=1 https://github.com/shellworlds/TFIMTDMVEQ.git QKDISN_VERIFY && cd QKDISN_VERIFY && python3 quantum_verify.py';

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
    const termuxUrl = 'termux://am start -n com.termux/.TermuxActivity -e command "' + installCommand + '"';
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
                    rows={4}
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
              </div>
            )}

            {installStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-[#bef264]/30">
                  <Terminal className="w-6 h-6 text-[#bef264]" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Installation Complete</h4>
                    <p className="text-white/60 text-sm">Opening Termux with installation command...</p>
                  </div>
                </div>
                <p className="text-white/70">If Termux doesn't open automatically:</p>
                <ol className="text-white/60 space-y-2 text-sm list-decimal list-inside">
                  <li>Open Termux app manually</li>
                  <li>Long-press in the terminal</li>
                  <li>Select "Paste"</li>
                  <li>Press Enter to execute</li>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a5568] via-[#5a6678] to-[#6b7688] text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3d4856]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <button className="px-4 md:px-6 py-2 rounded-full bg-[#5a6678]/90 text-xs md:text-[13px] font-medium text-white/90 hover:bg-[#6a7788]/90 transition-all">
              Dashboard
            </button>
            <button className="px-4 md:px-7 py-2 md:py-3 rounded-full bg-black text-xs md:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white hover:bg-gray-900 transition-all">
              Monologue
            </button>
            <button className="text-xs md:text-[11px] font-semibold tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors">Home</button>
            <button className="text-xs md:text-[11px] font-semibold tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors">Collections</button>
            <button className="text-xs md:text-[11px] font-semibold tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#bef264] rounded-full animate-pulse"></div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white/50">Status</span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white/50">Online</span>
            <span className="text-xl md:text-[32px] font-extralight ml-1 md:ml-2 text-white">99.9%</span>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12">
        <div 
          ref={sphereRef}
          className="absolute top-[5%] md:top-[10%] right-[-10%] md:right-[-5%] w-[400px] h-[400px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #000000 50%, #000000 100%)',
            boxShadow: '0 0 100px rgba(0,0,0,0.9), inset 0 0 50px rgba(255,255,255,0.03)',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <div className="absolute inset-0 rounded-full border border-white/5"></div>
          <div className="absolute top-[15%] left-[25%] w-1 h-1 md:w-2 md:h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-[35%] right-[20%] w-1 h-1 md:w-1.5 md:h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-[30%] left-[15%] w-0.5 h-0.5 md:w-1 md:h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-7">
              <div className="max-w-[800px]">
                <h1 className="text-[48px] md:text-[80px] lg:text-[120px] font-extralight leading-[0.92] mb-3 tracking-tighter text-white">
                  Deploy{' '}
                  <span className="inline-flex items-baseline">
                    <span className="inline-flex items-center justify-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[95px] lg:h-[95px] rounded-full bg-[#4a5568] text-[24px] md:text-[36px] lg:text-[48px] font-light mx-2 md:mx-3 align-middle translate-y-1 md:translate-y-2">©</span>
                  </span>{' '}
                  <span className="text-[#bef264] font-extralight">Quantum SDK.</span>
                </h1>
                <h2 className="text-[32px] md:text-[48px] lg:text-[68px] font-extralight leading-[1.05] mb-8 md:mb-16 text-white/90 tracking-tight">
                  Mobile-first intelligence<br />with terminal precision.
                </h2>

                <div className="relative max-w-[560px] bg-black/50 backdrop-blur-2xl rounded-[8px] p-6 md:p-9 border border-white/20 shadow-2xl hover:border-white/30 hover:shadow-[0_0_40px_rgba(190,242,100,0.15)] transition-all duration-500 group">
                  <h3 className="text-[24px] md:text-[30px] font-normal text-[#bef264] mb-4 md:mb-5 tracking-tight">Quantum SDK v3</h3>
                  <p className="text-[14px] md:text-[16px] font-light leading-[1.65] text-white/80 mb-6 md:mb-10">
                    One-click mobile deployment for quantum verification agents. Automated setup with Termux integration for instant verification protocols.
                  </p>
                  
                  <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
                      <span className="text-[40px] md:text-[58px] font-extralight leading-none text-[#bef264]">100%</span>
                      <button 
                        onClick={() => setInstallStep(0)}
                        className="px-6 py-3 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#bef264] to-[#9ed653] text-black font-medium hover:from-[#ceff74] hover:to-[#aee663] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl w-full md:w-auto"
                      >
                        <Download className="w-5 h-5" />
                        Install SDK Now
                      </button>
                    </div>
                    <div className="relative h-2 bg-[#3d4856] rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-full bg-[#bef264] rounded-full shadow-[0_0_15px_rgba(190,242,100,0.5)]"></div>
                    </div>
                  </div>

                  <div className="text-xs text-white/50 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#bef264] rounded-full"></div>
                      <span>Auto-Termux Detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#bef264] rounded-full"></div>
                      <span>Command Auto-Copy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#bef264] rounded-full"></div>
                      <span>Direct App Launch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 pt-8 md:pt-32">
              <div className="space-y-4 md:space-y-6 max-w-full md:max-w-[380px] md:ml-auto">
                <div className="bg-black/40 backdrop-blur-2xl rounded-[8px] p-6 md:p-8 border border-white/15 hover:border-white/25 hover:shadow-[0_0_30px_rgba(190,242,100,0.1)] transition-all duration-500 group">
                  <div className="flex items-center justify-between mb-4 md:mb-7">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a5568]/70 flex items-center justify-center text-[12px] md:text-[14px] font-medium border border-white/10 text-white/80">
                      <Terminal className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/50 mb-3 md:mb-4">Termux Integration</p>
                  <h3 className="text-[24px] md:text-[32px] font-light mb-3 md:mb-4 leading-tight text-white">Auto-Setup</h3>
                  <p className="text-[13px] md:text-[15px] font-light leading-[1.6] text-white/70">
                    Automatic installation and command execution in Termux with single click.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-2xl rounded-[8px] p-6 md:p-8 border border-white/15 hover:border-white/25 hover:shadow-[0_0_30px_rgba(190,242,100,0.1)] transition-all duration-500 group">
                  <div className="flex items-center justify-between mb-4 md:mb-7">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a5568]/70 flex items-center justify-center text-[12px] md:text-[14px] font-medium border border-white/10 text-white/80">2.</div>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/50 mb-3 md:mb-4">Verification</p>
                  <h3 className="text-[24px] md:text-[32px] font-light mb-3 md:mb-4 leading-tight text-white">Quantum Secure</h3>
                  <p className="text-[13px] md:text-[15px] font-light leading-[1.6] text-white/70">
                    Real-time quantum key verification with mobile-first deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[40px] md:bottom-[60px] left-1/2 -translate-x-1/2 flex gap-3 md:gap-5">
            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#bef264] flex items-center justify-center hover:bg-[#ceff74] hover:scale-105 transition-all shadow-[0_0_25px_rgba(190,242,100,0.3)] hover:shadow-[0_0_35px_rgba(190,242,100,0.5)]">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
            </button>
            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#bef264] flex items-center justify-center hover:bg-[#ceff74] hover:scale-105 transition-all shadow-[0_0_25px_rgba(190,242,100,0.3)] hover:shadow-[0_0_35px_rgba(190,242,100,0.5)]">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      <footer className="relative py-12 md:py-20 px-4 md:px-12 bg-[#3d4856] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 mb-8 md:mb-16">
            <div className="space-y-4 md:space-y-7">
              <div className="px-4 md:px-7 py-2 md:py-3 rounded-lg border border-gray-500 text-[10px] md:text-[11px] tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/60 inline-block">
                Quantum SDK
              </div>
              <p className="text-[13px] md:text-[15px] font-light leading-[1.7] text-white/70">
                Mobile-first quantum verification deployment. One-click setup with Termux integration for instant agent deployment.
              </p>
              <div className="flex gap-3 md:gap-4">
                <button onClick={() => window.open('https://twitter.com', '_blank')} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a5568] hover:bg-[#5a6678] flex items-center justify-center transition-all border border-white/10 hover:border-white/20">
                  <Twitter className="w-3 h-3 md:w-4 md:h-4 text-white/80" strokeWidth={1.5} />
                </button>
                <button onClick={() => window.open('https://github.com', '_blank')} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a5568] hover:bg-[#5a6678] flex items-center justify-center transition-all border border-white/10 hover:border-white/20">
                  <Github className="w-3 h-3 md:w-4 md:h-4 text-white/80" strokeWidth={1.5} />
                </button>
                <button onClick={() => window.open('https://linkedin.com', '_blank')} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4a5568] hover:bg-[#5a6678] flex items-center justify-center transition-all border border-white/10 hover:border-white/20">
                  <Linkedin className="w-3 h-3 md:w-4 md:h-4 text-white/80" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 md:mb-6 text-[14px] md:text-[16px] tracking-tight text-white">Product</h4>
              <ul className="space-y-2 md:space-y-4 text-[13px] md:text-[15px] font-light text-white/70">
                <li><button className="hover:text-white transition-colors">SDK Features</button></li>
                <li><button className="hover:text-white transition-colors">Termux Integration</button></li>
                <li><button className="hover:text-white transition-colors">Installation Guide</button></li>
                <li><button className="hover:text-white transition-colors">API Reference</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 md:mb-6 text-[14px] md:text-[16px] tracking-tight text-white">Support</h4>
              <ul className="space-y-2 md:space-y-4 text-[13px] md:text-[15px] font-light text-white/70">
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">Troubleshooting</button></li>
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
                <li><button className="hover:text-white transition-colors">Contact Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 md:mb-6 text-[14px] md:text-[16px] tracking-tight text-white">Legal</h4>
              <ul className="space-y-2 md:space-y-4 text-[13px] md:text-[15px] font-light text-white/70">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors">Security</button></li>
                <li><button className="hover:text-white transition-colors">Compliance</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[12px] md:text-[14px] font-light text-white/60 gap-4">
            <p>© 2025 Quantum SDK. All rights reserved.</p>
            <div className="flex gap-4 md:gap-10">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      {installStep >= 0 && renderInstallationModal()}
    </div>
  );
}
