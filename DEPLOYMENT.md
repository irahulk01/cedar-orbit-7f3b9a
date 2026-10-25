# GitHub and Vercel

This project uses actual Next.js and can be imported directly into Vercel. Live donation collection is disabled in application code. No database or payment secrets are needed for the current preview.

## Push to GitHub

Create an empty repository in your GitHub account, then run these commands from the project directory. Replace YOUR-USER and YOUR-REPO with your repository details.

```sh
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin HEAD
```

Use your preferred GitHub sign-in method if prompted. If origin already exists, inspect it with `git remote -v` before changing it. Never commit an access token or put one directly in a remote URL.

## Deploy to Vercel

1. Sign in to Vercel and choose Add New → Project.
2. Import the GitHub repository.
3. Keep the root directory at the repository root and Framework Preset at Next.js.
4. Use the project defaults: npm install, npm run build, and the default Next.js output directory. Do not configure this project as a static export: it has a server route.
5. Deploy. No environment variables are required for this preview.
6. Set APP_URL to the exact HTTPS deployment origin before exercising the donation preview. This ensures its server origin check works correctly behind hosting proxies. Redeploy after adding or changing the variable.
7. Check the homepage, /accountability, /privacy, and the donation preview.

Expected donation behavior: a Nepal residence or billing selection is rejected; eligible preview requests return DONATIONS_NOT_ENABLED and do not charge anyone. Country declarations are preview checks, not production location verification.

The site contains locally hosted news-image previews supplied by the campaign owner; rights information is on /accountability#press-media. The public launch configuration, recipient details and payment setup remain separate from this preview deployment.
