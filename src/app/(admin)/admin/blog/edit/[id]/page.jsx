
import * as React from 'react';
import BlogEditPageClient from './BlogEditPageClient';

export default function BlogEditPage({ params }) {
  const resolved = React.use(params); // Next 15 async params
  const idParam = resolved.id;        // "1", "2", ...

  return <BlogEditPageClient idParam={idParam} />;
}
