---
title: "The Physical Vector — Chapter 4: Golden Ticket"
chain: "physical-vector"
chainOrder: 4
role: "end-user"
attack: "golden-ticket"
choices:
  - label: "Comply with the access verification process IT has set up"
    next: "lateral-movement"
  - label: "Ask IT how to tell if your account was used by the attacker"
    next: "lateral-movement"
isDebrief: false
---

Three days after the emergency meeting, things seem to stabilize — then get worse again. IT announces that changing passwords was not enough. The attackers possess something called a "Golden Ticket" that lets them impersonate any employee indefinitely, regardless of password changes.

To illustrate, a colleague in accounting shares her experience: she noticed that files in a restricted folder she manages had been accessed at 3:00 AM — by her own username. Activity logs show her account downloading financial reports from a server in another country. She was home asleep.

IT begins a painstaking process of verifying every employee's account. You spend an hour on the phone with the help desk confirming your identity, resetting your credentials, and having your account permissions manually verified against an offline list. Meanwhile, you cannot access several systems you need for your work. The backlog of help desk calls stretches to four hours. Productivity across the company has ground to a near halt.

---

## What Is a Golden Ticket Attack?

A Golden Ticket attack is like someone creating a perfect counterfeit master key card that opens every door in your company — and the key card never expires. In your company's network, there is a special system that issues digital "tickets" to prove who you are when you access different resources. An attacker who steals the right secret can forge these tickets for any employee, giving themselves unlimited access. Changing your password does not help because the forged ticket does not depend on your password. IT must change a special master secret on the core system — a delicate process that can temporarily disrupt access for everyone.
