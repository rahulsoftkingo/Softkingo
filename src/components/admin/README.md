# ImageUploadComponent Usage Guide

## Overview
Reusable image upload component with popup interface, media library integration, and file upload support.

## Features
- 📁 **Media Library**: Browse and select from uploaded images
- 📤 **Direct Upload**: Drag & drop or click to upload new images
- 🔍 **Search**: Filter images by name or path
- 🏷️ **Categories**: Organize images by categories (Team, Blog, Case Studies)
- 🖼️ **Preview**: Real-time image preview with fallback
- 📱 **Responsive**: Works on all screen sizes
- ♻️ **Reusable**: Use across all admin panels

## Basic Usage

```jsx
import ImageUploadComponent from '@/components/admin/ImageUploadComponent';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUploadComponent
      value={imageUrl}
      onChange={setImageUrl}
      placeholder="Product image URL"
      title="Select Product Image"
      showRecent={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current image URL |
| `onChange` | `function` | Required | Callback when image is selected |
| `placeholder` | `string` | `'/images/...'` | Input placeholder text |
| `title` | `string` | `'Select Image'` | Popup title |
| `showRecent` | `boolean` | `true` | Show recent images from library |
| `maxHeight` | `string` | `'400px'` | Popup max height |

## Integration Examples

### Team Management
```jsx
<ImageUploadComponent
  value={form.photo}
  onChange={(value) => setForm(prev => ({ ...prev, photo: value }))}
  placeholder="Team member photo"
  title="Select Team Photo"
  showRecent={true}
/>
```

### Case Studies
```jsx
<ImageUploadComponent
  value={caseStudy.coverImage}
  onChange={(value) => setCaseStudy(prev => ({ ...prev, coverImage: value }))}
  placeholder="Case study cover image"
  title="Select Cover Image"
  showRecent={true}
/>
```

### Solutions
```jsx
<ImageUploadComponent
  value={solution.icon}
  onChange={(value) => setSolution(prev => ({ ...prev, icon: value }))}
  placeholder="Solution icon"
  title="Select Solution Icon"
  showRecent={false}
/>
```

### Blog Posts
```jsx
<ImageUploadComponent
  value={blog.featuredImage}
  onChange={(value) => setBlog(prev => ({ ...prev, featuredImage: value }))}
  placeholder="Blog featured image"
  title="Select Featured Image"
  showRecent={true}
/>
```

## API Dependencies

The component requires these API endpoints:

### `/api/admin/upload` - File Upload
```js
// POST request with FormData
const formData = new FormData();
formData.append('file', file);
const res = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData
});
```

### `/api/admin/media` - Media Library
```js
// GET request to fetch images
const res = await fetch('/api/admin/media?limit=20');
const images = await res.json();
```

## Styling

The component uses Tailwind CSS classes and can be customized by:
1. Modifying the component directly
2. Overriding CSS classes in your project
3. Using CSS custom properties

## File Support

- **Formats**: PNG, JPG, JPEG, GIF, WebP
- **Size**: Up to 10MB (configurable in API)
- **Storage**: `/uploads/` directory by default

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Tips

1. **Performance**: Enable lazy loading for large image libraries
2. **Organization**: Use descriptive image titles for better search
3. **Optimization**: Compress images before upload
4. **Accessibility**: Add alt text descriptions for images
5. **Backup**: Regular backup of uploaded images

## Future Enhancements

- [ ] Image cropping/editing
- [ ] Multiple image selection
- [ ] Image optimization on upload
- [ ] Cloud storage integration
- [ ] Image alt text management
- [ ] Bulk upload support
