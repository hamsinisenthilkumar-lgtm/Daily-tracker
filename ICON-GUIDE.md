# How to Create App Icons

The app needs two icon files for PWA functionality:

- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)

## Quick Method

Use an emoji or simple graphic as your icon:

1. Go to https://favicon.io/emoji-favicons/
2. Search for an emoji (🎯, ⚔️, 🎮, etc.)
3. Download the favicon package
4. Rename the largest icons to `icon-192.png` and `icon-512.png`
5. Place them in the `public/` folder

## Custom Design Method

1. Design your icon (use Figma, Canva, or any graphics tool)
2. Export at 512x512 pixels
3. Use https://realfavicongenerator.net/ to generate all sizes
4. Place the icons in `public/` folder

## Temporary Placeholder

For testing, you can create simple colored squares:

### Using ImageMagick (if installed):

```bash
# Create a simple colored square
convert -size 192x192 xc:#6366f1 public/icon-192.png
convert -size 512x512 xc:#6366f1 public/icon-512.png
```

### Using Online Tool:

1. Go to https://placeholder.com/
2. Generate 192x192 and 512x512 images
3. Download and rename them
4. Place in `public/` folder

The app will work without icons, but they're needed for a proper mobile app experience.
