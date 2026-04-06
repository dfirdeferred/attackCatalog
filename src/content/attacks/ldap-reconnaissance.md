---
title: "LDAP Reconnaissance"
severity: "Low-Medium"
category: "Reconnaissance"
targets:
  - "Active Directory"
  - "LDAP"
killChains:
  - "domain-takeover"
  - "service-account-heist"
roles:
  c-level:
    intro: "LDAP reconnaissance lets attackers silently map your entire organizational structure, user accounts, and security groups using built-in directory queries."
    whyCare: "Business impact: this is often the first step in a targeted breach — attackers gain a complete blueprint of your identity infrastructure before launching their real attack."
  it-admin:
    intro: "Attackers use standard LDAP queries to enumerate users, groups, computers, OUs, and trust relationships without triggering most default security alerts."
    whyCare: "Detection: monitor for high-volume LDAP queries from non-administrative workstations, especially queries targeting sensitive attributes like adminCount, servicePrincipalName, or userAccountControl."
  end-user:
    intro: "Any domain-joined user account — including yours — can be used to query Active Directory and pull detailed information about every user and computer in the organization."
    whyCare: "If your credentials are compromised, attackers can use your account to silently map the entire network without you ever noticing unusual activity."
  red-teamer:
    intro: "LDAP enumeration via tools like ldapsearch, ADExplorer, or BloodHound's SharpHound collector provides the foundation for privilege escalation path discovery."
    whyCare: "Key queries: enumerate accounts with SPN set (Kerberoastable), find users with adminCount=1, discover unconstrained delegation hosts, and map group nesting for privilege escalation paths."
---

LDAP Reconnaissance is an information-gathering technique where attackers query Active Directory's Lightweight Directory Access Protocol (LDAP) service to enumerate the domain environment. Because any authenticated domain user has read access to most AD objects by default, this attack requires no special privileges.

## How It Works

1. **Gain domain access** — obtain any valid domain credential through phishing, password spraying, or a compromised workstation
2. **Connect to LDAP** — bind to a domain controller on ports 389 (LDAP) or 636 (LDAPS) using tools like ldapsearch, PowerShell's AD module, or SharpHound
3. **Enumerate objects** — query for users, groups, computers, organizational units, Group Policy Objects, and trust relationships
4. **Identify high-value targets** — filter for privileged accounts (adminCount=1), service accounts with SPNs (Kerberoastable), accounts with unconstrained delegation, and stale or disabled accounts
5. **Map attack paths** — feed the collected data into tools like BloodHound to visualize shortest paths to Domain Admin

## Impact

- Provides attackers with a complete map of the domain's users, groups, and security configuration
- Identifies misconfigured accounts and delegation settings ripe for exploitation
- Enables targeted attacks like Kerberoasting, password spraying against privileged accounts, and service account abuse
- Difficult to distinguish from legitimate administrative activity

## Mitigations

- **Restrict LDAP access** — implement LDAP query rate limiting and restrict anonymous LDAP binds
- **Audit LDAP queries** — enable diagnostic logging (Event ID 1644) to capture expensive or unusual LDAP searches
- **Reduce AD exposure** — use the AdminSDHolder and confidential attributes to limit what standard users can read
- **Network segmentation** — restrict which hosts can communicate with domain controllers on LDAP ports
- **Deploy honeypot accounts** — create decoy accounts with attractive attributes to detect enumeration activity
