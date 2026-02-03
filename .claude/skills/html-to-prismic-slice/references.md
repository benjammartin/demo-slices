# Prismic Field Types Reference

## Complete Field Type Guide

### 1. StructuredText (Rich Text)

Most versatile field for text content with formatting.

#### Single-line Configuration
For headings and simple text:
```json
{
  "type": "StructuredText",
  "config": {
    "label": "Heading",
    "single": "heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink",
    "placeholder": "Enter heading"
  }
}
```

#### Multi-line Configuration
For paragraphs and formatted content:
```json
{
  "type": "StructuredText",
  "config": {
    "label": "Content",
    "multi": "paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl",
    "placeholder": "Enter content"
  }
}
```

**Available Options:**
- `paragraph` - Paragraph text
- `preformatted` - Preformatted text
- `heading1` through `heading6` - Heading levels
- `strong` - Bold text
- `em` - Italic text
- `hyperlink` - Links
- `image` - Images within text
- `embed` - Embeds (videos, etc.)
- `list-item` - Unordered list
- `o-list-item` - Ordered list
- `rtl` - Right-to-left text

### 2. Image

For image uploads and media.

```json
{
  "type": "Image",
  "config": {
    "label": "Image",
    "constraint": {
      "width": 1200,
      "height": 800
    },
    "thumbnails": [
      {
        "name": "mobile",
        "width": 800,
        "height": 600
      }
    ]
  }
}
```

**Options:**
- `constraint` - Enforce specific dimensions
- `thumbnails` - Auto-generate responsive versions

### 3. Link

For URLs (internal or external).

```json
{
  "type": "Link",
  "config": {
    "label": "Link",
    "placeholder": "Select a link",
    "select": "document",
    "allowTargetBlank": true
  }
}
```

**Options:**
- `select: "document"` - Link to Prismic documents
- `select: "media"` - Link to media files
- `select: "web"` - External URLs
- `select: null` - All link types
- `allowTargetBlank` - Enable "open in new tab"

### 4. Text

Plain text field without formatting.

```json
{
  "type": "Text",
  "config": {
    "label": "Text",
    "placeholder": "Enter text"
  }
}
```

Use for: names, labels, short text without formatting needs.

### 5. Color

Color picker field.

```json
{
  "type": "Color",
  "config": {
    "label": "Background Color",
    "placeholder": "#FFFFFF"
  }
}
```

Returns hex color values.

### 6. Number

Numeric input.

```json
{
  "type": "Number",
  "config": {
    "label": "Count",
    "placeholder": "Enter number",
    "min": 0,
    "max": 100
  }
}
```

### 7. Select

Dropdown with predefined options.

```json
{
  "type": "Select",
  "config": {
    "label": "Layout",
    "placeholder": "Select layout",
    "options": ["left", "center", "right"],
    "default_value": "center"
  }
}
```

### 8. Boolean

True/false toggle.

```json
{
  "type": "Boolean",
  "config": {
    "label": "Show Background",
    "placeholder_false": "Hidden",
    "placeholder_true": "Visible",
    "default_value": true
  }
}
```

### 9. Date

Date picker.

```json
{
  "type": "Date",
  "config": {
    "label": "Publication Date",
    "placeholder": "Select date"
  }
}
```

### 10. Timestamp

Date and time picker.

```json
{
  "type": "Timestamp",
  "config": {
    "label": "Event Time",
    "placeholder": "Select date and time"
  }
}
```

### 11. Embed

For embedding external content (YouTube, Vimeo, etc.).

```json
{
  "type": "Embed",
  "config": {
    "label": "Video",
    "placeholder": "Paste video URL"
  }
}
```

### 12. GeoPoint

Geographic coordinates.

```json
{
  "type": "GeoPoint",
  "config": {
    "label": "Location"
  }
}
```

### 13. ContentRelationship

Link to specific document types.

```json
{
  "type": "Link",
  "config": {
    "label": "Related Post",
    "select": "document",
    "customtypes": ["blog_post", "article"]
  }
}
```

---

## React Component Helpers

### PrismicRichText

Render StructuredText fields:

```tsx
import { PrismicRichText } from "@prismicio/react";

<PrismicRichText
  field={slice.primary.content}
  components={{
    heading1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
    paragraph: ({ children }) => <p className="mb-4">{children}</p>,
    hyperlink: ({ node, children }) => (
      <a href={node.data.url} className="text-blue-600">
        {children}
      </a>
    ),
  }}
/>
```

### PrismicNextImage

Render Image fields with Next.js optimization:

```tsx
import { PrismicNextImage } from "@prismicio/next";

<PrismicNextImage
  field={slice.primary.image}
  width={800}
  height={600}
  className="rounded-lg"
  priority={false}
/>
```

### PrismicNextLink

Render Link fields:

```tsx
import { PrismicNextLink } from "@prismicio/next";

<PrismicNextLink
  field={slice.primary.link}
  className="btn btn-primary"
>
  {slice.primary.link_text}
</PrismicNextLink>
```

### PrismicText

Extract plain text from StructuredText:

```tsx
import { PrismicText } from "@prismicio/react";

<title>
  <PrismicText field={slice.primary.title} />
</title>
```

---

## TypeScript Types

After creating slices, run Slice Machine to generate types:

```bash
npm run slicemachine
```

Types are generated in `prismicio-types.d.ts`:

```typescript
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type MySliceProps = SliceComponentProps<Content.MySliceSlice>;

const MySlice = ({ slice }: MySliceProps): JSX.Element => {
  // slice.primary.field_name
  // slice.items[0].field_name
  // slice.slice_type
  // slice.variation
};
```

---

## Slice Variations

Add multiple design variations to a single slice:

```json
{
  "id": "hero",
  "type": "SharedSlice",
  "name": "Hero",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "primary": {
        "heading": { "type": "StructuredText", "config": {} }
      }
    },
    {
      "id": "with_image",
      "name": "With Background Image",
      "primary": {
        "heading": { "type": "StructuredText", "config": {} },
        "background_image": { "type": "Image", "config": {} }
      }
    }
  ]
}
```

Access variation in component:

```tsx
const Hero = ({ slice }: HeroProps): JSX.Element => {
  if (slice.variation === "withImage") {
    // Render with background image
  }

  // Render default
};
```

---

## Common Patterns

### Card/Item Pattern
```json
{
  "primary": {
    "section_heading": { "type": "StructuredText" }
  },
  "items": {
    "card_title": { "type": "StructuredText" },
    "card_image": { "type": "Image" },
    "card_link": { "type": "Link" }
  }
}
```

### CTA Pattern
```json
{
  "primary": {
    "cta_text": { "type": "Text" },
    "cta_link": { "type": "Link" },
    "cta_style": {
      "type": "Select",
      "config": {
        "options": ["primary", "secondary", "outline"]
      }
    }
  }
}
```

### Content + Media Pattern
```json
{
  "primary": {
    "heading": { "type": "StructuredText" },
    "content": { "type": "StructuredText" },
    "media": { "type": "Image" },
    "media_position": {
      "type": "Select",
      "config": { "options": ["left", "right"] }
    }
  }
}
```

---

## Prismic Helper Functions

```typescript
import * as prismic from "@prismicio/client";

// Check if field has content
prismic.isFilled.richText(slice.primary.heading)
prismic.isFilled.image(slice.primary.image)
prismic.isFilled.link(slice.primary.link)

// Get image URL
prismic.asImageSrc(slice.primary.image)

// Get link URL
prismic.asLink(slice.primary.link)

// Get plain text
prismic.asText(slice.primary.heading)
```

---

## Best Practices

1. **Naming Conventions**
   - Use snake_case for field IDs
   - Use descriptive names: `hero_heading` not `h1`
   - Prefix related fields: `cta_text`, `cta_link`

2. **Field Organization**
   - Group related fields together
   - Use consistent ordering
   - Put most important fields first

3. **Primary vs Items**
   - Primary: Single instance (section title, intro)
   - Items: Repeating content (cards, list items)

4. **Performance**
   - Use `PrismicNextImage` for optimization
   - Lazy load images with `loading="lazy"`
   - Use responsive thumbnails

5. **Accessibility**
   - Maintain semantic HTML
   - Include alt text for images
   - Use proper heading hierarchy
