import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { getJsonData } from "@/lib/admin-actions";

export default async function AdminDashboard({ params }) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  // Get some stats for the dashboard
  const projects = await getJsonData("projectsData.json");
  const products = await getJsonData("products.json");

  const stats = [
    { label: isRtl ? "إجمالي المشاريع" : "Total Projects", value: projects.length, icon: "fas fa-folder-open", color: "#bf953f" },
    { label: isRtl ? "المنتجات في المعرض" : "Products in Showroom", value: products.length, icon: "fas fa-gem", color: "#3f8ebf" },
    { label: isRtl ? "اللغات النشطة" : "Active Languages", value: 2, icon: "fas fa-globe", color: "#3fbf8e" },
    { label: isRtl ? "حالة النظام" : "System Status", value: isRtl ? "متصل" : "Online", icon: "fas fa-check-circle", color: "#37f02b" },
  ];

  return (
    <AdminLayout locale={locale}>
      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card-glass stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}

        <div className="admin-card-glass welcome-banner">
          <div className="banner-text">
            <h2>{isRtl ? "!أهلاً بك مجدداً يا مدير" : "Welcome back, Admin!"}</h2>
            <p>{isRtl ? "يمكنك إدارة مشاريع الرخام وترجمات الموقع من القائمة الجانبية. يتم حفظ جميع التغييرات مباشرة في المستودع الخاص بك." : "You can manage your marble projects and website translations from the sidebar menu. All changes are saved directly to your repository."}</p>
          </div>
          <div className="banner-actions">
            <button className="btn-primary-admin">{isRtl ? "عرض آخر مشروع" : "View Latest Project"}</button>
          </div>
        </div>

        <div className="admin-card-glass quick-actions">
          <h3>{isRtl ? "إجراءات سريعة" : "Quick Actions"}</h3>
          <div className="actions-list">
            <button className="action-item">
              <i className="fas fa-plus-circle"></i>
              {isRtl ? "إضافة مشروع جديد" : "Add New Project"}
            </button>
            <button className="action-item">
              <i className="fas fa-edit"></i>
              {isRtl ? "تعديل الترجمات" : "Edit Translations"}
            </button>
            <button className="action-item">
              <i className="fas fa-image"></i>
              {isRtl ? "إدارة المعرض" : "Manage Gallery"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
