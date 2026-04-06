---
title: "The Physical Vector — Debrief"
chain: "physical-vector"
chainOrder: 99
role: "c-level"
attack: "debrief"
choices: []
isDebrief: true
---

The Physical Vector is complete. As a senior executive, you witnessed how a physical-layer attack on wireless peripherals cascaded into a full domain compromise and massive data exfiltration.

**The attack chain you experienced:**

1. **MouseJacking** — An attacker within radio range injected keystrokes through unencrypted wireless peripherals, gaining initial code execution without any phishing or social engineering.
2. **Rainbow Table** — Stolen password hashes were cracked in hours using precomputed tables, exposing 200+ employee credentials including finance and IT admin accounts.
3. **Zerologon** — An unpatched critical vulnerability allowed the attacker to reset the domain controller's machine password and gain Domain Admin access in a single request.
4. **Golden Ticket** — The KRBTGT hash was extracted and used to forge a master Kerberos ticket granting unlimited domain access.
5. **Lateral Movement** — The attacker traversed every network segment over 96 hours, exfiltrating customer records, IP, HR data, and privileged legal communications.

**Executive takeaways:** Physical security is cyber security. Wireless peripheral policies, timely patching (especially for CVSS 10.0 vulnerabilities), legacy system replacement budgets, and network segmentation that does not rely solely on Active Directory authentication are all essential. The $340,000 in deferred patching and system upgrades resulted in an incident costing orders of magnitude more.
