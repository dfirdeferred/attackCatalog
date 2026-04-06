---
title: "AdminSDHolder Modification"
severity: "Critical"
category: "AD Infrastructure"
targets:
  - "Active Directory"
  - "Protected Groups"
killChains:
  - "silent-persistence"
roles:
  c-level:
    intro: "AdminSDHolder modification gives attackers a self-healing backdoor — even if you remove their access, Active Directory automatically restores it every 60 minutes."
    whyCare: "Business impact: persistent administrative access that survives standard remediation efforts. Incident responders who do not check AdminSDHolder will believe they have evicted the attacker while the backdoor remains."
  it-admin:
    intro: "By modifying the ACL on the AdminSDHolder object, an attacker ensures that the SDProp process will propagate their permissions to all protected groups (Domain Admins, Enterprise Admins, etc.) every 60 minutes."
    whyCare: "Detection: regularly audit the ACL on CN=AdminSDHolder,CN=System,DC=domain. Alert on any ACE additions granting non-standard accounts permissions on this object. Check for unexpected adminCount=1 attributes."
  end-user:
    intro: "This attack is entirely invisible to end users, but it allows attackers to maintain permanent administrative control over the systems and data you rely on."
    whyCare: "If you notice unexplained administrative changes or new accounts appearing in privileged groups, report them to your security team immediately."
  red-teamer:
    intro: "Add a controlled account's SID to the AdminSDHolder DACL with GenericAll or WriteDACL rights. The SDProp process will propagate these permissions to all protected AD groups within 60 minutes."
    whyCare: "Extremely resilient persistence mechanism — manually removing the attacker's group membership is automatically reversed by SDProp. Requires modifying AdminSDHolder or already having domain-level write access."
---

AdminSDHolder modification is a stealthy Active Directory persistence technique that exploits the Security Descriptor Propagator (SDProp) process. By adding a malicious Access Control Entry (ACE) to the AdminSDHolder object's ACL, the attacker ensures that their permissions are automatically propagated to all protected security groups every 60 minutes — creating a self-restoring backdoor that survives standard remediation.

## How It Works

1. **Gain write access to AdminSDHolder** — the attacker needs Domain Admin or equivalent privileges to modify the AdminSDHolder object's ACL, located at `CN=AdminSDHolder,CN=System,DC=domain,DC=com`
2. **Add a malicious ACE** — the attacker grants a controlled account (or a new account) permissions such as GenericAll, WriteDACL, or WriteOwner on the AdminSDHolder object
3. **SDProp propagation** — every 60 minutes, the SDProp process runs and copies the AdminSDHolder ACL to all protected groups and users (Domain Admins, Enterprise Admins, Schema Admins, Account Operators, etc.)
4. **Persistent access** — even if defenders remove the attacker's membership from protected groups, the propagated ACL permissions allow the attacker to re-add themselves or directly control those groups

## Impact

- Self-restoring administrative persistence that auto-heals every 60 minutes
- Survives manual remediation of group memberships and permission changes
- Grants control over all protected AD groups (Domain Admins, Enterprise Admins, etc.)
- Difficult to detect without explicitly auditing the AdminSDHolder ACL
- The attacker can re-escalate privileges at will even after apparent eviction

## Key Mitigations

- **Audit AdminSDHolder ACL regularly** — compare the current DACL against a known-good baseline and alert on any additions
- **Monitor SDProp activity** — track Event ID 4780 (ACL reset on protected accounts) and investigate unexpected resets
- **Restrict AdminSDHolder modification rights** — ensure only the most privileged, tightly controlled accounts can write to this object
- **Implement AD change monitoring** — deploy tools that detect and alert on ACL changes to critical AD objects in real time
- **Include AdminSDHolder in incident response playbooks** — any domain compromise investigation must check AdminSDHolder for persistence
