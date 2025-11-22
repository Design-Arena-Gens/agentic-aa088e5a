import { TemplateCard } from "@components/TemplateCard";
import { FilterBar } from "@components/FilterBar";
import { templates, industries, styles, features } from "@lib/templates";
import { Suspense } from "react";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const industry = typeof searchParams?.industry === 'string' ? searchParams!.industry : undefined;
  const style = typeof searchParams?.style === 'string' ? searchParams!.style : undefined;
  const featuresParam = searchParams?.feature;
  const selectedFeatures = Array.isArray(featuresParam)
    ? featuresParam as string[]
    : (typeof featuresParam === 'string' ? [featuresParam] : []);

  const filtered = templates.filter(t => {
    const okIndustry = !industry || t.industry === industry;
    const okStyle = !style || t.style === style;
    const okFeatures = selectedFeatures.length === 0 || selectedFeatures.every(f => t.features.includes(f));
    return okIndustry && okStyle && okFeatures;
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">???? ????? ????? ?????? ???????</h1>
        <p className="text-gray-600 dark:text-gray-300">???? ????? ???????? ?? ??????? ????? ?????? ????.</p>
        <p className="text-xs text-gray-500">{filtered.length} ????</p>
      </div>

      <Suspense>
        <FilterBar industries={industries} styles={styles} features={features} />
      </Suspense>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 py-20">
          ?? ???? ????? ??????. ???? ????? ???????.
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </section>
      )}
    </div>
  );
}
