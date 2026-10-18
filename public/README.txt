This folder holds static assets served from the site root.

Add the ORYNTAL logo here as a clean PNG with a transparent background:

  public/oryntal-logo.png

Recommended:
- Transparent background (vertical + horizontal lockups)
- Minimum 72px tall at @1x, plus a @2x export
- An SVG version if available (preferred for crisp scaling)

Then update components/Logo.tsx to render it with next/image.
