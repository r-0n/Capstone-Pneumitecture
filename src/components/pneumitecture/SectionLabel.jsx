export default function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="tech-label text-structural">{number}</span>
      <div className="hairline flex-1" />
      <span className="tech-label text-structural">{text}</span>
    </div>
  );
}
