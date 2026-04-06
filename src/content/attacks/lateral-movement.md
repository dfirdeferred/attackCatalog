---
title: "Lateral Movement"
severity: "Critical"
category: "Post-Exploitation"
targets:
  - "All network resources"
killChains:
  - "domain-takeover"
  - "cloud-bridge"
  - "physical-vector"
  - "ai-breach"
roles:
  c-level:
    intro: "Lateral movement is the phase where an initial breach escalates into an enterprise-wide compromise, as attackers hop between systems to reach high-value targets."
    whyCare: "Business impact: lateral movement transforms a single compromised endpoint into a full domain or cloud breach. The speed of detection and containment during this phase directly determines the scope and cost of the incident."
  it-admin:
    intro: "Lateral movement encompasses multiple techniques — Pass-the-Hash, Pass-the-Ticket, RDP, WMI, PsExec, SSH, and more — used to traverse the network after an initial foothold."
    whyCare: "Detection: correlate authentication logs across systems to identify unusual logon patterns. Monitor for remote service creation (Event ID 7045), WMI process creation (Event ID 4688), and anomalous RDP sessions."
  end-user:
    intro: "Lateral movement often starts from a compromised workstation — possibly yours — and spreads across the network using stolen credentials and remote access tools."
    whyCare: "Keep your workstation secure, lock it when unattended, and report any unexpected behavior such as programs launching on their own or unexplained network activity."
  red-teamer:
    intro: "Chain techniques like credential dumping, PtH, PtT, WMI exec, PsExec, RDP hijacking, and SMB relay to traverse network segments from initial access to domain controller compromise."
    whyCare: "The art of lateral movement is choosing the right technique for each hop to minimize detection. Map the network, identify trust relationships, and exploit the least-monitored paths to high-value targets."
---

Lateral movement is a post-exploitation phase where attackers traverse a network from their initial foothold toward high-value targets such as domain controllers, database servers, and cloud infrastructure. It is not a single technique but a multi-phase strategy that combines credential theft, remote execution, and network enumeration to expand control across the environment.

## How It Works

1. **Establish initial foothold** — the attacker compromises a single endpoint through phishing, exploitation, or other initial access vectors
2. **Enumerate the network** — using tools like BloodHound, PowerView, or native commands (net view, nltest), the attacker maps hosts, shares, trusts, and privilege paths
3. **Harvest credentials** — LSASS dumping, SAM extraction, Kerberos ticket theft, or keylogging provides credentials for other accounts and systems
4. **Move to adjacent systems** — the attacker authenticates to other hosts using techniques such as Pass-the-Hash (NTLM), Pass-the-Ticket (Kerberos), PsExec, WMI, RDP, SSH, or SMB
5. **Escalate and repeat** — on each new system, the attacker harvests additional credentials and identifies paths to higher-privilege targets, repeating the cycle until the objective is reached

## Impact

- Transforms a single endpoint compromise into organization-wide breach
- Enables access to domain controllers, databases, file servers, and cloud management planes
- Difficult to contain once underway due to the use of legitimate credentials and protocols
- Each hop provides new credentials and new network visibility
- Dwell time is often weeks or months before detection, allowing full objective completion

## Key Mitigations

- **Implement network segmentation** — isolate sensitive systems and restrict lateral traffic between network zones
- **Deploy endpoint detection and response (EDR)** — detect credential dumping, remote execution, and anomalous process behavior on every endpoint
- **Enforce least privilege** — remove unnecessary local admin rights, restrict RDP access, and limit service account scope
- **Enable Credential Guard and LAPS** — protect against hash extraction and local admin password reuse
- **Monitor authentication patterns** — use SIEM rules to detect impossible travel, unusual logon sources, and credential reuse across multiple hosts
- **Adopt zero trust architecture** — verify every access request regardless of network location, reducing the value of network position alone
