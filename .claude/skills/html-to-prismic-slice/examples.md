# HTML to Prismic Slice Examples

## Example 1: Hero Section

### Input HTML
```html
<section class="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
  <div class="text-center text-white">
    <h1 class="text-6xl font-bold mb-4">Welcome to Our Platform</h1>
    <p class="text-xl mb-8">The best solution for your business needs</p>
    <a href="/get-started" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
      Get Started
    </a>
  </div>
</section>
```

### Output: model.json
```json
{
  "id": "hero",
  "type": "SharedSlice",
  "name": "Hero",
  "description": "Hero section with heading, description, and CTA button",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": {
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Heading",
            "single": "heading1",
            "placeholder": "Enter hero heading"
          }
        },
        "description": {
          "type": "StructuredText",
          "config": {
            "label": "Description",
            "single": "paragraph",
            "placeholder": "Enter hero description"
          }
        },
        "cta_text": {
          "type": "Text",
          "config": {
            "label": "CTA Text",
            "placeholder": "e.g., Get Started"
          }
        },
        "cta_link": {
          "type": "Link",
          "config": {
            "label": "CTA Link",
            "placeholder": "Select a link",
            "select": null
          }
        }
      },
      "items": {}
    }
  ]
}
```

### Output: index.tsx
```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <div className="text-center text-white">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h1 className="text-6xl font-bold mb-4">{children}</h1>
            ),
          }}
        />
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-xl mb-8">{children}</p>
            ),
          }}
        />
        <PrismicNextLink
          field={slice.primary.cta_link}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
        >
          {slice.primary.cta_text}
        </PrismicNextLink>
      </div>
    </section>
  );
};

export default Hero;
```

---

## Example 2: Feature Cards

### Input HTML
```html
<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-4">Our Features</h2>
    <p class="text-gray-600 text-center mb-12">Everything you need to succeed</p>

    <div class="grid md:grid-cols-3 gap-8">
      <div class="text-center p-6 rounded-lg border border-gray-200">
        <img src="/feature1.png" alt="Fast" class="w-16 h-16 mx-auto mb-4">
        <h3 class="text-2xl font-semibold mb-2">Lightning Fast</h3>
        <p class="text-gray-600">Optimized performance for the best user experience</p>
      </div>

      <div class="text-center p-6 rounded-lg border border-gray-200">
        <img src="/feature2.png" alt="Secure" class="w-16 h-16 mx-auto mb-4">
        <h3 class="text-2xl font-semibold mb-2">Secure</h3>
        <p class="text-gray-600">Bank-level security to protect your data</p>
      </div>

      <div class="text-center p-6 rounded-lg border border-gray-200">
        <img src="/feature3.png" alt="Scalable" class="w-16 h-16 mx-auto mb-4">
        <h3 class="text-2xl font-semibold mb-2">Scalable</h3>
        <p class="text-gray-600">Grows with your business needs</p>
      </div>
    </div>
  </div>
</section>
```

### Output: model.json
```json
{
  "id": "features",
  "type": "SharedSlice",
  "name": "Features",
  "description": "Features section with repeating feature cards",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": {
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Heading",
            "single": "heading2",
            "placeholder": "Section heading"
          }
        },
        "description": {
          "type": "StructuredText",
          "config": {
            "label": "Description",
            "single": "paragraph",
            "placeholder": "Section description"
          }
        }
      },
      "items": {
        "icon": {
          "type": "Image",
          "config": {
            "label": "Icon",
            "constraint": {
              "width": 64,
              "height": 64
            },
            "thumbnails": []
          }
        },
        "title": {
          "type": "StructuredText",
          "config": {
            "label": "Feature Title",
            "single": "heading3",
            "placeholder": "Feature name"
          }
        },
        "description": {
          "type": "StructuredText",
          "config": {
            "label": "Feature Description",
            "single": "paragraph",
            "placeholder": "Describe the feature"
          }
        }
      }
    }
  ]
}
```

### Output: index.tsx
```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-4xl font-bold text-center mb-4">{children}</h2>
            ),
          }}
        />
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-gray-600 text-center mb-12">{children}</p>
            ),
          }}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {slice.items.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-gray-200">
              <PrismicNextImage
                field={item.icon}
                className="w-16 h-16 mx-auto mb-4"
              />
              <PrismicRichText
                field={item.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mb-2">{children}</h3>
                  ),
                }}
              />
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-gray-600">{children}</p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
```

---

## Example 3: Testimonials

### Input HTML
```html
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <img src="/avatar1.jpg" alt="John Doe" class="w-12 h-12 rounded-full mr-4">
          <div>
            <h4 class="font-semibold">John Doe</h4>
            <p class="text-sm text-gray-600">CEO, Company Inc</p>
          </div>
        </div>
        <p class="text-gray-700 italic">"This product has transformed our business. Highly recommended!"</p>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <img src="/avatar2.jpg" alt="Jane Smith" class="w-12 h-12 rounded-full mr-4">
          <div>
            <h4 class="font-semibold">Jane Smith</h4>
            <p class="text-sm text-gray-600">CTO, Startup Ltd</p>
          </div>
        </div>
        <p class="text-gray-700 italic">"Incredible support and amazing features. Worth every penny!"</p>
      </div>
    </div>
  </div>
</section>
```

### Output: model.json
```json
{
  "id": "testimonials",
  "type": "SharedSlice",
  "name": "Testimonials",
  "description": "Customer testimonials section",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": {
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Section Heading",
            "single": "heading2",
            "placeholder": "e.g., What Our Customers Say"
          }
        }
      },
      "items": {
        "avatar": {
          "type": "Image",
          "config": {
            "label": "Customer Avatar",
            "constraint": {},
            "thumbnails": []
          }
        },
        "name": {
          "type": "Text",
          "config": {
            "label": "Customer Name",
            "placeholder": "e.g., John Doe"
          }
        },
        "title": {
          "type": "Text",
          "config": {
            "label": "Job Title",
            "placeholder": "e.g., CEO, Company Inc"
          }
        },
        "quote": {
          "type": "StructuredText",
          "config": {
            "label": "Testimonial Quote",
            "multi": "paragraph,strong,em",
            "placeholder": "Customer testimonial"
          }
        }
      }
    }
  ]
}
```

### Output: index.tsx
```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-3xl font-bold text-center mb-12">{children}</h2>
            ),
          }}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {slice.items.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <PrismicNextImage
                  field={item.avatar}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              </div>
              <PrismicRichText
                field={item.quote}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-gray-700 italic">{children}</p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
```

---

## Key Patterns to Remember

1. **Section Headings** → Primary `StructuredText` field with `single: "heading2"`
2. **Descriptions** → Primary `StructuredText` field with `single: "paragraph"` or `multi`
3. **Repeating Cards/Items** → Items array with fields for each card
4. **Images/Icons** → `Image` field type with appropriate constraints
5. **Links/CTAs** → Combination of `Text` field for label + `Link` field for URL
6. **Simple Labels** → `Text` field type
7. **Rich Content** → `StructuredText` with `multi` config

## Common Conversions

| HTML Element | Prismic Field Type | Config |
|--------------|-------------------|--------|
| `<h1>` - `<h6>` | StructuredText | `single: "heading1"` (or appropriate level) |
| `<p>` | StructuredText | `single: "paragraph"` or `multi: "paragraph,strong,em"` |
| `<img>` | Image | With constraint if specific dimensions needed |
| `<a>` | Link + Text | Link for href, Text for label |
| `<div>` (repeating) | items array | One field per child element |
| Simple text | Text | Plain text field |
| Background color | Color | Color picker |
| Video embed | Embed | For iframe embeds |
