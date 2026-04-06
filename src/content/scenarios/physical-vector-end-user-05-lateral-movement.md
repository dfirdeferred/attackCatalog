---
title: "The Physical Vector — Chapter 5: Lateral Movement"
chain: "physical-vector"
chainOrder: 5
role: "end-user"
attack: "lateral-movement"
choices:
  - label: "Reflect on how the physical attack impacted everyone"
    next: "debrief"
  - label: "Consider what you can do differently to stay safe"
    next: "debrief"
isDebrief: false
---

The full scope of the breach is finally revealed at a company town hall. Using the Golden Ticket, the attackers spent four days moving silently through the company's network, accessing system after system. The CEO reads from a prepared statement: customer personal data, employee Social Security numbers, product designs, and confidential legal documents were all stolen.

You learn that the attackers accessed the HR system where your personal information is stored — your home address, Social Security number, bank account for direct deposit, and emergency contact details. The company is offering two years of free credit monitoring, and you are urged to place a fraud alert on your credit file.

A colleague who works in customer service is nearly in tears. She will have to call clients to explain that their data was compromised. The irony is not lost on anyone: the entire catastrophe started because of wireless mice. A $20 device with no encryption opened the door to a breach that will cost millions.

---

## What Is Lateral Movement?

Lateral movement is when an attacker moves from one computer or system to another within a company's network after breaking in. Think of it like a burglar who enters through one window and then walks through every room in the house, opening drawers and taking valuables. In a computer network, the attacker uses stolen credentials or forged tickets to log into different servers and workstations, searching for valuable data — customer records, financial documents, trade secrets, or personal information. Each "hop" to a new system gives the attacker access to more data and more credentials, expanding their reach until they can access everything.
