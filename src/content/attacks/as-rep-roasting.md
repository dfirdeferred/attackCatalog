---
title: "AS-REP Roasting"
severity: "High"
category: "Kerberos / AD Authentication"
targets:
  - "Active Directory"
  - "User Accounts"
killChains:
  - "service-account-heist"
roles:
  c-level:
    intro: "AS-REP Roasting targets accounts that do not require Kerberos pre-authentication, allowing attackers to crack their passwords offline without even needing a valid domain login."
    whyCare: "Business impact: a single misconfigured account can provide an attacker with their first foothold in the domain, leading to lateral movement and privilege escalation."
  it-admin:
    intro: "AS-REP Roasting exploits accounts with the DONT_REQUIRE_PREAUTH flag set, allowing attackers to request AS-REP messages encrypted with the user's hash and crack them offline."
    whyCare: "Detection: audit accounts where pre-authentication is disabled (UAC flag 0x400000). Monitor Event ID 4768 for AS-REQ traffic targeting these accounts, especially from unusual sources."
  end-user:
    intro: "If your account has pre-authentication disabled — often for legacy application compatibility — your password can be cracked by attackers without you ever logging in."
    whyCare: "If you are told your account has special Kerberos settings, ask IT whether pre-authentication is enabled. Use a strong, unique password to resist offline cracking."
  red-teamer:
    intro: "Use Rubeus, GetNPUsers.py, or PowerView to identify accounts without pre-auth, then request AS-REPs and crack them with Hashcat mode 18200."
    whyCare: "Does not require domain authentication in some configurations — can be performed with just a list of usernames. Lower-profile than Kerberoasting since fewer accounts are typically targeted."
---

AS-REP Roasting is a Kerberos attack that targets Active Directory accounts configured without Kerberos pre-authentication. When pre-authentication is disabled, the Key Distribution Center (KDC) will return an encrypted AS-REP message to anyone who requests it — no valid credentials needed. The attacker then cracks this response offline to obtain the account's password.

## How It Works

1. **Enumerate vulnerable accounts** — the attacker queries Active Directory for accounts with the `DONT_REQUIRE_PREAUTH` flag (UAC value 0x400000) using tools like PowerView, Rubeus, or Impacket's `GetNPUsers.py`
2. **Send AS-REQ without pre-auth** — for each vulnerable account, the attacker sends an Authentication Service Request without providing a timestamp encrypted with the user's key
3. **Receive the AS-REP** — the KDC responds with a message containing data encrypted with the target account's NTLM hash
4. **Crack offline** — the attacker extracts the encrypted portion and cracks it with Hashcat (mode 18200) or John the Ripper
5. **Use the credentials** — the recovered plaintext password grants access to the account and all its privileges

## Impact

- Credential compromise without needing any prior domain authentication (in some scenarios)
- Offline cracking generates no failed login attempts or account lockouts
- Vulnerable accounts are often legacy or service accounts with elevated privileges
- Can provide initial domain access when combined with username enumeration
- No detection on the target account itself during the cracking phase

## Key Mitigations

- **Enable Kerberos pre-authentication on all accounts** — audit and remove the DONT_REQUIRE_PREAUTH flag unless absolutely required by legacy applications
- **Enforce strong passwords** — accounts that must have pre-auth disabled should use 25+ character complex passwords
- **Monitor AS-REQ traffic** — alert on AS-REQ messages for accounts with pre-auth disabled, especially from non-standard sources
- **Regular UAC flag audits** — script automated checks for accounts with dangerous UserAccountControl settings
- **Implement compensating controls** — if pre-auth cannot be enabled, restrict the account's privileges and network access to the minimum required
