import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import TranslationsEditor from "@/components/TranslationsEditor";
import { getMessagesData } from "@/lib/admin-actions";

export default async function AdminTranslationsPage({ params }) {
  const { locale } = await params;
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  const isRtl = locale === 'ar';
  // Fetch both languages
  const arMessages = await getMessagesData("ar");
  const enMessages = await getMessagesData("en");

  return (
    <AdminLayout locale={locale}>
      <div className="admin-page-header">
        <div className="header-text">
          <h2>{isRtl ? "محتوى الموقع والترجمات" : "Site Content & Translations"}</h2>
          <p>{isRtl ? "تعديل نصوص الموقع والأوصاف والعناوين بالعربية والإنجليزية." : "Edit website text, descriptions, and labels in Arabic and English."}</p>
        </div>
      </div>

      <TranslationsEditor initialAr={arMessages} initialEn={enMessages} />
    </AdminLayout>
  );
}
