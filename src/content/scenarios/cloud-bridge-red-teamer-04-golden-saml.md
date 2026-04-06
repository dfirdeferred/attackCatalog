---
title: "The Cloud Bridge — Chapter 4: Golden SAML"
chain: "cloud-bridge"
chainOrder: 4
role: "red-teamer"
attack: "golden-saml"
choices:
  - label: "Forge SAML assertions and pivot across all federated cloud services"
    next: "lateral-movement"
  - label: "Mint tokens for high-privilege roles in AWS and Azure simultaneously"
    next: "lateral-movement"
isDebrief: false
---

You have compromised the service account with ADFS access and landed on the federation server. Using AADInternals, you export the token-signing certificate — the private key that signs every SAML assertion in the environment. This is the crown jewel. With this certificate, you can forge SAML tokens for any user with any claims, trusted by every relying party in the federation.

You craft your first forged assertion: a token claiming to be a Global Administrator with full access to the Azure tenant. You present it directly to the Azure AD SAML endpoint and receive a valid access token. No authentication prompt. No MFA challenge. You repeat the process for AWS, minting a token that assumes the OrganizationAccountAccessRole across every linked AWS account. Then Salesforce. Then the custom ERP. Each federation trust is another door that opens with your forged master key. The defenders will need to rotate the signing certificate and re-establish every federation trust to revoke your access — a process that takes hours and causes enterprise-wide outage.

---

## What Is a Golden SAML Attack?

A Golden SAML attack compromises the SAML identity provider's token-signing certificate, enabling the forging of arbitrary SAML assertions. The attacker extracts the private signing key from the IdP — typically ADFS — using tools like AADInternals, ADFSDump, or direct certificate export. With this key, the attacker mints SAML responses containing any NameID and any attribute claims, which are accepted by all relying parties as cryptographically valid. The attack provides unlimited impersonation across the entire federated ecosystem — any cloud service, any role, any user — and persists until the signing certificate is rotated and all federation trusts are re-established. It is the cloud equivalent of a Golden Ticket but with cross-platform reach.
