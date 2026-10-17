# ROHI Motorcycles website

Marketing site for ROHI Motorcycles (Rehman Auto Industry, Bahawalpur), built with Next.js 16 and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

1. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the live domain (e.g. `https://www.rohimotorcycles.com`).
   It is used for canonical URLs, the sitemap, robots.txt and social previews.
2. Build and start:

```bash
npm run build
npm start
```

On Vercel, just import the project and add `NEXT_PUBLIC_SITE_URL` under Project Settings → Environment Variables.

## Where things live

- `src/lib/site.ts`: company facts (phone, emails, address, leadership). Edit contact details here.
- `src/data/bikes.ts`: motorcycle lineup and specs.
- `src/data/posts.ts`: blog posts.
- `src/app/icon.png`, `apple-icon.png`, `favicon.ico`: site icons.
