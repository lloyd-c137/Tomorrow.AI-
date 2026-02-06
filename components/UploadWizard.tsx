
import React, { useState } from 'react';
import { Target, Globe, Users, Check } from 'lucide-react';
import { Demo, Category, Subject, Bounty, Layer, Community } from '../types';

export const UploadWizard = ({ t, categories, communities, currentUserId, onSubmit, onCancel, bountyContext }: { 
  t: any, 
  categories: Category[], 
  communities: Community[],
  currentUserId: string,
  onSubmit: (d: Demo) => void, 
  onCancel: () => void,
  bountyContext: Bounty | null
}) => {
  // Step 0: Select Target (General vs Community)
  // Step 1: Info (Title, Category - filtered)
  // Step 2: Code
  // Step 3: Preview
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    categoryId: '',
    layer: (bountyContext ? bountyContext.layer : 'general') as Layer,
    communityId: bountyContext?.communityId || undefined,
    code: '<!DOCTYPE html>\n<html>\n<body style="margin:0; overflow:hidden;">\n  <canvas id="c"></canvas>\n  <script>\n    // Your code here\n  </script>\n</body>\n</html>'
  });

  // Derived state for available categories based on selection
  const availableCategories = React.useMemo(() => {
    if (formData.layer === 'general') {
      return Object.values(Subject).map(s => ({ id: s, name: s }));
    } else if (formData.layer === 'community' && formData.communityId) {
      // Filter categories for this specific community
      return categories.filter(c => c.communityId === formData.communityId).map(c => ({ id: c.id, name: c.name }));
    }
    return [];
  }, [formData.layer, formData.communityId, categories]);

  const handleSubmit = () => {
    const newDemo: Demo = {
      id: `demo-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      author: formData.author,
      categoryId: formData.categoryId,
      layer: formData.layer,
      communityId: formData.communityId,
      code: formData.code,
      status: 'pending',
      createdAt: Date.now(),
      bountyId: bountyContext?.id
    };
    onSubmit(newDemo);
  };
  
  // If uploading for a bounty, skip step 0 as context is fixed
  React.useEffect(() => {
      if(bountyContext) {
          setStep(1);
          setFormData(prev => ({
              ...prev,
              layer: bountyContext.layer,
              communityId: bountyContext.communityId
          }));
      }
  }, [bountyContext]);

  // My joined communities
  const myCommunities = communities.filter(c => c.members.includes(currentUserId) && c.status === 'approved');

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
       {/* Header */}
       <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
         <div>
           <h2 className="text-xl font-bold text-slate-800">{t('uploadTitle')}</h2>
           {bountyContext && (
             <div className="flex items-center gap-2 mt-1 text-sm text-amber-600">
               <Target className="w-4 h-4" />
               <span>{t('submittingFor')} <strong>{bountyContext.title}</strong></span>
             </div>
           )}
         </div>
         <div className="flex gap-2">
            {[0, 1, 2, 3].map(s => (
              <div key={s} className={`w-2.5 h-2.5 rounded-full ${step >= s ? 'bg-indigo-600' : 'bg-slate-300'}`} />
            ))}
         </div>
       </div>

       {/* Body */}
       <div className="flex-1 p-8 overflow-y-auto">
         
         {/* Step 0: Target Selection */}
         {step === 0 && (
             <div className="max-w-2xl mx-auto animate-in slide-in-from-right-8 duration-300">
                 <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">{t('selectLayer')}</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* General Library Option */}
                     <div 
                        onClick={() => setFormData({...formData, layer: 'general', communityId: undefined})}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${formData.layer === 'general' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                     >
                         <div className={`w-16 h-16 rounded-full flex items-center justify-center ${formData.layer === 'general' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                             <Globe className="w-8 h-8" />
                         </div>
                         <div>
                             <h4 className="font-bold text-slate-800">{t('layerGeneral')}</h4>
                             <p className="text-xs text-slate-500 mt-1">Publicly available to all researchers.</p>
                         </div>
                         {formData.layer === 'general' && <div className="absolute top-4 right-4 text-indigo-600"><Check className="w-5 h-5" /></div>}
                     </div>

                     {/* Community Option */}
                     <div 
                        onClick={() => setFormData({...formData, layer: 'community', communityId: myCommunities[0]?.id || ''})}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${formData.layer === 'community' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                     >
                         <div className={`w-16 h-16 rounded-full flex items-center justify-center ${formData.layer === 'community' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                             <Users className="w-8 h-8" />
                         </div>
                         <div>
                             <h4 className="font-bold text-slate-800">{t('layerCommunity')}</h4>
                             <p className="text-xs text-slate-500 mt-1">Exclusive to specific community members.</p>
                         </div>
                         {formData.layer === 'community' && <div className="absolute top-4 right-4 text-indigo-600"><Check className="w-5 h-5" /></div>}
                     </div>
                 </div>

                 {/* If Community Selected, Show Dropdown */}
                 {formData.layer === 'community' && (
                     <div className="mt-8 animate-in fade-in slide-in-from-top-2">
                         <label className="block text-sm font-bold text-slate-700 mb-2">{t('selectCommunity')}</label>
                         {myCommunities.length > 0 ? (
                             <select 
                                value={formData.communityId || ''}
                                onChange={e => setFormData({...formData, communityId: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                             >
                                 {myCommunities.map(c => (
                                     <option key={c.id} value={c.id}>{c.name}</option>
                                 ))}
                             </select>
                         ) : (
                             <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200">
                                 You are not a member of any approved communities. Join one first!
                             </div>
                         )}
                     </div>
                 )}
             </div>
         )}

         {/* Step 1: Basic Info */}
         {step === 1 && (
           <div className="space-y-6 max-w-lg mx-auto animate-in slide-in-from-right-8 duration-300">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('titleLabel')}</label>
               <input 
                 value={formData.title} 
                 onChange={e => setFormData({...formData, title: e.target.value})}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
               />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('authorLabel')}</label>
                  <input 
                    value={formData.author} 
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('subjectLabel')}</label>
                  <select 
                    value={formData.categoryId} 
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Select Category...</option>
                    {availableCategories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {availableCategories.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">No categories found for this target. Please create one.</p>
                  )}
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('descLabel')}</label>
               <textarea 
                 value={formData.description} 
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 rows={4}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
               />
             </div>
           </div>
         )}

         {step === 2 && (
           <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
             <label className="block text-sm font-medium text-slate-700 mb-2">{t('code')}</label>
             <textarea 
               value={formData.code} 
               onChange={e => setFormData({...formData, code: e.target.value})}
               className="flex-1 w-full p-4 font-mono text-sm bg-slate-900 text-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
               spellCheck={false}
             />
           </div>
         )}

         {step === 3 && (
            <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('stepPreview')}</label>
              <div className="flex-1 border-2 border-slate-200 border-dashed rounded-lg bg-slate-50 overflow-hidden relative">
                 <iframe 
                   srcDoc={formData.code} 
                   className="w-full h-full absolute inset-0 border-0" 
                   title="Preview" 
                   sandbox="allow-scripts"
                 />
              </div>
            </div>
         )}
       </div>

       {/* Footer */}
       <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
         <button 
           onClick={() => step === 0 ? onCancel() : setStep(s => s - 1)}
           className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
         >
           {step === 0 ? 'Cancel' : t('back')}
         </button>
         
         <button 
           onClick={() => step === 3 ? handleSubmit() : setStep(s => s + 1)}
           disabled={
               (step === 0 && formData.layer === 'community' && !formData.communityId) ||
               (step === 1 && (!formData.title || !formData.author || !formData.categoryId))
           }
           className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {step === 3 ? t('submit') : t('next')}
         </button>
       </div>
    </div>
  );
};
