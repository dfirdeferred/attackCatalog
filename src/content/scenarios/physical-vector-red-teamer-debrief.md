---
title: "The Physical Vector — Debrief"
chain: "physical-vector"
chainOrder: 99
role: "red-teamer"
attack: "debrief"
choices: []
isDebrief: true
---

The Physical Vector is complete. As a red teamer, you executed a full engagement chain from a physical-layer wireless attack to complete domain compromise and data exfiltration without ever sending a phishing email.

**The attack chain you executed:**

1. **MouseJacking** — Injected keystroke payloads into unencrypted 2.4 GHz wireless dongles from 60 meters away, achieving code execution in 3.2 seconds without any network access.
2. **Rainbow Table** — Cracked 73% of 412 NTLM hashes in 47 seconds using precomputed tables, obtaining four IT admin credentials and a backup service account.
3. **Zerologon** — Exploited CVE-2020-1472 on unpatched domain controllers, resetting the DC machine account password on attempt 212 and performing DCSync for full credential extraction.
4. **Golden Ticket** — Forged Kerberos TGTs for six identities using the KRBTGT hash (unchanged for 847 days), with AES256 encryption to avoid RC4-based detection.
5. **Lateral Movement** — Systematically accessed 47 servers across 12 segments over four days, exfiltrating 3.8 TB of customer data, IP, HR records, and legal documents.

**Offensive takeaways:** Physical proximity attacks bypass all network perimeter controls. NTLM's lack of salting makes rainbow tables permanently viable. Zerologon remains exploitable in environments with deferred patching. KRBTGT rotation neglect guarantees Golden Ticket persistence. And network segmentation that trusts AD authentication is no segmentation at all against a domain-level compromise.
