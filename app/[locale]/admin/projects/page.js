import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ProjectsEditor from "@/components/ProjectsEditor";
import { getJsonData } from "@/lib/admin-actions";

export default async function AdminProjectsPage({ params }) {
  const { locale } = await params;
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  const isRtl = locale === 'ar';
  const projects = await getJsonData("projectsData.json");

  return (
    <AdminLayout locale={locale}>
      <div className="projects-admin-header">
        <div className="header-text">
          <h2>{isRtl ? "إدارة المشاريع" : "Manage Projects"}</h2>
          <p>{isRtl ? "إضافة أو تعديل أو حذف المشاريع من المعرض الخاص بك." : "Add, edit, or remove projects from your portfolio showroom."}</p>
        </div>
      </div>

      <ProjectsEditor initialProjects={projects} locale={locale} />
    </AdminLayout>
  );
}
