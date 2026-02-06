
import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Demo } from '../types';
import { GeminiService } from '../services/geminiService';

export const DemoPlayer = ({ demo, onClose, t }: { demo: Demo, onClose: () => void, t: any }) => {
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'ai'>('concept');
  const [iframeKey, setIframeKey] = useState(0); // to force reload
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'ai' && !aiResponse) {
      setAiResponse(t('chatWelcome'));
    }
  }, [activeTab, aiResponse, t]);

  const handleDemoAiAsk = async (query: string) => {
      setAiLoading(true);
      const res = await GeminiService.chat(query, `Title: ${demo.title}, Code snippet: ${demo.code.substring(0, 500)}...`);
      setAiResponse(res);
      setAiLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-0 md:p-6"
    >
      <div className="w-full h-full bg-slate-900 md:rounded-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-slate-800">
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 z-20 bg-black/30 hover:bg-black/50 backdrop-blur text-white p-2 rounded-lg transition-colors border border-white/20"
          title={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Preview - Added explicit rounded-l-2xl to prevent square corners covering parent radius */}
        <div className="flex-1 bg-slate-900 relative flex flex-col h-[50vh] md:h-full overflow-hidden md:rounded-l-2xl">
          <div className="flex-1 relative w-full h-full bg-black">
            <iframe 
              key={iframeKey}
              srcDoc={demo.code} 
              className="w-full h-full border-0 block"
              title={demo.title}
              sandbox="allow-scripts"
            />
          </div>
          <div className="h-14 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-white font-medium text-sm">{demo.title}</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIframeKey(k => k + 1)} 
                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-700 rounded-lg" 
                title={t('refresh')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar - Added explicit rounded-r-2xl */}
        <div className="w-full md:w-96 bg-white flex flex-col h-[50vh] md:h-full overflow-hidden relative border-l border-slate-200 md:rounded-r-2xl">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 shrink-0 bg-white">
            {['concept', 'code', 'ai'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                {t(tab === 'ai' ? 'aiHelper' : tab === 'code' ? 'code' : 'concept')}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {activeTab === 'concept' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                   <h4 className="text-xl font-bold text-slate-800 mb-2">{demo.title}</h4>
                   <div className="flex items-center gap-2 text-xs text-slate-500">
                     <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-indigo-600">
                       {demo.layer === 'general' ? demo.categoryId : t('communityRoot')}
                     </span>
                     <span>{t('by')} {demo.author}</span>
                     <span>• {new Date(demo.createdAt).toLocaleDateString()}</span>
                   </div>
                 </div>
                 
                 <div className="prose prose-sm prose-slate text-slate-600">
                   <p className="leading-relaxed">{demo.description}</p>
                 </div>

                 <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm mt-6">
                   <h5 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                     <Sparkles className="w-4 h-4" /> {t('didYouKnow')}
                   </h5>
                   <p className="text-xs text-slate-600">
                     {t('didYouKnowText')}
                   </p>
                 </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-bold text-slate-500 uppercase">index.html</span>
                   <span className="text-xs text-slate-400">{t('readOnly')}</span>
                </div>
                <pre className="text-xs font-mono bg-slate-900 text-slate-300 p-4 rounded-xl overflow-x-auto flex-1 shadow-inner border border-slate-700">
                  {demo.code}
                </pre>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                   <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                       <Sparkles className="w-4 h-4 text-white" />
                     </div>
                     <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm">
                       {aiResponse}
                     </div>
                   </div>
                 </div>
                 
                 <div className="mt-auto pt-4 border-t border-slate-200 bg-slate-50/50">
                   <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">{t('suggestedQuestions')}</p>
                   <div className="flex flex-wrap gap-2 mb-4">
                     {[t('explainMath'), t('changeColor'), t('makeFaster')].map(q => (
                       <button 
                         key={q} 
                         onClick={() => handleDemoAiAsk(q)}
                         className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm transition-all"
                       >
                         {q}
                       </button>
                     ))}
                   </div>
                   {aiLoading && (
                     <div className="flex items-center gap-2 text-xs text-indigo-600 mb-2">
                       <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                       {t('analyzing')}
                     </div>
                   )}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
