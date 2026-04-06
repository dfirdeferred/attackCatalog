---
title: "The Cloud Bridge — Chapter 2: Pass-the-Cookie"
chain: "cloud-bridge"
chainOrder: 2
role: "it-admin"
attack: "pass-the-cookie"
choices:
  - label: "Revoke all active sessions and force reauthentication tenant-wide"
    next: "abusing-entra-id"
  - label: "Deploy continuous access evaluation policies to detect token replay"
    next: "abusing-entra-id"
isDebrief: false
---

You reset the compromised passwords and enforced MFA within the hour, but the attacker is still active. Your Cloud App Security broker shows ongoing API calls to Microsoft Graph and SharePoint Online from the compromised accounts — originating from a VPS in Romania. The attacker exported session cookies from the endpoints before your lockout took effect and is replaying them directly against cloud services.

You check the token lifetimes: your default policy grants one-hour access tokens with fourteen-day refresh tokens. The attacker has already used the refresh token to mint new access tokens that will remain valid regardless of the password change. You need to revoke refresh tokens at the identity provider level and invalidate every active session, but doing so will force twelve hundred employees to reauthenticate during business hours.

---

## What Is a Pass-the-Cookie Attack?

A Pass-the-Cookie attack exploits stolen session tokens — typically browser cookies or OAuth refresh tokens — to impersonate an authenticated user without needing their password or second factor. Attackers extract these tokens through endpoint compromise, malware, adversary-in-the-middle phishing proxies, or memory scraping. Because session tokens represent completed authentication, they bypass password changes and MFA entirely until explicitly revoked. Defense requires implementing Continuous Access Evaluation (CAE) to detect and revoke sessions in near-real-time, shortening token lifetimes, enabling token binding where supported, monitoring for impossible travel and anomalous session reuse, and maintaining the ability to perform emergency tenant-wide session revocation.
