---
title: "The Silent Persistence — Debrief"
chain: "silent-persistence"
chainOrder: 99
role: "red-teamer"
attack: "debrief"
choices: []
isDebrief: true
---

This chain demonstrated a persistence-focused approach to Active Directory compromise. Rather than rushing to ransomware, the objective was establishing resilient, layered access that survives defender remediation. Each persistence mechanism served a different purpose and had different detection characteristics.

---

## Key Takeaways for Red Teamers

**Layer persistence across different detection domains.** AdminSDHolder abuses AD replication, DCShadow evades LDAP logging, Skeleton Key patches process memory, and SSP persists via the registry. Defenders who detect one mechanism may miss the others. Document which persistence methods survived defender response.

**Test credential rotation resilience.** One of the most valuable findings from this chain is whether the target can effectively rotate credentials when an SSP is capturing every new password. If your engagement reveals this gap, it is a critical finding.

**Measure time to detection for each technique.** Track how long each persistence mechanism remained undetected. This data helps defenders prioritize monitoring investments: if AdminSDHolder modification went undetected for 30 days but Skeleton Key was caught in 3 hours, the priority is clear.
