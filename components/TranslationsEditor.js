"use client";

import { useState } from "react";
import { saveData } from "@/lib/admin-actions";
import { motion, AnimatePresence } from "framer-motion";

export default function TranslationsEditor({ initialAr, initialEn }) {
  const [arMessages, setArMessages] = useState(initialAr);
  const [enMessages, setEnMessages] = useState(initialEn);
  const [activeSection, setActiveSection] = useState("Navbar");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Section names mapping for Arabic UI
  const sectionLabels = {
    "Navbar": "شريط التنقل",
    "Home": "الصفحة الرئيسية",
    "Footer": "تذييل الصفحة",
    "Contact": "اتصل بنا",
    "CareGuide": "دليل العناية",
    "Showroom": "صالة العرض",
    "Services": "خدماتنا",
    "Projects": "المشاريع",
    "Common": "نصوص عامة"
  };

  const sections = Object.keys(arMessages).filter(key => typeof arMessages[key] === 'object');

  const handleTextChange = (lang, section, key, value, subKey = null) => {
    const setMessages = lang === 'ar' ? setArMessages : setEnMessages;
    
    setMessages(prev => {
      const updated = { ...prev };
      if (subKey) {
        if (!updated[section][key]) updated[section][key] = {};
        updated[section][key][subKey] = value;
      } else {
        updated[section][key] = value;
      }
      return updated;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    const resAr = await saveData('messages', arMessages, 'ar.json');
    const resEn = await saveData('messages', enMessages, 'en.json');

    if (resAr.success && resEn.success) {
      setMessage("تم حفظ التعديلات بنجاح! سيتم تحديث الموقع الآن.");
    } else {
      alert("Error saving translations: " + (resAr.error || resEn.error));
    }
    setLoading(false);
  };

  const renderInputs = (section) => {
    const keys = Object.keys(arMessages[section]);
    
    return keys.map((key) => {
      const val = arMessages[section][key];
      
      // Handle simple strings
      if (typeof val === 'string') {
        return (
          <div key={`${section}-${key}`} className="translation-row">
            <div className="key-label">{key}</div>
            <div className="inputs-pair">
              <div className="input-field">
                <span className="lang-tag">AR</span>
                <textarea 
                  value={arMessages[section][key] || ""} 
                  onChange={(e) => handleTextChange('ar', section, key, e.target.value)}
                />
              </div>
              <div className="input-field">
                <span className="lang-tag">EN</span>
                <textarea 
                  value={enMessages[section][key] || ""} 
                  onChange={(e) => handleTextChange('en', section, key, e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      }
      
      // Handle nested objects
      if (typeof val === 'object' && !Array.isArray(val)) {
        return (
          <div key={`${section}-${key}`} className="translation-group">
            <div className="group-label">{key}</div>
            <div className="group-content">
              {Object.keys(val).map(subKey => (
                <div key={subKey} className="translation-row nested">
                   <div className="key-label sub">{subKey}</div>
                   <div className="inputs-pair">
                      <div className="input-field">
                        <textarea 
                          value={arMessages[section][key][subKey] || ""} 
                          onChange={(e) => handleTextChange('ar', section, key, e.target.value, subKey)}
                        />
                      </div>
                      <div className="input-field">
                        <textarea 
                          value={enMessages?.[section]?.[key]?.[subKey] || ""} 
                          onChange={(e) => handleTextChange('en', section, key, e.target.value, subKey)}
                        />
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="translations-editor">
      {/* Section Selector */}
      <div className="sections-tabs">
        {sections.map(section => (
          <button 
            key={section} 
            className={`tab-btn ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {sectionLabels[section] || section}
          </button>
        ))}
      </div>

      <div className="admin-card-glass editor-panel">
        <div className="panel-header">
           <h3>تعديل قسم: {sectionLabels[activeSection] || activeSection}</h3>
           <button 
             className="btn-save-translations" 
             onClick={handleSave}
             disabled={loading}
           >
             {loading ? 'جاري الحفظ...' : 'حفظ كافة التغييرات'}
           </button>
        </div>

        {message && <div className="status-banner">{message}</div>}

        <div className="translations-list">
          {renderInputs(activeSection)}
        </div>
      </div>

    </div>
  );
}


