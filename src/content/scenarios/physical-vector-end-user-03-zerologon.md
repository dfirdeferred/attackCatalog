---
title: "The Physical Vector — Chapter 3: Zerologon"
chain: "physical-vector"
chainOrder: 3
role: "end-user"
attack: "zerologon"
choices:
  - label: "Follow IT's instructions and stay alert for unusual activity"
    next: "golden-ticket"
  - label: "Ask your manager what this means for your team's data"
    next: "golden-ticket"
isDebrief: false
---

The situation is getting worse. An emergency meeting is called for all staff. The IT director, looking visibly stressed, explains that the attackers have broken into the core system that manages everyone's access to company resources. He uses an analogy: "Imagine someone stole the master key to every door in the building. That is roughly what has happened to our network."

You do not fully understand the technical details — something about a "domain controller" and a "zero-day vulnerability" — but the implications are clear. The attackers can now pretend to be anyone in the company. They could access your files, send emails as you, or read confidential documents you have permission to view.

The IT director announces that external cybersecurity experts are being brought in. In the meantime, employees should assume that any unusual system behavior — unexpected login prompts, files moving or disappearing, emails you did not send — should be reported immediately. The mood in the room is tense. Some colleagues are quietly checking their personal bank accounts on their phones.

---

## What Is Zerologon?

Zerologon is a critical security flaw in the system that controls access to your company's network. Think of this system as the front desk security guard who checks everyone's ID badge before letting them in. Zerologon is like discovering that if someone presents a blank ID badge enough times, the guard will eventually wave them through. Once past the guard, the attacker has the same access as the building manager — they can go anywhere, open any door, and access any room. The flaw was in how the system verified identities, using a mathematical process that had a hidden weakness. Microsoft released a fix, but many organizations were slow to apply it.
