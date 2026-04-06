---
title: "The Cloud Bridge — Chapter 4: Golden SAML"
chain: "cloud-bridge"
chainOrder: 4
role: "it-admin"
attack: "golden-saml"
choices:
  - label: "Rotate the ADFS token-signing certificate and rebuild federation trust"
    next: "lateral-movement"
  - label: "Migrate from ADFS to cloud-native authentication to eliminate the attack surface"
    next: "lateral-movement"
isDebrief: false
---

The forensics team escalates with critical findings. Memory analysis of your ADFS server reveals that the attacker extracted the token-signing private key using a tool resembling AADInternals. With this certificate, they can forge SAML assertions for any user, with any role claim, trusted by every relying party in your federation — Microsoft 365, AWS, Salesforce, and your custom line-of-business applications.

You watch in real time as your SIEM correlates impossible authentication events: the same user authenticated to Azure and AWS simultaneously from two different continents, both sessions bearing valid SAML assertions. The assertions were minted outside your ADFS infrastructure entirely. Your identity plane has been completely compromised. Rotating the certificate will invalidate every existing federation trust and cause an enterprise-wide authentication outage. Not rotating it leaves the attacker with a skeleton key to your entire cloud ecosystem.

---

## What Is a Golden SAML Attack?

A Golden SAML attack compromises the token-signing certificate of a SAML identity provider — typically Active Directory Federation Services — enabling the attacker to forge authentication assertions that are cryptographically indistinguishable from legitimate ones. With this capability, the attacker can impersonate any user and claim any group membership or role across all federated service providers. Detection is extremely difficult because the forged tokens are technically valid. Defense requires protecting the ADFS server as a Tier 0 asset, storing signing certificates in hardware security modules, monitoring for SAML assertions issued outside normal ADFS processes, implementing assertion anomaly detection, regularly rotating signing certificates, and considering migration to cloud-native authentication to reduce the ADFS attack surface.
