
function MedicineSources({ titleTrue, sources }: { titleTrue?: boolean; sources: MedicineSource[] }) {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  if (!sources?.length) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center">
        <p className="font-medium text-gray-700">No sources available</p>
        <p className="mt-1 text-sm text-gray-500">
          No references have been added for this medicine.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {titleTrue &&
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Medical References
            </h2>
            <p className="text-sm text-gray-500">
              Information sources used for this medicine
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {sources.length} {sources.length === 1 ? "Source" : "Sources"}
          </span>
        </div>}

      <div className="grid gap-3">
        {sources.map((source) => (
          <article
            key={source.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M8 13h8M8 17h8" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {source.organization}
                  </span>

                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {source.source_type.replaceAll("_", " ")}
                  </span>
                </div>

                <h3 className="mt-1 font-semibold text-gray-900">
                  {source.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {source.notes}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                  <span>
                    Published:{" "}
                    {source.publication_date
                      ? formatDate(source.publication_date)
                      : "Not specified"}
                  </span>

                  <span>
                    Accessed: {formatDate(source.accessed_at)}
                  </span>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  View reference
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        References are provided for informational purposes.
        Always verify clinical information against the original
        source before making medical decisions.
      </p>
    </section>
  );
}

export default MedicineSources;
