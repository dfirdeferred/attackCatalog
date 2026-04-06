---
title: "The Physical Vector — Debrief"
chain: "physical-vector"
chainOrder: 99
role: "it-admin"
attack: "debrief"
choices: []
isDebrief: true
---

The Physical Vector is complete. As an IT administrator, you experienced how a physical-layer wireless attack bypassed every digital perimeter control and cascaded into complete domain compromise.

**The attack chain you experienced:**

1. **MouseJacking** — Unencrypted 2.4 GHz wireless peripherals allowed keystroke injection from 100 meters away, bypassing all network security.
2. **Rainbow Table** — 73% of stolen NTLM hashes cracked instantly due to predictable password patterns and the unsalted nature of NTLM.
3. **Zerologon** — An unpatched CVE-2020-1472 allowed the attacker to reset the DC machine account password in approximately 256 attempts.
4. **Golden Ticket** — The KRBTGT hash, unchanged for 847 days, enabled forging of arbitrary Kerberos tickets with unlimited lifetime and privileges.
5. **Lateral Movement** — Forged tickets authenticated across 47 servers in 12 segments over four days, bypassing segmentation that trusted AD authentication.

**Technical takeaways:** Maintain a wireless HID device inventory and enforce encrypted peripherals, implement salted password hashing or long passphrase policies, patch critical CVEs immediately with legacy compatibility testing on an aggressive timeline, rotate KRBTGT every 180 days, and design network segmentation that includes authentication-independent controls. The attack surface is wider than the network perimeter — it extends to every wireless device on every desk.
