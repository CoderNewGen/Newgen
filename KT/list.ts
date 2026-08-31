| #  | Document                                | What it should cover                                                              |
| -- | --------------------------------------- | --------------------------------------------------------------------------------- |
| 1  | **Project & Application Overview**      | Business purpose, applications, architecture, environments, team structure        |
| 2  | **Frontend Architecture & Design**      | React architecture, application structure, design decisions, patterns             |
| 3  | **React Development Guide**             | Coding standards, folder structure, components, hooks, routing, state management  |
| 4  | **Pega React SDK Integration**          | Pega DX/React SDK, OOTB methods, configuration, integration patterns              |
| 5  | **Common Components & Shared Services** | CookiePage, ServiceFallbackPageWrapper, common utilities, shared modules          |
| 6  | **Authentication & Security**           | OAuth2, token management, interceptors, protected routes, security considerations |
| 7  | **API & Backend Integration**           | APIs, fetch patterns, error handling, request/response flows                      |
| 8  | **Build, Deployment & CI/CD**           | npm, Webpack, JFrog, pipelines, configuration, deployment process                 |
| 9  | **Environment & Configuration Guide**   | DEV/QA/UAT/PROD configs, environment variables, sdk-config, base paths            |
| 10 | **Testing & Quality**                   | Jest, React Testing Library, test strategy, coverage, accessibility               |
| 11 | **Monitoring & Troubleshooting**        | Dynatrace, logs, common issues, service shutter/fallback, troubleshooting         |
| 12 | **Known Issues & Operational Runbook**  | Current issues, workarounds, support procedures, things the new vendor must know  |



  3
3. React Development & Coding Guidelines

This should be more of a developer handbook.

Include:

Component development
Functional components
Props
Hooks
Custom hooks
Component composition
Reusable components

React patterns

Explain approved patterns for:

API calls
Forms
Navigation
Error handling
Loading states
Modals
Accessibility
Conditional rendering

4.
Pega React SDK Integration

Definitely make this a separate document.

Because this is probably the biggest knowledge-transfer risk.

Document:

Pega architecture
React Application
       ↓
Pega React SDK
       ↓
Pega APIs / DX API
       ↓
Pega Platform

Explain:

How React communicates with Pega
SDK initialization
Configuration
sdk-config.json
Authentication
OOTB SDK methods
SDK components
Data retrieval
Data submission
Case/page interaction
Error handling

Most importantly:

"What the SDK provides vs what we implement"

This will be extremely useful for the incoming vendor.

Example:

Requirement	Pega OOTB	Custom React
Case interaction	SDK	—
Authentication	SDK/config	Wrapper/interceptor
UI component	Some OOTB	Custom
Validation	Depends	React/custom
Navigation	—	React Router


5
Common Components & Shared Services

Create a document specifically for components that are used across applications.

For example:

CookiePage

Explain:

Purpose
Where used
Props
Behaviour
Dependencies
Configuration
Known issues
ServiceFallbackPageWrapper

Document:

React Application
       ↓
ServiceFallbackPageWrapper
       ↓
D_ShutterLookup
       ↓
Service available?
   ↙          ↘
 YES           NO
 ↓             ↓
Application    Shutter/Fallback Page

Also document any other:

authentication wrappers
error boundaries
API utilities
common hooks
shared components
accessibility components
6. Authentication & Security

Make this a separate document because it is important for an HMRC project.

Cover:

Authentication flow
OAuth2
Access token
Refresh token
Token expiry
Token refresh
Fetch interceptor
ProtectedRoute
Logout
Session handling
Navigation cancellation
Security headers if applicable
Secrets/configuration

A sequence diagram would be useful:

User
 ↓
React App
 ↓
Authentication
 ↓
Access Token
 ↓
API Request
 ↓
Token Validation
 ↓
Pega/API

Also document what must never be changed without security review.

7. API Integration Guide

Document how frontend interacts with backend/Pega.

Include:

API inventory
Endpoint purpose
HTTP methods
Authentication requirements
Request format
Response format
Error responses
Retry behaviour
Timeout behaviour
AbortController/navigation cancellation
Error handling

Example:

API	Purpose	Method	Auth	Used By
API A	Case retrieval	GET	OAuth	CHB
API B	Case update	POST	OAuth	ED Start

Don't put credentials/secrets in the document.

8. Build, CI/CD & Deployment

This should allow a new developer to go from:

Git clone → npm install → run locally → build → deploy

Document:

Git
 ↓
npm install
 ↓
Webpack
 ↓
Unit Tests
 ↓
Build
 ↓
JFrog Artifactory
 ↓
CI/CD
 ↓
Environment

Include:

Node version
npm version
package manager
install commands
build commands
test commands
lint commands
Webpack configuration
JFrog
pipeline overview
artifact creation
deployment process

Also document common build issues you've already encountered.

9. Environment & Configuration

I'd keep this separate from CI/CD.

Document:

LOCAL
DEV
QA
UAT
PROD

For each:

URL
purpose
configuration source
API configuration
Pega configuration
authentication configuration
feature flags
base URL
sdk-config.json
environment-specific differences

Don't put actual secrets/tokens/passwords into the handover.

10. Testing & Quality

Cover:

Unit testing
Jest
React Testing Library
Test structure
Mocking
Coverage expectations
Integration testing

Explain relevant integration testing.

Accessibility

Since this is HMRC/GDS-related, document:

WCAG 2.2 expectations
keyboard navigation
screen reader considerations
semantic HTML
focus management
error messaging
accessibility testing
Quality gates
Code
 ↓
Unit Tests
 ↓
Coverage
 ↓
Lint
 ↓
Build
 ↓
Security/Quality checks
 ↓
Deployment
11. Monitoring & Troubleshooting

This is another high-value document.

Especially document Dynatrace.

Create a troubleshooting matrix:

Problem	Possible Cause	How to Check	Resolution
Page doesn't load	JS/build issue	Browser console	Check deployment
API 401	Token expired	Network tab	Check token refresh
Service unavailable	Shutter	D_ShutterLookup	Check service status
Blank page	Routing/base href	Browser/network	Check Webpack/base path
SDK error	Configuration	sdk-config	Validate environment config

Also include:

Browser debugging
Network debugging
Dynatrace
Application logs
Pega logs where applicable
Common production incidents
12. Known Issues & Operational Runbook

I would make this a living document.

Sections:

Known issues
Issue #1
Description:
Impact:
Workaround:
Permanent fix:
Status:
Production support
Incident
 ↓
Check application
 ↓
Check browser/network
 ↓
Check Dynatrace
 ↓
Check API
 ↓
Check Pega
 ↓
Escalate if required
"Things we learned the hard way"

This is actually one of the most valuable sections for a vendor handover.

Include things like:

Webpack/base href gotchas
sdk-config.json requirements
React Router behaviour
token refresh edge cases
navigation/abort behaviour
service shutter behaviour
environment-specific differences
deployment quirks
One More Document I'd Strongly Recommend
13. Technical Decision Log / ADR

As the outgoing React Lead, don't just document what the architecture is. Document why.

For example:

ADR-001 — Redux not used

Decision: Application does not use Redux.

Reason:
State management is handled through React state/hooks and Pega SDK capabilities.

Implication:
New features should not introduce Redux unless there is an agreed architectural requirement.

ADR-002 — React Router v6

Decision: React Router v6.22.3.

Reason: ...

Migration considerations: ...

ADR-003 — Pega SDK OOTB approach

Decision: Use SDK-provided capabilities where possible rather than duplicating Pega functionality in React.

  HMRC-React-Handover/
│
├── 00-Handover-Index.md
│
├── 01-Project-Application-Overview.md
│
├── 02-Frontend-Architecture.md
│
├── 03-React-Development-Guidelines.md
│
├── 04-Pega-React-SDK-Integration.md
│
├── 05-Common-Components-and-Services.md
│
├── 06-Authentication-and-Security.md
│
├── 07-API-Integration.md
│
├── 08-Build-CI-CD-and-Deployment.md
│
├── 09-Environment-and-Configuration.md
│
├── 10-Testing-and-Accessibility.md
│
├── 11-Monitoring-and-Troubleshooting.md
│
├── 12-Known-Issues-and-Runbook.md
│
└── 13-Architecture-Decision-Records.md
