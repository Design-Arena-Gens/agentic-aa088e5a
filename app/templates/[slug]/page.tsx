import { notFound } from 'next/navigation';
import Link from 'next/link';
import { templates } from '@lib/templates';

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const t = templates.find(x => x.slug === params.slug);
  if (!t) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{t.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge">{t.industry}</span>
            <span className="badge">{t.style}</span>
            {t.features.map((f) => <span className="badge" key={f}>{f}</span>)}
          </div>
        </div>
        <Link href="/" className="btn btn-primary">???? ??? ??????</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 dark:border-[#121820] bg-gray-50 dark:bg-[#0b0f13]">
            <img src={t.images.hero} alt={t.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="font-semibold">??????? ????????</h2>
          <ul className="list-disc pr-5 text-sm text-gray-700 dark:text-gray-200 space-y-2">
            {t.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <a
            href={`https://www.shopify.com/`} target="_blank" rel="noreferrer"
            className="btn btn-primary w-full"
            style={{background: t.colors.accent}}
          >
            ???? ??? ???????
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.images.gallery.map((img) => (
          <div className="card" key={img}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 dark:border-[#121820] bg-gray-50 dark:bg-[#0b0f13]">
              <img src={img} alt={t.name} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
