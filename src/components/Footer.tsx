export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-iron/30">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src="/brand/wordmark/wordmark-white.svg"
              alt="Menconi Marketing"
              className="h-6 w-auto"
            />
            <span className="text-graphite text-sm">Chicago, IL</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="mailto:nico@menconimarketing.com"
              className="text-silver hover:text-accent transition-colors duration-300 text-sm"
            >
              nico@menconimarketing.com
            </a>
            <p className="text-graphite/60 text-xs">
              Built by Menconi Marketing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
