export function Footer({ t }) {
  return (
    <footer className="mt-16 border-t border-zinc-200/70 bg-white">
      <div className="container py-10 text-sm text-zinc-600">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
<div className="mt-3 flex gap-4 text-xs">
  <a className="underline" href="/fr/legal">Mentions légales</a>
  <a className="underline" href="/en/legal">Legal notice</a>
</div>
          <div className="font-medium text-zinc-900">Stephan Real Estate</div></div>
      </div>
    </footer>
  );
}
