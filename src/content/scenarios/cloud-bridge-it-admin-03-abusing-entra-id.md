---
title: "The Cloud Bridge — Chapter 3: Abusing Entra ID"
chain: "cloud-bridge"
chainOrder: 3
role: "it-admin"
attack: "abusing-entra-id"
choices:
  - label: "Enumerate all app registrations and revoke suspicious OAuth grants"
    next: "golden-saml"
  - label: "Restrict user consent and enable admin-only app approval workflows"
    next: "golden-saml"
isDebrief: false
---

While investigating the session hijacking, you spot something in the Azure audit logs that makes your stomach drop. The attacker used the compromised session to register a new multi-tenant application in your Entra ID tenant. The app was granted User.Read, Mail.ReadWrite, and Directory.Read.All through user consent — permissions that fell below your admin consent threshold. No approval workflow was triggered.

The rogue application has been making Graph API calls for six hours: enumerating all user objects, reading mailbox contents, and mapping group memberships. It operates with its own client credentials now, completely independent of the original compromised user. Even after full session revocation, this application retains persistent access to your tenant. You need to find and remove every OAuth grant it received — and you discover it already consented itself into three subsidiary tenants through cross-tenant trust.

---

## What Is Abusing Entra ID Application Permissions?

Abusing Entra ID application permissions exploits the OAuth 2.0 consent model in Microsoft's identity platform to gain persistent, credential-independent access to organizational resources. Attackers register or compromise applications and obtain delegated or application-level permissions to read mail, access files, enumerate directories, and more. User consent, if unrestricted, allows any authenticated user to grant permissions without admin awareness. Defensive measures include configuring the admin consent workflow to require approval for all application permissions, disabling user consent entirely or restricting it to verified publishers, regularly auditing app registrations and OAuth grants via the Microsoft Graph API, alerting on new application registrations and permission grants, and implementing application access policies to restrict which apps can access specific resources.
