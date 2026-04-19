import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ProductsEditor from "@/components/ProductsEditor";
import { getJsonData } from "@/lib/admin-actions";

export default async function AdminProductsPage({ params }) {
  const { locale } = await params;
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  const isRtl = locale === 'ar';
  const products = await getJsonData("products.json");

  return (
    <AdminLayout locale={locale}>
      <div className="admin-page-header">
        <div className="header-text">
          <h2>{isRtl ? "إدارة المنتجات (الرخام والجرانيت)" : "Manage Products (Marble & Granite)"}</h2>
          <p>{isRtl ? "إضافة أو تعديل أنواع الرخام المتوفرة في صالة العرض." : "Add, edit, or remove marble types available in your showroom."}</p>
        </div>
      </div>

      <ProductsEditor initialProducts={products} locale={locale} />
    </AdminLayout>
  );
}
