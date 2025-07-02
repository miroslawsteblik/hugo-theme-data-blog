
# 1. Convert Shortcodes to Data-Driven Components (Instead of hardcoded shortcodes, use data files:)
```yaml
name: "Miroslaw Steblik"
title: "Data Engineer"
image: "/images/miroslaw_head.jpeg"
description: "Hello! I'm Miroslaw Steblik, a data engineer with 7 years of experience in designing and implementing data infrastructure, ETL pipelines, and analytics solutions."

expertise:
  - title: "Programming"
    tags:
      - name: "Python"
        url: "/tags/python"
      - name: "SQL"
        url: "/tags/sql"
      - name: "Go"
        url: "/tags/go"
  
  - title: "Infrastructure"
    tags:
      - name: "Docker"
        url: "/tags/docker"
      - name: "Kubernetes"
        url: "/tags/kubernetes"
```


# 2. Theme-Agnostic Home Page Template
{{ define "main" }}
<div class="home-container">
  {{ if site.Data.profile }}
    {{ partial "profile-card.html" site.Data.profile }}
    {{ partial "expertise-section.html" site.Data.profile.expertise }}
  {{ else }}
    <!-- Fallback content for users without profile data -->
    <div class="welcome-message">
      <h1>Welcome to {{ site.Title }}</h1>
      <p>Configure your profile in <code>data/profile.yaml</code> to customize this page.</p>
    </div>
  {{ end }}
  
  {{ partial "recent-posts.html" . }}
</div>
{{ end }}

# 3. Configurable About Page Structure
```yaml
sections:
  - title: "Background"
    content: |
      I'm a data engineer with seven years of experience building data solutions in financial services. 
      My background spans both sides of the industry - from data provision at Bloomberg to data consumption at Mercer.
    
  - title: "Projects"
    content: |
      This blog covers the most interesting projects I've worked on - from building data pipelines 
      and designing databases to creating dashboards and reports.
    
  - title: "What I'm Learning Now"
    content: |
      I'm currently fascinated with Go. It's an incredibly fast, functional language that compiles 
      quickly and handles concurrency beautifully.

highlights:
  companies:
    - "Bloomberg"
    - "Mercer"
    - "Bloomberg Fixed Income Data"
  technologies:
    - "dbt"
    - "Python"
    - "PostgreSQL"
    - "Go"
    ```


# 4. Generic Shortcodes Replace specific shortcodes with generic ones:
{{ $type := .Get "type" | default "default" }}
{{ $class := printf "highlight highlight-%s" $type }}
<span class="{{ $class }}">{{ .Inner }}</span>

# usage
{{< highlight type="company" >}}Bloomberg{{< /highlight >}}
{{< highlight type="tech" >}}Python{{< /highlight >}}


# 5. Theme Configuration Options
```
baseURL = 'https://example.com/'
languageCode = 'en-us'
title = 'My Blog'
theme = 'hugo-theme-data-blog'

[params]
  # Theme customization
  bannerImage = '/images/banner.jpg'
  postsPerPage = 6
  showProfileCard = true
  showExpertise = true
  
  # Optional features
  enableHighlights = true
  enableReadingTime = true
  enableTagFiltering = true

[params.social]
  github = ""
  linkedin = ""
  email = ""

# Theme supports these menu items
[[menus.main]]
  name = 'Home'
  url = '/'
  weight = 10

[[menus.main]]
  name = 'About'
  url = '/about/'
  weight = 20

[[menus.main]]
  name = 'Blog'
  url = '/posts/'
  weight = 30
```

hugo-theme-data-blog/
├── exampleSite/           # Example configuration
│   ├── hugo.toml
│   ├── content/
│   │   ├── _index.md
│   │   ├── about.md
│   │   └── posts/
│   └── data/
│       ├── profile.yaml
│       └── about.yaml
├── layouts/
├── assets/
├── static/
├── README.md              # Theme documentation
├── CONFIGURATION.md       # Setup guide
└── theme.toml             # Theme metadata


# Hugo Data Blog Theme

## Quick Start

1. **Install the theme:**
   ```bash
   git submodule add https://github.com/username/hugo-theme-data-blog themes/hugo-theme-data-blog
   ```

2. **Copy example configuration:**
   ```bash
   cp themes/hugo-theme-data-blog/exampleSite/hugo.toml .
   cp -r themes/hugo-theme-data-blog/exampleSite/data .
   ```

3. **Customize your profile:**
   Edit `data/profile.yaml` with your information

4. **Customize your about page:**
   Edit `data/about.yaml` with your content

5. **Start blogging:**
   Create posts in `content/posts/`

## Features

- ✅ Responsive design
- ✅ Profile card with expertise tags
- ✅ Configurable about page
- ✅ Reading time estimation
- ✅ Tag filtering
- ✅ Social media integration


# CHANGELOG
# Migrating from v1.0.0 to v1.1.0

## Breaking Changes

### Home Page Content
**Before (v1.0.0):**
```markdown
{{< profile-card image="/images/miroslaw_head.jpeg" >}}
Hello! I'm Miroslaw Steblik...
{{< /profile-card >}}
```

**After (v1.1.0):**
```yaml
# data/profile.yaml
name: "Your Name"
image: "/images/your-photo.jpg"
description: "Your description here..."
```

### About Page Content
**Before:** Hardcoded shortcodes
**After:** Data-driven configuration in `data/about.yaml`