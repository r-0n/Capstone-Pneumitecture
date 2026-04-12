export default function SectionFade({ fromColor = '#FBFBF9', toColor = '#FBFBF9', height = 120 }) {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        marginTop: -1,
        marginBottom: -1,
        position: 'relative',
        zIndex: 1,
      }}
    />
  );
}
