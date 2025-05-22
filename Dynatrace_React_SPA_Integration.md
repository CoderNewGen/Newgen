
# Dynatrace Integration with React SPA (Pega Backend)

## Overview

This guide explains how to integrate **Dynatrace Real User Monitoring (RUM)** into a **React Single Page Application (SPA)**, while respecting user consent and tagging user sessions using **Pega DX API**.

---

## Goals

- Enable frontend monitoring using Dynatrace RUM.
- Delay tracking until the user gives cookie consent.
- Tag users in Dynatrace using Pega DX API response.
- Ensure SPA compatibility with Dynatrace.

---

## Dynatrace Setup

1. **Create a Web Application** in Dynatrace.
2. Copy the **JavaScript RUM snippet** provided (starts with `ruxitagentjs_...`).
3. Enable **SPA support** in the Web Application settings (important for React).

---

## React Implementation

### 1. Load Dynatrace Script Dynamically

```javascript
// src/dynatrace/loadDynatrace.js
export const loadDynatrace = () => {
  const script = document.createElement('script');
  script.src = 'https://<your-dynatrace-url>/ruxitagentjs_XXXX.js?app=react-app';
  script.setAttribute('data-dtconfig', 'app=react-app|spa=1|reportUrl=https://<your-collector>');
  script.async = true;
  document.head.appendChild(script);
};
```

---

### 2. Cookie Consent Component

```javascript
// src/components/CookieConsent.js
const CookieConsent = ({ onAccept }) => {
  const [visible, setVisible] = useState(!localStorage.getItem('cookieConsent'));

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
    onAccept();
  };

  return visible ? (
    <div>
      <p>This site uses cookies for monitoring. Do you accept?</p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  ) : null;
};
```

---

### 3. React App Integration

```javascript
// src/App.js
useEffect(() => {
  const consent = localStorage.getItem('cookieConsent');
  if (consent === 'true') {
    loadDynatrace();
    window.dtrum?.identifyUser('user123'); // Replace with Pega user ID
  }
}, []);
```

---

## How It Works

| Feature              | Description                                                    |
|----------------------|----------------------------------------------------------------|
| **Consent-based loading** | Dynatrace script is only loaded after user accepts cookies.     |
| **SPA support**           | `spa=1` in config ensures page views are tracked in React apps. |
| **User tagging**          | `dtrum.identifyUser()` is called with a Pega user ID after login.|

---

## Cookies to Document

| Cookie     | Description               | Expiry      |
|------------|---------------------------|-------------|
| `rxVisitor`| Visitor/session tracking  | Varies      |
| `dtCookie` | Session correlation       | Per session |
| `dtLatC`   | Performance latency metric| Short-lived |

---

## Disable Dynatrace if Consent Not Given

- Dynatrace script is not added to DOM.
- No tracking or cookies are initialized until consent is true.

---

## Next Steps

- [ ] Replace placeholder URLs and app names.
- [ ] Test using Dynatrace Live Session viewer.
- [ ] Extend tagging with custom metadata (like user role, region, etc).

---

## References

- [Dynatrace Docs – RUM Setup](https://docs.dynatrace.com/docs/observe/digital-experience/web-applications)
- [React SPA Best Practices](https://docs.dynatrace.com/docs/observe/digital-experience/web-applications/single-page-applications)
