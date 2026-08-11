// modules/ModuleRenderer.jsx
import { moduleRegistry } from "./registry";

export default function ModuleRenderer({ block }) {
  const Component = moduleRegistry[block.type];

  if (!Component) {
    // fails loudly in dev instead of silently dropping a section
    console.warn(`No module registered for type "${block.type}"`);
    return (
      <div className="text-red-500 text-sm py-4">
        Unknown module type: {block.type}
      </div>
    );
  }

  // id is used for scroll-to-anchor from the TOC, so every block that
  // wants a TOC entry needs it applied at this level, not inside each module
  console.log(block);
  return (
    <div id={block.id || undefined} className="scroll-mt-24">
      <Component {...block} />
    </div>
  );
}