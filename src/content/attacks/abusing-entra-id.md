---
title: "Abusing Entra ID Application Permissions"
severity: "High"
category: "Cloud & Identity Federation"
targets:
  - "Entra ID"
  - "Microsoft 365"
  - "Cloud applications"
killChains:
  - "cloud-bridge"
roles:
  c-level:
    intro: "Attackers abuse Entra ID (formerly Azure AD) application permissions to gain persistent, MFA-immune access to your cloud tenant — reading emails, exfiltrating files, and managing users via API."
    whyCare: "Overprivileged app registrations are a hidden attack surface; a single compromised app secret can grant broader access than a Global Admin account without triggering standard login alerts."
  it-admin:
    intro: "Application permissions in Entra ID grant daemon-level access to Microsoft Graph APIs without user context, meaning a compromised client secret or certificate bypasses all user-based conditional access."
    whyCare: "Detection: audit app registrations for excessive Graph API permissions (Mail.ReadWrite, Files.ReadWrite.All, Directory.ReadWrite.All), monitor service principal sign-ins, and alert on new credential additions."
  end-user:
    intro: "When you consent to an app requesting access to your email or files, you may unknowingly grant an attacker persistent access to your data — even after you change your password."
    whyCare: "Only approve app consent requests from recognized applications, and report any unexpected consent prompts to your IT team immediately."
  red-teamer:
    intro: "Compromising an Entra ID app registration with high-privilege application permissions (not delegated) provides tenant-wide API access that survives user password resets and MFA changes."
    whyCare: "Key techniques: extract client secrets from code repos or Key Vault, abuse illicit consent grants, and escalate via the Application Administrator or Cloud Application Administrator role."
---

Abusing Entra ID Application Permissions is a cloud-native attack technique where adversaries exploit the OAuth 2.0 application model in Microsoft Entra ID (formerly Azure Active Directory) to gain persistent, stealthy access to an organization's cloud resources. Unlike user-based attacks, application permissions operate outside user context, making them invisible to standard user-focused monitoring.

## How It Works

1. **Identify target applications** — the attacker enumerates Entra ID app registrations with high-privilege Microsoft Graph permissions such as Mail.ReadWrite, Files.ReadWrite.All, or Directory.ReadWrite.All
2. **Obtain app credentials** — client secrets or certificates are stolen from source code repositories, Azure Key Vault misconfigurations, environment variables, or through compromising an Application Administrator account
3. **Authenticate as the application** — using the client ID and stolen secret, the attacker obtains an OAuth2 access token via the client credentials flow, bypassing all user-based conditional access and MFA
4. **Access tenant resources** — with the token, the attacker calls Microsoft Graph APIs to read mailboxes, download SharePoint files, enumerate directory objects, or modify user accounts across the entire tenant
5. **Establish persistence** — the attacker adds additional secrets or certificates to the app registration, creates new app registrations with admin-consented permissions, or modifies redirect URIs for future token capture

## Impact

- Tenant-wide access to email, files, Teams messages, and directory data without user interaction
- Bypasses MFA and conditional access policies entirely since no user sign-in occurs
- Persistent access that survives password resets, MFA re-enrollment, and session revocation
- Difficult to detect because service principal activity is often unmonitored

## Key Mitigations

- **Audit application permissions regularly** — review all app registrations and enterprise applications for excessive or unnecessary Graph API permissions
- **Restrict admin consent** — require admin approval for all application permission grants and limit who can consent on behalf of the organization
- **Monitor service principal sign-ins** — enable and alert on service principal sign-in logs in Entra ID, watching for unusual IP addresses or access patterns
- **Rotate and protect app credentials** — store secrets in Key Vault with access policies, use certificates over secrets, and enforce short expiration periods
- **Limit Application Administrator scope** — restrict this role to a minimal set of trusted administrators and monitor for new credential additions to app registrations
