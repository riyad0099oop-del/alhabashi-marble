"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { locale } = useParams();
  const isRtl = locale === 'ar';
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(password);
      if (success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(isRtl ? "كلمة المرور غير صحيحة" : "Invalid Admin Password");
      }
    } catch (err) {
      setError(isRtl ? "حدث خطأ ما، يرجى المحاولة مرة أخرى" : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen" dir={isRtl ? "rtl" : "ltr"}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <span className="premium-label">{isRtl ? "نظام التحكم" : "Access Control"}</span>
          <h1>{isRtl ? "بوابة المسؤول" : "Admin Portal"}</h1>
          <p>{isRtl ? "يرجى إدخال مفتاح الأمان للمتابعة" : "Please enter your secret key to continue"}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <i className="fas fa-key"></i>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder={isRtl ? "أدخل كلمة المرور" : "Enter Password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingInlineEnd: '45px' }}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', insetInlineEnd: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#d9a47d', cursor: 'pointer', opacity: 0.5 }}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>


          {error && <div className="error-msg">{error}</div>}

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? (isRtl ? "جاري التحقق..." : "Verifying...") : (isRtl ? "دخول إلى لوحة التحكم" : "Login to Dashboard")}
          </button>
        </form>

        <div className="login-footer">
          <p>&copy; {new Date().getFullYear()} {isRtl ? "مصنع الحبشي. جميع الحقوق محفوظة." : "Al Habashi Factory. All Rights Reserved."}</p>
        </div>
      </motion.div>

      <style jsx>{`
        .login-screen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at top, #2d1b0e 0%, #0f0a07 60%);
          font-family: var(--font-tajawal), sans-serif;
          padding: 20px;
        }
        .login-card {
          width: 100%;
          max-width: 430px;
          background: rgba(26,18,11,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(217,164,125,0.15);
          border-radius: 24px;
          padding: 56px 38px;
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(217,164,125,0.05);
        }
        .premium-label {
          color: #d9a47d;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 5px;
          font-weight: 700;
          display: block;
          margin-bottom: 14px;
        }
        h1 {
          color: #f3e5d8;
          font-size: 2rem;
          margin-bottom: 8px;
          font-weight: 700;
        }
        p {
          color: rgba(243,229,216,0.45);
          margin-bottom: 36px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .input-group {
          position: relative;
          background: rgba(35,24,16,0.8);
          border-radius: 12px;
          border: 1px solid rgba(217,164,125,0.15);
          transition: 0.3s;
        }
        .input-group:focus-within {
          border-color: rgba(217,164,125,0.45);
          box-shadow: 0 0 0 3px rgba(217,164,125,0.08);
        }
        .input-group i {
          position: absolute;
          inset-inline-start: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(217,164,125,0.4);
        }
        input {
          width: 100%;
          background: transparent;
          border: none;
          padding: 16px 18px;
          padding-inline-start: 48px;
          color: #f3e5d8;
          font-size: 1rem;
          outline: none;
          font-family: var(--font-tajawal), sans-serif;
        }
        .error-msg {
          color: #e07060;
          font-size: 0.88rem;
          background: rgba(180,50,30,0.1);
          border: 1px solid rgba(180,50,30,0.2);
          padding: 10px;
          border-radius: 10px;
        }
        .btn-login {
          background: linear-gradient(135deg, #d9a47d, #bf953f);
          color: #1a120b;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 8px;
          font-family: var(--font-tajawal), sans-serif;
          letter-spacing: 0.5px;
        }
        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(217,164,125,0.35);
        }
        .btn-login:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .login-footer {
          margin-top: 36px;
          font-size: 0.72rem;
          color: rgba(243,229,216,0.2);
        }
      `}</style>
    </div>
  );
}
