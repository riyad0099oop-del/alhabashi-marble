import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

import SettingsForm from "@/components/SettingsForm";

export default async function AdminSettingsPage({ params }) {
  const { locale } = await params;
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  const isRtl = locale === 'ar';

  return (
    <AdminLayout locale={locale}>
      <div className="admin-page-header">
        <h2>{isRtl ? "إعدادات النظام" : "System Settings"}</h2>
        <p>{isRtl ? "إدارة بيانات الاعتماد الخاصة بك وتكوينات واجهة برمجة التطبيقات." : "Manage your admin credentials and API configurations."}</p>
      </div>

      <div className="settings-grid">
        {/* Password Section */}
        <SettingsForm isRtl={isRtl} />


        {/* GitHub API Section */}
        <div className="admin-card-glass settings-card">
          <div className="card-icon"><i className="fab fa-github"></i></div>
          <div className="card-content">
            <h3>{isRtl ? "تكامل GitHub" : "GitHub Integration"}</h3>
            <p>{isRtl ? "محتواك متزامن مع GitHub. إذا قمت بتغيير اسم المستودع أو المستخدم، قم بتحديث المتغيرات التالية في Vercel:" : "Your content is synced with GitHub. If you change your repository name or username, update the following variables in Vercel:"}</p>
            <ul className="settings-list">
              <li><code>GITHUB_TOKEN</code></li>
              <li><code>GITHUB_REPO_OWNER</code></li>
              <li><code>GITHUB_REPO_NAME</code></li>
            </ul>
          </div>
        </div>

        {/* Image Hosting Section */}
        <div className="admin-card-glass settings-card">
          <div className="card-icon"><i className="fas fa-images"></i></div>
          <div className="card-content">
            <h3>{isRtl ? "استضافة الصور (ImgBB)" : "Image Hosting (ImgBB)"}</h3>
            <p>{isRtl ? "الصور المرفوعة عبر لوحة التحكم يتم استضافتها على ImgBB. تأكد من أن مفتاح IMGBB_API_KEY فعال." : "Images uploaded via the dashboard are hosted on ImgBB. Ensure your IMGBB_API_KEY is active."}</p>
            <a href="https://api.imgbb.com/" target="_blank" className="btn-link-admin">{isRtl ? "إدارة حساب ImgBB" : "Manage ImgBB Account"} <i className="fas fa-external-link-alt"></i></a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
