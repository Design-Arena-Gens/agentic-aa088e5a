import Link from 'next/link';
import { industries as INDUSTRIES, styles as STYLES, features as FEATURES } from '@lib/templates';
import { Suspense } from 'react';

function Chip({ active, href, children }: { active?: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`badge ${active ? 'ring-2 ring-black dark:ring-white' : ''}`}>{children}</Link>
  );
}

export function FilterBar({ industries = INDUSTRIES, styles = STYLES, features = FEATURES }: {
  industries?: string[]; styles?: string[]; features?: string[];
}) {
  // This component is link-based; page reads searchParams.
  return (
    <Suspense>
      <div className="space-y-4">
        <Row title="???????" paramKey="industry" items={industries} />
        <Row title="???????" paramKey="style" items={styles} />
        <Row title="???????" paramKey="feature" items={features} multi />
      </div>
    </Suspense>
  );
}

function Row({ title, items, paramKey, multi = false }: { title: string; items: string[]; paramKey: string; multi?: boolean }) {
  // Build links preserving other params on client via currentLocation (fallback no-op)
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const chips = items.map((item) => {
    const hrefParams = new URLSearchParams(search.toString());
    if (multi) {
      const existing = hrefParams.getAll(paramKey).filter(Boolean);
      const isActive = existing.includes(item);
      const next = isActive ? existing.filter((e) => e !== item) : [...existing, item];
      hrefParams.delete(paramKey);
      next.forEach((v) => hrefParams.append(paramKey, v));
      const href = `/?${hrefParams.toString()}`;
      return <Chip key={item} href={href} active={isActive}>{item}</Chip>;
    } else {
      const isActive = search.get(paramKey) === item;
      if (isActive) {
        // toggle off
        const hrefParamsOff = new URLSearchParams(search.toString());
        hrefParamsOff.delete(paramKey);
        return <Chip key={item} href={`/?${hrefParamsOff.toString()}`}>{item}</Chip>;
      }
      const hrefParamsOn = new URLSearchParams(search.toString());
      hrefParamsOn.set(paramKey, item);
      return <Chip key={item} href={`/?${hrefParamsOn.toString()}`} active={isActive}>{item}</Chip>;
    }
  });

  // Clear button
  const clearParams = new URLSearchParams(search.toString());
  clearParams.delete(paramKey);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <Link className="text-xs text-gray-500 hover:underline" href={`/?${clearParams.toString()}`}>????? ?????</Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips}
      </div>
    </div>
  );
}
