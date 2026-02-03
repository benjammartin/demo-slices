---
name: html-to-prismic-slice
description: Converts HTML markup into Prismic Slice components with model.json definitions and React component files. Use when the user wants to turn HTML into a Prismic Slice, create a slice from HTML, or convert markup to Prismic.
requires:
  - refactor-react-a11y
  - consistency
---

# HTML to Prismic Slice Converter

This skill converts HTML markup into fully-functional Prismic Slices, including the model.json definition and React component implementation.

## What This Skill Does

1. **Analyzes HTML Structure**: Parses the provided HTML to identify:
   - Content sections and their hierarchy
   - Text content (headings, paragraphs, etc.)
   - Images and media
   - Links and buttons
   - Repeating elements (lists, cards, etc.)

2. **Generates Prismic Slice Model**: Creates a `model.json` file with:
   - Appropriate field types (StructuredText, Image, Link, etc.)
   - Primary fields for non-repeating content
   - Items fields for repeating content
   - Proper configuration with labels and placeholders

3. **Creates React Component**: Generates a Next.js component that:
   - Uses @prismicio/react helpers
   - Implements proper TypeScript types
   - Preserves the original HTML structure and styling
   - Makes content editable through Prismic CMS

4. **Integrates with Project**: Updates the slices index file to register the new slice

## Instructions

When the user provides HTML to convert, **always reference `references.md`** for choosing appropriate field types and their configurations.

### Step 0: Check for Existing Slices (VARIATIONS FIRST!)

**CRITICAL**: Before creating a new slice, **ALWAYS check if a similar slice already exists** in the `slices/` directory.

1. **List all existing slices**: Check `slices/index.ts` or run `ls slices/`
2. **Read similar slices**: If you find slices with similar purposes (e.g., Hero, HeroWithImage, Feature), read their `model.json` files
3. **Consider using variations**: If the new HTML is similar to an existing slice, **create a variation instead of a new slice**

**When to create a VARIATION (preferred):**

- Same general layout/purpose (e.g., both are hero sections)
- Similar content structure (heading, description, image)
- Different visual style or arrangement
- Example: "Hero with centered text" vs "Hero with image on right"

**When to create a NEW SLICE:**

- Completely different purpose (e.g., testimonials vs contact form)
- Different content structure
- No existing slice matches the use case

**Example Decision Tree:**

- New HTML: Hero section with background video → **Add variation to existing Hero slice**
- New HTML: Pricing table → **Create new Pricing slice** (no similar slice exists)
- New HTML: Feature list in 4 columns → **Add variation to existing Feature slice** (if 3-column exists)

**If creating a variation:**

1. Read the existing slice's `model.json`
2. Add a new object to the `variations` array
3. Reuse the same field structure when possible
4. Only add new fields if absolutely necessary
5. Update the component to handle both variations using `slice.variation`

### Step 1: Analyze the HTML

- Parse the HTML structure
- Identify distinct content elements
- Determine what should be editable in Prismic
- Identify repeating patterns (for the `items` array)
- **Check for custom CSS variables** in the HTML classes (e.g., `bg-background-primary`, `text-text-alternative`)
- **Note any Tailwind v4 theme tokens** that may need to be defined in `app/globals.css`

### Step 2: Create the Slice Name (or Variation Name)

- Ask the user for a slice name (e.g., "hero", "testimonials", "features")
- Use PascalCase for the component name
- Use kebab-case for the directory name

### Step 3: Update CSS Variables (if needed)

**IMPORTANT:** This project uses **Tailwind CSS v4**. Check if the HTML uses custom CSS variables that need to be defined in `app/globals.css`.

Common patterns to look for:

- `bg-background-primary`, `bg-background-alternative`, `bg-background-secondary`
- `text-text-primary`, `text-text-alternative`, `text-text-secondary`
- `border-border-primary`, `border-border-secondary`
- Other custom color tokens or theme variables

**If new variables are needed:**

1. Read the current `app/globals.css` file
2. Add new CSS variables to the `:root` selector (and dark mode variant if applicable)
3. Update the `@theme inline` block to expose variables as Tailwind tokens

**Example:**

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --background-primary: #ffffff;
  --background-alternative: #000000;
  --text-primary: #171717;
  --text-alternative: #ffffff;
  --border-primary: #e5e5e5;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-background-primary: var(--background-primary);
  --color-background-alternative: var(--background-alternative);
  --color-text-primary: var(--text-primary);
  --color-text-alternative: var(--text-alternative);
  --color-border-primary: var(--border-primary);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --background-primary: #0a0a0a;
    --background-alternative: #ffffff;
    --text-primary: #ededed;
    --text-alternative: #171717;
  }
}
```

**If no new variables are needed:**

- Proceed to the next step without modifying `app/globals.css`

### Step 4: Generate model.json

**IMPORTANT:** Before creating the model.json, consult the `references.md` reference file to choose the appropriate field types for the HTML content.

Create the model.json with this structure:

```json
{
  "id": "slice_id",
  "type": "SharedSlice",
  "name": "SliceName",
  "description": "Description of what this slice does",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": {
        // Non-repeating fields go here
      },
      "items": {
        // Repeating fields go here (if any)
      }
    }
  ]
}
```

**Quick Field Selection Guide:**

Refer to `references.md` for complete field type definitions and examples. Common mappings:

- **Simple text** (labels, taglines) → `Text`
- **Headings** (h1-h6) → `StructuredText` with `single` config
- **Rich text/paragraphs** (with formatting) → `StructuredText` with `multi` config
- **Images** → `Image`
- **Links/Buttons** → `Link`
- **Dropdown options** (style variants) → `Select`
- **Colors** → `Color`
- **Numbers** → `Number`
- **Toggle features** → `Boolean`

**Primary vs Items:**

- `primary`: Non-repeating content (main heading, intro text, featured image)
- `items`: Repeating content (list items, testimonials, feature cards, buttons)

See `references.md` for detailed JSON examples and React usage patterns.

### Step 5: Create the React Component

Generate a component at `slices/[slice-name]/index.tsx`:

```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `SliceName`.
 */
export type SliceNameProps = SliceComponentProps<Content.SliceNameSlice>;

/**
 * Component for "SliceName" Slices.
 */
const SliceName = ({ slice }: SliceNameProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="your-classes-here"
    >
      {/* Implement the HTML structure here */}
      {/* Use PrismicRichText for text fields WITH components prop */}
      {/* Use PrismicNextImage for images */}
      {/* Use PrismicNextLink for links */}

      {/* Example for primary fields: */}
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading1: ({ children }) => <h1 className="heading-1">{children}</h1>,
        }}
      />

      <PrismicRichText
        field={slice.primary.description}
        components={{
          paragraph: ({ children }) => <p className="body-text">{children}</p>,
        }}
      />

      {/* Example for items (repeating): */}
      {slice.items.map((item, index) => (
        <div key={index}>
          <PrismicRichText
            field={item.text}
            components={{
              paragraph: ({ children }) => <p className="text-sm">{children}</p>,
            }}
          />
        </div>
      ))}
    </section>
  );
};

export default SliceName;
```

**Key Points:**

- Preserve the original HTML structure and CSS classes
- Use `@prismicio/next` components for images and links
- Use `@prismicio/react` for rich text rendering
- Include TypeScript types from generated `prismicio-types.d.ts`
- Add proper data attributes for Prismic preview

---

#### ⚠️ RÈGLE CRITIQUE : PrismicRichText Styling

**TOUJOURS utiliser la prop `components` pour styliser PrismicRichText. JAMAIS de wrapper div.**

**❌ MAUVAIS PATTERN (NE JAMAIS FAIRE ÇA) :**
```tsx
// ❌ NE PAS entourer PrismicRichText avec un div + className
<div className="body-text">
  <PrismicRichText field={slice.primary.description} />
</div>

// ❌ NE PAS entourer les titres avec des divs
<div className="heading-1">
  <PrismicRichText field={slice.primary.heading} />
</div>
```

**✅ BON PATTERN (TOUJOURS FAIRE ÇA) :**
```tsx
// ✅ Utilise la prop `components` pour styliser les éléments individuels
<PrismicRichText
  field={slice.primary.description}
  components={{
    paragraph: ({ children }) => <p className="body-text">{children}</p>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  }}
/>

// ✅ Pour les titres, applique la classe sur le heading tag directement
<PrismicRichText
  field={slice.primary.heading}
  components={{
    heading1: ({ children }) => <h1 className="heading-1">{children}</h1>,
    heading2: ({ children }) => <h2 className="heading-2">{children}</h2>,
  }}
/>
```

**Pourquoi ?**
- Le pattern avec `components` est la méthode **documentée et recommandée** par Prismic
- Il préserve la sémantique HTML correcte (pas de div inutile)
- Il permet de styliser chaque type d'élément individuellement
- C'est la façon dont tous les slices existants sont codés dans ce projet

**Composants disponibles dans la prop `components`:**
- `heading1`, `heading2`, `heading3`, `heading4`, `heading5`, `heading6` - Titres
- `paragraph` - Paragraphes
- `strong`, `em` - Formatage inline
- `hyperlink` - Liens
- `list`, `listItem`, `oList`, `oListItem` - Listes
- `preformatted` - Code/préformatted
- `embed`, `image` - Media

---

### Step 6: Update Slice Registry

Update `slices/index.ts` to include the new slice:

```typescript
import dynamic from "next/dynamic";

export const components = {
  slice_name: dynamic(() => import("./SliceName")),
  // ... other slices
};
```

### Step 7: Harmonize Styles with Consistency Skill

**IMPORTANT**: After creating the slice component, **always run the `consistency` skill** to ensure styles are harmonized across all slices.

The consistency skill will:

- Verify Tailwind utility classes are used correctly
- Normalize spacing, typography, and colors
- Extract repeated patterns into reusable utilities
- Ensure dark mode compatibility
- Check for inline styles and convert them

**To invoke the consistency skill:**

```
Use the Skill tool to invoke the "consistency" skill
```

This ensures the new slice follows the same style patterns as existing slices in the project.

### Step 8: Generate TypeScript Types

Instruct the user to run:

```bash
npm run slicemachine
```

Then push the slice to Prismic from the Slice Machine UI at http://localhost:9999

## Best Practices

1. **Variations Over New Slices**: Always check existing slices first. Create variations instead of new slices when possible. This keeps the codebase maintainable and reduces duplication.
2. **Use Consistency Skill**: Always invoke the `consistency` skill after creating a new slice to harmonize styles
3. **Tailwind CSS v4**: This project uses Tailwind v4 with CSS variables. Always check if custom theme tokens need to be added to `app/globals.css`
4. **Semantic Field Names**: Use descriptive names like `heading`, `description`, `feature_list` instead of generic names
5. **Appropriate Field Types**: Choose the right Prismic field type for the content (consult `references.md`)
6. **PrismicRichText Styling**: ALWAYS use the `components` prop to style rich text elements. NEVER wrap PrismicRichText with a div + className
7. **Preserve Styling**: Keep original Tailwind/CSS classes in the component
8. **CSS Variables**: If HTML uses custom tokens like `bg-background-primary`, add them to `app/globals.css`
9. **Repeating Content**: Identify lists/cards and put them in `items` array
10. **Image Optimization**: Use `PrismicNextImage` for automatic image optimization
11. **Link Handling**: Use `PrismicNextLink` for proper link handling (internal/external)
12. **Accessibility**: Maintain semantic HTML structure
13. **Keep Components Intact**: Don't split slices into sub-components unnecessarily - keep the JSX semantic and readable

## Example 1: Creating a New Slice

**Input HTML:**

```html
<section class="bg-gray-100 py-12">
  <div class="container mx-auto">
    <h2 class="text-4xl font-bold">Our Features</h2>
    <p class="text-gray-600">Discover what makes us unique</p>
    <div class="grid grid-cols-3 gap-6">
      <div class="card">
        <img src="/icon1.png" alt="Feature 1" />
        <h3>Fast Performance</h3>
        <p>Lightning fast load times</p>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</section>
```

**Output Structure:**

- Slice name: `features`
- Primary fields: `heading`, `subheading`
- Items fields: `icon`, `title`, `description`

## Example 2: Adding a Variation to Existing Slice

**Scenario**: User provides HTML for a hero section with video background, but a Hero slice already exists.

**Existing Hero slice** has:

- Fields: `heading`, `description`, `buttons` (items)
- Variation: "default"

**New HTML:**

```html
<section class="relative">
  <video autoplay loop muted class="absolute inset-0">
    <source src="hero.mp4" type="video/mp4" />
  </video>
  <div class="relative z-10">
    <h1>Welcome</h1>
    <p>Amazing content</p>
  </div>
</section>
```

**Decision**: Add "with_video" variation to existing Hero slice

**Steps:**

1. Read existing `slices/Hero/model.json`
2. Add new variation to the `variations` array:

```json
{
  "id": "with_video",
  "name": "With Video Background",
  "description": "Hero section with video background",
  "primary": {
    "heading": {
      /* same as default */
    },
    "description": {
      /* same as default */
    },
    "background_video": {
      "type": "Link",
      "config": {
        "label": "Background Video",
        "select": "media"
      }
    }
  },
  "items": {
    /* same as default */
  }
}
```

3. Update `slices/Hero/index.tsx` to handle both variations:

```tsx
const Hero = ({ slice }: HeroProps) => {
  const isVideoVariation = slice.variation === "with_video";

  return (
    <section className={isVideoVariation ? "relative" : "section-padding"}>
      {isVideoVariation && slice.primary.background_video && (
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={slice.primary.background_video.url} />
        </video>
      )}
      <div className={isVideoVariation ? "relative z-10" : ""}>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => <h1 className="heading-1">{children}</h1>,
          }}
        />
        {/* ... rest of content */}
      </div>
    </section>
  );
};
```

This approach:

- ✅ Reuses existing fields
- ✅ Keeps related variations together
- ✅ Maintains consistency across the codebase
- ✅ Easier to maintain than separate slices

## Troubleshooting

- **Missing Types**: Run `npm run slicemachine` to regenerate TypeScript types
- **Slice Not Showing**: Check that the slice is registered in `slices/index.ts`
- **Preview Not Working**: Ensure `/slice-simulator` page exists
- **Build Errors**: Verify all Prismic packages are installed

## Additional Resources

- **`references.md`** - Complete Prismic field types reference with JSON examples and React usage
- **`examples.md`** - Real-world examples of Prismic slice implementations
- [Prismic Slice Documentation](https://prismic.io/docs/slices)
- [Prismic Field Types](https://prismic.io/docs/fields)
- [@prismicio/react Technical Reference](https://prismic.io/docs/technical-reference/prismicio-react/v3.md) - Complete API reference for @prismicio/react components and hooks
- [@prismicio/next Documentation](https://prismic.io/docs/technologies/nextjs)
