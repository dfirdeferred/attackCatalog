---
title: "The Cloud Bridge — Chapter 2: Pass-the-Cookie"
chain: "cloud-bridge"
chainOrder: 2
role: "red-teamer"
attack: "pass-the-cookie"
choices:
  - label: "Register a rogue application in the tenant using the stolen session"
    next: "abusing-entra-id"
  - label: "Use the hijacked session to enumerate Entra ID app registrations"
    next: "abusing-entra-id"
isDebrief: false
---

The blue team moved fast — password resets and MFA enforcement within the hour. But you anticipated this. Before the lockout, you used the compromised credentials to authenticate via a headless browser and extracted the complete cookie jar: the Azure AD session cookies, the Office 365 authentication cookies, and most critically, the OAuth refresh tokens stored in the browser's local storage.

You import the cookies into your attack framework. The refresh token has a fourteen-day lifetime and survives password changes. You mint fresh access tokens and continue accessing Microsoft Graph, SharePoint Online, and Exchange as if nothing happened. The blue team's password reset was a speedbump, not a roadblock. You configure automated token refresh to maintain persistence and begin enumerating the tenant for escalation paths — application registrations, service principals, and conditional access policies.

---

## What Is a Pass-the-Cookie Attack?

A Pass-the-Cookie attack involves exfiltrating session cookies and OAuth tokens from a compromised endpoint and replaying them to impersonate the authenticated user. The tokens bypass password changes and MFA because they represent a completed authentication event. Key targets include Azure AD session cookies, Microsoft 365 ESTSAUTH cookies, OAuth2 refresh tokens, and application-specific session tokens. Offensive tooling can extract these from browser storage, memory, or proxy interception. The technique is especially powerful against cloud services where long-lived refresh tokens provide persistent access. Defenders must implement Continuous Access Evaluation and short token lifetimes to limit the window of exploitation.
