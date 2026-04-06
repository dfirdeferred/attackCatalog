---
title: "The Physical Vector — Debrief"
chain: "physical-vector"
chainOrder: 99
role: "end-user"
attack: "debrief"
choices: []
isDebrief: true
---

The Physical Vector is complete. As an employee, you experienced how an attack on a simple wireless mouse cascaded into a company-wide breach that exposed your personal data and disrupted your daily work.

**The attack chain you experienced:**

1. **MouseJacking** — Attackers used a radio device to inject commands through your wireless mouse's unencrypted USB dongle, executing malicious code without anyone touching your keyboard.
2. **Rainbow Table** — Your password, along with hundreds of others, was cracked in seconds using precomputed tables because common patterns like words with numbers are predictable.
3. **Zerologon** — The attackers exploited an unpatched vulnerability to seize control of the company's central access management system.
4. **Golden Ticket** — A forged master authentication token gave the attackers unlimited access to every system, surviving password resets.
5. **Lateral Movement** — The attackers spent four days accessing every critical system, stealing customer data, employee personal information, and company secrets.

**Personal takeaways:** Physical devices matter — use wired or encrypted Bluetooth peripherals when possible. Use long, unique passphrases (not word+number patterns) and a password manager. Enable multi-factor authentication on every account. Report any unusual computer behavior immediately, no matter how minor it seems. And remember: your personal information stored in work systems is only as safe as the company's overall security posture.
