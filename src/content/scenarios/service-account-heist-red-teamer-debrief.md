---
title: "The Service Account Heist — Debrief"
chain: "service-account-heist"
chainOrder: 99
role: "red-teamer"
attack: "debrief"
choices: []
isDebrief: true
---

The Service Account Heist engagement achieved complete domain compromise in sixty-one hours from a standard domain user account, traversing six attack stages without triggering a single security alert. The kill chain exploited service account weaknesses at every stage: unrestricted LDAP enumeration, disabled pre-authentication, overly permissive gMSA membership, absent PAC validation, undocumented service account trust chains, and insufficient domain controller access monitoring.

The most impactful finding was the unmapped service account trust graph. No one in the organization understood that a single SQL service account compromise created a four-hop path to domain controller access through legitimate service-to-service trust relationships.

---

## Lessons Learned

From an offensive perspective, service accounts remain the most reliable path to domain compromise in mature environments. Key findings for the engagement report: default LDAP permissions provide a complete domain roadmap to any authenticated user, AS-REP Roasting provides credential-free offline password cracking for misconfigured accounts, gMSA security depends entirely on the precision of msDS-GroupMSAMembership — OU-level grants negate the password strength advantage, Silver Tickets provide KDC-invisible access that can persist for weeks before behavioral detection triggers, service account trust chains create implicit transitive access paths that organizations rarely map or monitor, and domain controller monitoring gaps — especially disabled alerts — create windows of undetected access that attackers will find and exploit. The remediation roadmap should prioritize service account trust chain mapping, gMSA membership restriction, and domain controller monitoring hardening.
