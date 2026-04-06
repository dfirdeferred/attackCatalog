---
title: "Golden SAML Attack"
severity: "Critical"
category: "Cloud & Identity Federation"
targets:
  - "AD FS"
  - "Cloud Apps"
  - "O365"
killChains:
  - "cloud-bridge"
roles:
  c-level:
    intro: "A Golden SAML attack allows an attacker to forge authentication tokens for any cloud application in your federation, gaining unrestricted access to cloud resources as any user."
    whyCare: "Business impact: complete compromise of all federated cloud services — Microsoft 365, AWS, Salesforce, and every app trusting your identity provider. This was a key technique in the SolarWinds attack."
  it-admin:
    intro: "Golden SAML exploits stolen AD FS token-signing certificates to forge SAML assertions, bypassing MFA and all cloud-side authentication controls."
    whyCare: "Detection: monitor for anomalous SAML token properties — mismatched source IPs, unusual claim values, or tokens issued outside AD FS server activity windows. Rotate token-signing certificates and audit AD FS server access."
  end-user:
    intro: "When attackers forge SAML tokens, they can access your cloud email, files, and applications as you — without triggering any login prompts or MFA challenges."
    whyCare: "Report any unexpected activity in your cloud accounts, such as emails you did not send or files you did not access, as these could indicate token forgery."
  red-teamer:
    intro: "Extract the AD FS token-signing certificate from the AD FS configuration database or DKM container in AD, then forge SAML assertions using ADFSDump and shimit or custom tooling."
    whyCare: "Grants persistent access to all federated cloud services. Forged tokens bypass MFA entirely since authentication is 'already completed' at the IdP. Certificate rotation is the only remediation."
---

A Golden SAML attack is a sophisticated identity federation exploit where an attacker steals the AD FS (Active Directory Federation Services) token-signing certificate and uses it to forge SAML authentication assertions. These forged tokens grant access to any cloud service that trusts the compromised identity provider, effectively bypassing all cloud-side security controls including MFA.

## How It Works

1. **Compromise the AD FS environment** — the attacker gains access to the AD FS server or the AD FS service account through prior credential theft or lateral movement
2. **Extract the token-signing certificate** — the private key is obtained from the AD FS configuration database (WID or SQL), the DKM (Distributed Key Manager) container in Active Directory, or directly from the AD FS server's certificate store
3. **Forge SAML assertions** — using tools like ADFSDump and shimit (or custom scripts), the attacker creates valid SAML tokens for any user, including any claims and roles
4. **Access cloud services** — the forged SAML response is presented to the cloud service provider (Microsoft 365, AWS, etc.), which accepts it as legitimate federated authentication

## Impact

- Complete access to all federated cloud services (Microsoft 365, AWS, Azure, Salesforce, etc.)
- Bypasses MFA entirely since the IdP "already authenticated" the user
- Attacker can impersonate any user, including Global Admins
- Persists until the token-signing certificate is rotated
- No authentication events on the AD FS server since the token is forged externally
- Was a key technique used in the SolarWinds/SUNBURST supply chain attack

## Key Mitigations

- **Protect the AD FS infrastructure** — treat AD FS servers as Tier 0 assets with the same protections as domain controllers
- **Rotate token-signing certificates** — implement regular certificate rotation and monitor for unauthorized access to the signing key
- **Migrate to Azure AD / Entra ID cloud authentication** — reduce reliance on on-premises federation by moving to cloud-native auth (Password Hash Sync or Pass-Through Auth)
- **Monitor SAML token anomalies** — look for tokens with unusual claim values, source IPs, or issuance patterns
- **Enable AD FS logging** — configure verbose auditing on AD FS servers and forward logs to your SIEM
