# Data Blog Theme

A professional Hugo theme designed for data engineering and tech blogs.

## Features

- 📱 Responsive design with mobile-first approach
- 🎨 Clean, modern layout with customizable colors
- 📝 Blog post listing with card-based layout
- 🏷️ Tag and category support
- 📄 About page with profile card and expertise sections
- 🔗 Social media integration
- 🚀 Fast loading and SEO optimized
- 📑 Pagination support

## Installation

### As Hugo Module (Recommended)

1. Initialize your site as Hugo module:
```bash
hugo mod init github.com/yourusername/your-site-name
```

2. Add the theme to your `hugo.toml`:
```toml
[module]
[[module.imports]]
  path = "github.com/miroslawsteblik/hugo-theme-data-blog"
```

3. Update modules:
```bash
hugo mod get -u
```

### As Git Submodule

```bash
git submodule add https://github.com/miroslawsteblik/hugo-theme-data-blog.git themes/data-blog
```

Then add to your `hugo.toml`:
```toml
theme = "data-blog"
```

## Configuration

Copy the example configuration from `exampleSite/hugo.toml` to your site's root and customize as needed.

### Required Parameters

```toml
[params]
  author = "Your Name"
  description = "Your site description"
  
[params.social]
  github = "yourusername"
  linkedin = "yourprofile"
  email = "your@email.com"
```

## Content Structure

### Posts

Create posts in `content/posts/`:

```markdown
---
title: "Your Post Title"
date: 2025-01-01T10:00:00Z
author: "Your Name"
description: "Post description"
featured_image: "/images/your-image.jpg"
card_image: "/images/card-image.jpg"  # Optional: different image for cards
tags: ["tag1", "tag2"]
draft: false
---

Your post content here...
```

### About Page

Create `content/about/_index.md` for your about page.

## Customization

The theme supports extensive customization through:

- CSS variables in `assets/css/style.css`
- Layout overrides in your site's `layouts/` directory
- Partial template overrides
- Custom shortcodes

## Development

```bash
# Clone the theme
git clone https://github.com/miroslawsteblik/hugo-theme-data-blog.git

# Run example site
cd hugo-theme-data-blog/exampleSite
hugo server --themesDir ../..
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.
