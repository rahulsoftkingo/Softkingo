export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: "Test",
    description: "Test - solutions page",
  };
}

export default function Page() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Test</h1>
      <p>Auto-created placeholder for <b>/solutions/test</b></p>
      <p>Edit this file: <code>src/app/(public)/solutions/test/page.jsx</code></p>
    </div>
  );
}
