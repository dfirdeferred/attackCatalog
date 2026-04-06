---
title: "The Cloud Bridge — Chapter 3: Abusing Entra ID"
chain: "cloud-bridge"
chainOrder: 3
role: "red-teamer"
attack: "abusing-entra-id"
choices:
  - label: "Use the rogue app's credentials to access the ADFS server"
    next: "golden-saml"
  - label: "Enumerate federation configuration to find the SAML signing certificate"
    next: "golden-saml"
isDebrief: false
---

With persistent access via stolen tokens, you pivot to establishing credential-independent persistence. You register a new multi-tenant application in the Entra ID tenant — naming it something innocuous like "Microsoft Document Sync Service." You request Mail.ReadWrite, Directory.Read.All, and Application.ReadWrite.OwnedBy permissions through the user consent flow. The tenant allows user consent for permissions classified as "low impact," and your permission set squeaks under the threshold.

The application now has its own client ID and secret, completely independent of any user account. You enumerate the entire directory: every user, every group membership, every administrative role assignment. You map the trust relationships and discover the tenant is federated with on-premises Active Directory through ADFS. The federation metadata endpoint is publicly accessible, revealing the token-signing certificate's public key. You just need the private key — and your directory enumeration shows a service account with access to the ADFS server.

---

## What Is Abusing Entra ID Application Permissions?

Abusing Entra ID application permissions exploits the OAuth 2.0 consent framework to establish persistent, identity-independent access to a target tenant. Attackers register applications and request permissions through user or admin consent flows. If user consent is unrestricted, any authenticated user can grant delegated permissions. The application receives its own credentials (client secret or certificate) that function independently of user accounts. From an offensive perspective, this provides persistence that survives user password resets, account disablement, and session revocation. The technique also enables enumeration of the entire directory, identification of high-value targets, and mapping of trust relationships including federation configurations that reveal further escalation paths.
