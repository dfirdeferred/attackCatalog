---
title: "DCShadow Attack"
severity: "Critical"
category: "Identity and Directory Services"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "silent-persistence"
  - "zero-day-cascade"
roles:
  c-level:
    intro: "DCShadow allows an attacker to register a rogue domain controller and push unauthorized changes directly into Active Directory — bypassing all standard security logging."
    whyCare: "Business impact: attackers can silently modify group memberships, reset passwords, and establish persistence that survives most incident response procedures."
  it-admin:
    intro: "DCShadow temporarily registers a compromised machine as a domain controller in the AD schema, then uses replication to inject arbitrary directory changes."
    whyCare: "Detection: monitor for unexpected nTDSDSA object creation in the Configuration partition and anomalous SPN registrations (E3514235-4B06-11D1-AB04). Changes propagated via DCShadow bypass standard security event logs."
  end-user:
    intro: "This attack is invisible to end users, but it can silently change your account permissions or group memberships without anyone noticing."
    whyCare: "If your account suddenly gains or loses access to resources you did not request, report it immediately — it could indicate unauthorized directory modifications."
  red-teamer:
    intro: "DCShadow requires Domain Admin privileges and uses Mimikatz to register a fake DC, push changes via replication, then deregister — leaving minimal forensic evidence."
    whyCare: "Ideal for stealthy persistence: inject SIDHistory, modify ACLs, or alter group memberships. Changes replicate as legitimate DC-to-DC traffic and evade most SIEM rules."
---

A DCShadow attack is an advanced Active Directory persistence technique where an attacker registers a rogue domain controller and uses AD's own replication mechanism to inject malicious changes into the directory. Because the changes arrive through legitimate replication channels, they bypass most security monitoring.

## How It Works

1. **Obtain Domain Admin privileges** — DCShadow requires high-level access, typically achieved through prior credential theft or privilege escalation
2. **Register a rogue DC** — using Mimikatz, the attacker modifies the AD schema to temporarily register the compromised machine as a domain controller by creating the necessary nTDSDSA and SPN objects
3. **Push malicious changes** — the attacker injects arbitrary modifications (group memberships, SIDHistory attributes, ACL changes) through the DRS replication protocol
4. **Deregister the rogue DC** — the fake DC registration is removed, leaving minimal traces of the operation

## Impact

- Persistent backdoor access through injected group memberships or ACL modifications
- Changes bypass security event logs since they appear as normal DC replication
- SIDHistory injection can grant cross-domain privileges
- Extremely difficult to detect and forensically investigate after the fact
- Can undermine trust in the entire directory service

## Key Mitigations

- **Monitor the Configuration partition** — alert on creation of new nTDSDSA objects or unexpected DC registrations
- **Restrict Domain Admin accounts** — limit the number of accounts that could execute this attack
- **Enable Advanced Audit Policy** — configure directory service change auditing at the most granular level
- **Deploy AD-specific detection tools** — use solutions that monitor replication metadata and track changes across all DCs
- **Implement AD object versioning** — track replication metadata sequence numbers to identify unauthorized modifications
