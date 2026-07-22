'use client';

import { useMemo, useState } from 'react';
import { repoLanguages, repos } from '@/data/repos';
import type { Repo, RepoSortKey } from '@/types';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

const sortOptions: readonly { key: RepoSortKey; label: string }[] = [
  { key: 'recent', label: 'Recent' },
  { key: 'stars', label: 'Stars' },
  { key: 'name', label: 'Name' },
];

function sortRepos(list: Repo[], key: RepoSortKey): Repo[] {
  switch (key) {
    case 'stars':
      return list.sort((a, b) => b.stars - a.stars);
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list.sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated));
  }
}

/** Pill button used for both the language filter and the sort control. */
function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        // min-h-11 keeps the hit area at the 44px touch target these pills
        // otherwise missed by 16px.
        'border-line flex min-h-11 cursor-pointer items-center border px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-colors',
        active ? 'bg-text text-btn-ink' : 'text-dim hover:text-text bg-transparent',
      )}
    >
      {children}
    </button>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Reveal as="li" className="list-none">
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-line bg-panel hover:border-dim hover:bg-raise flex h-full min-h-[180px] flex-col gap-3 border p-5 transition-[transform,border-color,background,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.42)]"
      >
        <div className="flex items-start justify-between gap-2.5">
          {/*
            min-w-0 releases the flex item's auto minimum and break-all supplies
            the break opportunity underscores don't — without both, a name like
            DeepNFV_Dockerised_Attack_Detection_CNN escapes the card entirely.
          */}
          <h2 className="text-text m-0 min-w-0 font-mono text-sm font-normal tracking-[0.02em] break-all">
            {repo.name}
          </h2>
          {repo.pinned && (
            <span className="border-line text-faint border px-[7px] py-[3px] font-mono text-[9px] tracking-[0.16em] uppercase">
              Pinned
            </span>
          )}
        </div>

        <p className="text-dim flex-1 text-[13.5px] leading-[1.55]">{repo.desc}</p>

        <ul className="flex list-none flex-wrap gap-1.5 p-0">
          {repo.topics.map((topic) => (
            <li key={topic} className="border-line2 text-faint border px-[7px] py-1 font-mono text-[10px]">
              {topic}
            </li>
          ))}
        </ul>

        <div className="border-line2 text-dim flex flex-wrap items-center gap-3.5 border-t pt-3 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="border-dim h-2 w-2 rounded-full border-[1.5px]" />
            {repo.language}
          </span>
          <span>
            <span aria-hidden="true">★ </span>
            {repo.stars.toLocaleString('en-US')}
            <span className="sr-only"> stars</span>
          </span>
          <span>
            <span aria-hidden="true">⑂ </span>
            {repo.forks}
            <span className="sr-only"> forks</span>
          </span>
          <span>
            <span aria-hidden="true">◇ </span>
            {repo.issues}
            <span className="sr-only"> open issues</span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/**
 * Searchable, filterable, sortable grid of repositories.
 *
 * Client-side because of the live controls; the underlying data is static, so
 * filtering is a cheap in-memory pass with no network involved.
 */
export function RepoExplorer() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('All');
  const [sort, setSort] = useState<RepoSortKey>('recent');

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = repos.filter((repo) => {
      if (language !== 'All' && repo.language !== language) return false;
      if (!needle) return true;
      return (
        repo.name.toLowerCase().includes(needle) ||
        repo.desc.toLowerCase().includes(needle) ||
        repo.topics.some((topic) => topic.toLowerCase().includes(needle))
      );
    });

    return sortRepos([...filtered], sort);
  }, [query, language, sort]);

  return (
    <section className="animate-pf-fade pt-[clamp(28px,4vw,48px)] pb-[clamp(52px,8vw,104px)]">
      <Container>
        <div className="border-line flex flex-wrap items-center justify-between gap-4 border-b pb-[22px]">
          <div className="relative max-w-[360px] flex-[1_1_240px]">
            <span
              aria-hidden="true"
              className="text-faint absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[13px]"
            >
              /
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="search repositories"
              aria-label="Search repositories"
              // 16px at mobile widths stops iOS Safari zooming the viewport on
              // focus; outline-none is gone so the base :focus-visible ring applies.
              className="border-line text-text placeholder:text-faint w-full border-0 border-b bg-transparent py-[9px] pl-[18px] font-mono text-[16px] sm:text-[13px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by language">
              {repoLanguages.map((lang) => (
                <FilterPill key={lang} active={language === lang} onClick={() => setLanguage(lang)}>
                  {lang}
                </FilterPill>
              ))}
            </div>

            <div className="flex items-center gap-2" role="group" aria-label="Sort repositories">
              <span className="text-faint font-mono text-[10px] tracking-[0.16em] uppercase">Sort</span>
              {sortOptions.map((option) => (
                <FilterPill key={option.key} active={sort === option.key} onClick={() => setSort(option.key)}>
                  {option.label}
                </FilterPill>
              ))}
            </div>
          </div>
        </div>

        <p aria-live="polite" className="text-faint py-[18px] font-mono text-[11px] tracking-[0.08em]">
          {visible.length} {visible.length === 1 ? 'repository' : 'repositories'}
        </p>

        {visible.length > 0 ? (
          <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,272px),1fr))] gap-3.5 p-0">
            {visible.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </ul>
        ) : (
          <p className="text-dim py-10 text-center text-[15px]">
            No repositories match that search. Try a different term or clear the language filter.
          </p>
        )}
      </Container>
    </section>
  );
}
