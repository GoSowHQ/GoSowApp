import Link from 'next/link';
import AuthShell from '@/components/auth/auth-shell';
import RegisterForm from '@/components/auth/register-form';
import OAuthButtons from '@/components/auth/oauth-buttons';

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join the network"
      title="Create a GoSOW account and start funding what matters."
      description="Set up your account once, then move between launching a project, backing great work, and joining community events."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#17311d] transition hover:text-[#7ED957]">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7ED957]">
            Start here
          </p>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Open your GoSOW workspace</h2>
          <p className="text-sm leading-6 text-gray-500">
            Create an account in minutes and publish, support, or follow technology projects.
          </p>
        </div>

        <OAuthButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 font-medium uppercase tracking-[0.22em] text-gray-400">
              Or use email
            </span>
          </div>
        </div>

        <RegisterForm />
      </div>
    </AuthShell>
  );
}
