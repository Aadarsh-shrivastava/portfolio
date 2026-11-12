/**
 * Page-wide black gradient on the left and right margins. Sits above the
 * content (but below the navigation) so every section dissolves into the
 * background at the edges instead of stopping at a hard boundary.
 */
export default function EdgeOverlay() {
  return <div aria-hidden="true" className="page-edge-overlay" />
}
