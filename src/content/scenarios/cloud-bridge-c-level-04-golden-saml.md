---
title: "The Cloud Bridge — Chapter 4: Golden SAML"
chain: "cloud-bridge"
chainOrder: 4
role: "c-level"
attack: "golden-saml"
choices:
  - label: "Authorize a full federation trust rotation and vendor notification"
    next: "lateral-movement"
  - label: "Engage a specialized identity forensics firm immediately"
    next: "lateral-movement"
isDebrief: false
---

The external forensics team delivers their preliminary findings, and the room goes quiet. The attacker extracted your ADFS token-signing certificate from the compromised environment and is now forging SAML assertions at will. They can authenticate as any user — to any federated service — without touching Active Directory at all. Your identity infrastructure has been fundamentally subverted.

The implications cascade through every business relationship. Every SaaS vendor trusting your federation, every partner portal, every cloud workload authenticated via SAML is now suspect. Your CTO estimates that rotating the signing certificate will cause twelve hours of authentication downtime across the enterprise. Meanwhile, the attacker has been minting tokens for your AWS root-linked roles. The blast radius is no longer contained to Microsoft services.

---

## What Is a Golden SAML Attack?

A Golden SAML attack involves stealing the token-signing certificate from an identity provider — such as Active Directory Federation Services — and using it to forge SAML authentication tokens. With this certificate, an attacker can create assertions for any user, with any set of claims, granting access to any service provider that trusts the federation. The attack is analogous to a Golden Ticket in Kerberos but extends across cloud boundaries. Because forged tokens are cryptographically valid, they are nearly impossible to detect without monitoring for anomalous assertion patterns. Remediation requires rotating the signing certificate and re-establishing federation trust — a costly and disruptive process.
