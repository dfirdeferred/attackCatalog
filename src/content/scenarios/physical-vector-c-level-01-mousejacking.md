---
title: "The Physical Vector — Chapter 1: MouseJacking"
chain: "physical-vector"
chainOrder: 1
role: "c-level"
attack: "mousejacking"
choices:
  - label: "Order an immediate audit of all wireless peripherals"
    next: "rainbow-table"
  - label: "Issue a policy mandating Bluetooth-only encrypted devices"
    next: "rainbow-table"
isDebrief: false
---

Your physical security team delivers an unsettling report. During a routine RF sweep of the executive floor, they detected unauthorized wireless transmissions on 2.4 GHz frequencies consistent with a MouseJack attack. A threat actor in the parking garage — or even across the street — has been injecting keystrokes into employees' computers through their wireless mice and keyboards.

The implications are staggering. The CFO uses a popular wireless mouse at her desk, where she accesses the company's banking portal and approves wire transfers. The general counsel drafts privileged legal documents on a wireless keyboard. Neither device uses encryption.

Your CISO estimates that 60% of the company's 1,200 wireless peripherals are vulnerable models from three major manufacturers. Replacing them all will cost approximately $180,000 and take weeks. Meanwhile, every keystroke on a vulnerable device could be intercepted, and arbitrary commands could be injected without any visible indication to the user.

---

## What Is MouseJacking?

MouseJacking is a class of wireless security vulnerabilities discovered in 2016 that affect non-Bluetooth wireless mice and keyboards from major manufacturers including Logitech, Dell, HP, Microsoft, and others. These devices communicate with USB dongle receivers using unencrypted or weakly encrypted radio protocols on the 2.4 GHz band. An attacker within radio range (up to 100 meters) can use a $15 radio transceiver to inject keystrokes into a victim's computer by spoofing the wireless peripheral, effectively typing arbitrary commands as if they were sitting at the keyboard.
