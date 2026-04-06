---
title: "The Service Account Heist — Debrief"
chain: "service-account-heist"
chainOrder: 99
role: "it-admin"
attack: "debrief"
choices: []
isDebrief: true
---

The attack chain methodically exploited service account weaknesses at every stage: unrestricted LDAP enumeration revealed targets, disabled pre-authentication enabled offline password cracking, rushed gMSA migration introduced new extraction paths, cracked credentials enabled Silver Ticket forgery, cascading service account trust provided lateral movement, and domain controller access yielded total credential compromise via NTDS.dit extraction.

Each stage represented a defensive opportunity that was missed due to configuration debt, incomplete migrations, and insufficient monitoring. The gap between security intent and operational reality was the attacker's primary advantage.

---

## Lessons Learned

Key technical takeaways for defending against service account kill chains: implement LDAP query monitoring and anomaly detection to catch enumeration early, audit all accounts for the DONT_REQUIRE_PREAUTH flag and enforce pre-authentication universally, strictly limit gMSA password retrieval permissions to only the specific computer accounts that need them, enable PAC validation on all Kerberos-authenticated services to detect Silver Tickets, maintain a comprehensive service account inventory with least-privilege enforcement and regular attestation, monitor domain controllers for Volume Shadow Copy creation and NTDS.dit access, implement tiered administration to restrict domain controller access, and treat disabled alert rules as security vulnerabilities that require formal risk acceptance. Every monitoring gap is an opportunity for an attacker to operate undetected.
