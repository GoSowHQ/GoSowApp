import Link from 'next/link';
import AuthShell from '@/components/auth/auth-shell';
import LoginForm from '@/components/auth/login-form';
import OAuthButtons from '@/components/auth/oauth-buttons';

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Return to your workspace"
      title="Sign in and continue building with GoSOW."
      description="Pick up your live campaigns, funding activity, and event updates from one workspace."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-[#17311d] transition hover:text-[#7ED957]">
            Create one now
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7ED957]">
            Welcome back
          </p>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Access your dashboard</h2>
          <p className="text-sm leading-6 text-gray-500">
            Use email or social sign-in to get back to your campaigns.
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

        <LoginForm />
      </div>
    </AuthShell>
  );
}
