"use client";
import Link from 'next/link';
import type { Template } from '@lib/templates';

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link href={`/templates/${template.slug}`} className="card group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 dark:border-[#121820] bg-gray-50 dark:bg-[#0b0f13]">
        <img
          src={template.images.hero}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{template.name}</h3>
          <span className="badge" style={{backgroundColor: 'transparent', border: '1px solid #e5e7eb'}}>{template.style}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{template.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="badge">{template.industry}</span>
          {template.features.slice(0,2).map((f) => (<span className="badge" key={f}>{f}</span>))}
        </div>
      </div>
    </Link>
  );
}
