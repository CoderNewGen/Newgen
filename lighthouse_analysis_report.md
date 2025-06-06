# 🔍 Lighthouse Tool Analysis

## 📄 Description
The Lighthouse audit was performed on the HMRC Self-Assessment Preproduction Cessation page on **June 6, 2025**. This audit aimed to evaluate the page’s **performance**, **accessibility**, **best practices**, and **SEO** using Lighthouse version **12.6.0** in a desktop Chrome environment.

The focus of this report is on **performance optimization**, particularly on rendering speed, blocking times, and critical content load.

---

## 📎 Evidence

### ✅ Page Audited
- **URL**: `https://account.hmrc.gov.uk/self-assessment/preprod/cessation`
- **Tool Version**: Lighthouse 12.6.0
- **Run Date**: 2025-06-06T12:15:11Z

### 📊 Key Metrics

| Metric                       | Value   | Score | Status              |
|-----------------------------|---------|-------|---------------------|
| First Contentful Paint      | 0.9s    | 0.93  | ✅ Good             |
| Largest Contentful Paint    | 2.1s    | 0.59  | ⚠️ Needs Improvement |
| Speed Index                 | 0.9s    | 0.99  | ✅ Excellent         |
| Total Blocking Time         | 280 ms  | 0.62  | ⚠️ Moderate          |
| Max Potential FID           | 330 ms  | 0.30  | ❌ Poor              |

### 📍 Opportunities & Diagnostics

- Preconnect not used for third-party: `https://02179917.akstat.io`
- Main-thread work too long: 1.1s
- Long JavaScript tasks (>50ms): 4 tasks detected
- LCP element render delay: ~3905ms
- Unminified/unused JS & CSS
- Responsive image formats missing
- Offscreen images not lazy-loaded
- Suboptimal caching for static assets

---

## 👥 Ownership

| Area                        | Responsible Team           |
|-----------------------------|----------------------------|
| React App Performance       | React Frontend Team        |
| Asset Optimization (JS/CSS) | Frontend DevOps / Build Tooling |
| Image Optimization          | Design/UX/Frontend         |
| Third-party Scripts         | Business/Analytics Team    |
| Hosting / Cache Policies    | Platform Engineering / SRE |

---

## 🛠️ Recommendations

### 🔹 Performance Optimizations

- **Reduce Largest Contentful Paint (LCP)**
  - Inline critical content
  - Avoid lazy-loading LCP images
  - Preload LCP resources (fonts, images)

- **Reduce Total Blocking Time**
  - Defer unused JS
  - Break long tasks into smaller chunks
  - Use `requestIdleCallback` or code-splitting

- **Improve First Input Delay (FID)**
  - Reduce JavaScript execution time
  - Use async/defer attributes on script tags

### 🔹 Resource Optimization

- Add `<link rel="preconnect">` for external domains
- Minify and compress JS/CSS
- Remove unused code and adopt tree-shaking
- Use responsive and next-gen image formats (`<img srcset>`, WebP)
- Lazy-load offscreen images
- Use long cache TTLs for static resources

---

## 📎 Others

- No runtime warnings were reported by Lighthouse.
- Benchmark Index: 569
- User Agent: Chrome 137.0.0.0 on Windows 10
- Gather Mode: Navigation
- Filmstrip screenshots were captured during loading
