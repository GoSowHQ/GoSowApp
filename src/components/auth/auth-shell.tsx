import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

const sellingPoints = [
  'Back bold software, open-source tools, and community projects.',
  'Launch campaigns with a cleaner path from idea to funding.',
  'Move between creator and backer workflows without friction.',
];

export default function AuthShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(126,217,87,0.24),_transparent_34%),linear-gradient(180deg,_#f7f6f2_0%,_#ffffff_50%,_#eef7eb_100%)] px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#17311d] p-8 text-white shadow-[0_30px_120px_rgba(23,49,29,0.22)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(126,217,87,0.28),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-8">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7ED957] text-sm font-black tracking-[0.18em] text-[#17311d]">
                  GS
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a6d68f]">
                    GoSOW
                  </div>
                  <div className="text-sm text-white/72">Crowdfunding for technology that ships</div>
                </div>
              </Link>

              <div className="max-w-xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a6d68f]">
                  {eyebrow}
                </p>
                <h1 className="max-w-lg text-4xl font-black tracking-tight sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {sellingPoints.map((point, index) => (
                <div
                  key={point}
                  className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#a6d68f]">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[2rem] border border-[#dce9d8] bg-white/88 p-6 shadow-[0_26px_80px_rgba(23,49,29,0.12)] backdrop-blur-xl sm:p-8">
            {children}
            <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
