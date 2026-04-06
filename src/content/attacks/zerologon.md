---
title: "Zerologon Vulnerability"
severity: "Critical"
category: "AD Infrastructure"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "physical-vector"
roles:
  c-level:
    intro: "Zerologon (CVE-2020-1472) allows an attacker on your network to become Domain Admin in seconds by exploiting a cryptographic flaw in the Netlogon protocol — no credentials required."
    whyCare: "This vulnerability turns any network foothold into total domain compromise instantly, making patch status a board-level risk that directly threatens business continuity."
  it-admin:
    intro: "CVE-2020-1472 exploits a flaw in the AES-CFB8 initialization vector used by the Netlogon Remote Protocol (MS-NRPC), allowing an attacker to set the DC machine account password to empty."
    whyCare: "Detection: monitor Event ID 4742 for computer account password changes on DCs and enforce secure RPC for Netlogon. Patch immediately — there is no compensating control that fully mitigates this."
  end-user:
    intro: "Zerologon is a server-side vulnerability you cannot see directly, but if exploited, the attacker gains control of every account in the organization including yours."
    whyCare: "If your IT team announces an emergency password reset or heightened security measures, cooperate quickly — it may indicate this type of critical infrastructure compromise."
  red-teamer:
    intro: "Zerologon requires only unauthenticated network access to a DC; tools like Impacket's zerologon_tester.py and mimikatz can exploit it to zero out the DC machine account password."
    whyCare: "After zeroing the DC password, use secretsdump to extract all domain hashes. Remember to restore the original password post-exploitation to avoid breaking AD replication."
---

Zerologon (CVE-2020-1472) is a critical vulnerability in Microsoft's Netlogon Remote Protocol (MS-NRPC) that allows an unauthenticated attacker with network access to a domain controller to completely compromise the entire Active Directory domain. It received a CVSS score of 10.0 — the maximum possible severity.

## How It Works

1. **Target a domain controller** — the attacker identifies a reachable DC on the network; no authentication or domain credentials are needed
2. **Exploit the cryptographic flaw** — the Netlogon protocol uses AES-CFB8 encryption with a client-supplied initialization vector. By sending Netlogon authentication attempts with an IV of all zeros, the attacker has a 1-in-256 chance per attempt of successfully authenticating — achievable in seconds
3. **Set the DC machine password to empty** — once authenticated, the attacker calls `NetrServerPasswordSet2` to change the domain controller's machine account password to a known value
4. **Extract domain credentials** — using the compromised DC machine account, the attacker performs a DCSync to dump all password hashes from the domain, including the KRBTGT hash
5. **Achieve full domain compromise** — with the KRBTGT hash, the attacker can forge Golden Tickets and impersonate any user or service in the domain

## Impact

- Unauthenticated escalation to Domain Admin in under 10 seconds
- Complete domain credential compromise via DCSync
- Potential AD replication failure if the DC machine password is not restored
- Enables Golden Ticket, Pass-the-Hash, and full persistence across the domain

## Key Mitigations

- **Patch immediately** — apply the August 2020 security update (KB4565349 and successors) to all domain controllers without exception
- **Enforce secure RPC** — enable the FullSecureChannelProtection registry key to require secure Netlogon connections
- **Monitor for exploitation** — alert on Event ID 5829 (vulnerable Netlogon connections) and Event ID 4742 (DC computer account changes)
- **Network-isolate DCs** — restrict direct network access to domain controllers to authorized systems only
- **Validate patch compliance** — continuously audit that all DCs have the update applied, especially after OS upgrades or new DC promotions
