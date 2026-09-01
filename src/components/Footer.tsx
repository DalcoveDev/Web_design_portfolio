export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-[var(--cream)]">
            Dal<span className="text-[var(--terracotta)]">cove</span>
          </span>
          <span className="text-xs text-[var(--cream-dim)]">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <span className="text-xs text-[var(--cream-dim)]">Designed & Built with care</span>
      </div>
    </footer>
  );
}
