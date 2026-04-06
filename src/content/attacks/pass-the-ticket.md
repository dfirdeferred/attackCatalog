---
title: "Pass-the-Ticket Attack"
severity: "High"
category: "Kerberos / AD Authentication"
targets:
  - "Active Directory"
  - "Windows Endpoints"
killChains:
  - "zero-day-cascade"
roles:
  c-level:
    intro: "Pass-the-Ticket allows attackers to steal Kerberos tickets from one machine and replay them on another, moving laterally through your network without knowing any passwords."
    whyCare: "Business impact: attackers can impersonate legitimate users across systems, accessing sensitive resources while appearing as trusted employees in authentication logs."
  it-admin:
    intro: "Pass-the-Ticket involves exporting Kerberos TGT or TGS tickets from a compromised host's memory and injecting them into another session to authenticate as the ticket's owner."
    whyCare: "Detection: monitor for Event ID 4624 logon events where the source host does not match the ticket's original issuance. Look for Mimikatz-style LSASS access patterns (Event ID 4663)."
  end-user:
    intro: "If your workstation is compromised, attackers can steal your active login tickets and use them to access resources as you — without needing your password."
    whyCare: "Lock your workstation when stepping away and report any unusual activity on your account, such as access to systems you did not visit."
  red-teamer:
    intro: "Export tickets from LSASS using Mimikatz (`sekurlsa::tickets /export`) or Rubeus (`dump`), then inject them on another host with `kerberos::ptt` or Rubeus `ptt`."
    whyCare: "Effective for lateral movement without triggering NTLM-based detections. TGTs enable broader access than TGS tickets. Combine with delegation abuse for cross-forest movement."
---

Pass-the-Ticket (PtT) is a lateral movement technique where an attacker steals Kerberos tickets from a compromised system's memory and injects them into another session to impersonate the ticket's owner. Unlike Pass-the-Hash, this attack operates entirely within the Kerberos protocol and does not require NTLM hashes.

## How It Works

1. **Compromise an endpoint** — the attacker gains local administrator access on a Windows machine through any initial access vector
2. **Extract tickets from memory** — using Mimikatz (`sekurlsa::tickets /export`) or Rubeus (`dump`), the attacker exports TGT and TGS tickets from the LSASS process
3. **Transfer tickets** — the exported `.kirbi` or `.ccache` ticket files are moved to the attacker's machine or another compromised host
4. **Inject the ticket** — using Mimikatz (`kerberos::ptt`) or Rubeus (`ptt`), the attacker loads the stolen ticket into their current logon session
5. **Access resources** — the attacker can now authenticate to any service the original ticket grants access to, impersonating the legitimate user

## Impact

- Lateral movement across the network without knowing any passwords
- Stolen TGTs provide broad access to any service the user can reach
- Bypasses password-based detection since no credentials are transmitted
- Legitimate-looking authentication events make forensic analysis difficult
- Tickets remain valid until they expire (default 10 hours for TGTs)

## Key Mitigations

- **Protect LSASS** — enable Credential Guard or configure LSASS as a Protected Process Light (PPL) to prevent ticket extraction
- **Reduce ticket lifetimes** — lower TGT and TGS maximum lifetimes to shrink the exploitation window
- **Monitor for anomalous logons** — correlate logon source hosts with ticket issuance records to detect replayed tickets
- **Restrict local admin access** — limit who has administrative privileges on endpoints to reduce extraction opportunities
- **Implement network segmentation** — contain lateral movement by segmenting high-value resources from general workstations
