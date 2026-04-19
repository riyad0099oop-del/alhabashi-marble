"use client";

import { useState } from "react";
import { saveData } from "@/lib/admin-actions";

export default function SettingsForm({ isRtl }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(isRtl ? "كلمات المرور غير متطابقة!" : "Passwords do not match!");
      return;
    }

    setLoading(true);
    const result = await saveData('data', { password: newPassword }, 'auth.json');
    if (result.success) {
      setMessage(isRtl ? "تم تغيير كلمة المرور بنجاح!" : "Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(isRtl ? "خطأ في الحفظ: " : "Error saving: " + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="admin-card-glass settings-card">
      <div className="card-icon"><i className="fas fa-key"></i></div>
      <div className="card-content" style={{ width: '100%' }}>
        <h3>{isRtl ? "تغيير كلمة المرور" : "Change Admin Password"}</h3>
        <p>{isRtl ? "يمكنك تحديث كلمة مرور لوحة التحكم من هنا مباشرة." : "You can update your admin dashboard password directly from here."}</p>
        
        <form onSubmit={handlePasswordChange} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group">
            <label>{isRtl ? "كلمة المرور الجديدة" : "New Password"}</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showNew ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={{ paddingInlineEnd: '45px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', insetInlineEnd: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#d9a47d', cursor: 'pointer' }}
              >
                <i className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>{isRtl ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirm ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={{ paddingInlineEnd: '45px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', insetInlineEnd: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#d9a47d', cursor: 'pointer' }}
              >
                <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary-admin" disabled={loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ كلمة المرور" : "Save Password")}
          </button>
        </form>


        {message && <div className="status-banner" style={{ marginTop: '15px' }}>{message}</div>}
      </div>
    </div>
  );
}
