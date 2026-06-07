export default function AdminLoading() {
  return (
    <div className="grid min-h-screen place-items-center bg-white">
      <div className="w-full max-w-lg px-6">
        <div className="h-8 w-32 animate-pulse bg-[var(--rose-soft)]" />
        <div className="mt-6 h-60 animate-pulse border border-[var(--line)]" />
      </div>
    </div>
  );
}
