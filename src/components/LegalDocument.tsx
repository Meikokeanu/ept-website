import legal from "@/content/legal.de";

type DocKey = "privacy" | "terms" | "imprint";

type Section = { id: string; title: string; body: string; sub: boolean };

// Same texts and order as the app (i18n/legal.de.ts in the app repo, copied 1:1).
function sectionsOf(doc: Record<string, string>): Section[] {
  const out: Section[] = [];
  Object.keys(doc).forEach(function (key) {
    const match = key.match(/^section(.+)Title$/);
    if (!match) return;
    const id = match[1];
    out.push({
      id: id,
      title: doc[key],
      body: doc["section" + id + "Body"] || "",
      sub: id.indexOf("_") !== -1,
    });
  });
  return out;
}

function Body({ text }: { text: string }) {
  if (!text.trim()) return null;
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map(function (para, i) {
        const lines = para.split("\n");
        return (
          <p key={i} className="legal__p">
            {lines.map(function (line, j) {
              return (
                <span key={j}>
                  {j > 0 ? <br /> : null}
                  {line}
                </span>
              );
            })}
          </p>
        );
      })}
    </>
  );
}

export default function LegalDocument({ doc }: { doc: DocKey }) {
  const data = legal[doc] as Record<string, string>;
  const sections = sectionsOf(data);
  return (
    <>
      {data.updated ? <p className="legal__updated">{data.updated}</p> : null}
      {sections.map(function (section) {
        return (
          <section key={section.id} className={"legal__section" + (section.sub ? " legal__section--sub" : "")}>
            {section.sub ? (
              <h3 className="legal__h3">{section.title}</h3>
            ) : (
              <h2 className="legal__h2">{section.title}</h2>
            )}
            <Body text={section.body} />
          </section>
        );
      })}
    </>
  );
}
