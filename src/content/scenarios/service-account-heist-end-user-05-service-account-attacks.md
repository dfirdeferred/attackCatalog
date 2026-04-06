---
title: "The Service Account Heist — Chapter 5: Service Account Attacks"
chain: "service-account-heist"
chainOrder: 5
role: "end-user"
attack: "service-account-attacks"
choices:
  - label: "Comply with the system access restrictions and ask IT for updates"
    next: "ntds-dit"
  - label: "Follow the emergency procedures and avoid using affected systems"
    next: "ntds-dit"
isDebrief: false
---

By Thursday, the situation has visibly deteriorated. Multiple internal systems are offline or in read-only mode. The company intranet displays a rotating banner of systems under maintenance. Your manager holds an emergency team meeting to explain that a security incident is being investigated and that access to several business applications will be restricted for the next forty-eight hours.

You notice IT staff working around the clock. The explanation from management is careful but incomplete: "An unauthorized party gained access to internal systems through a chain of compromised automated accounts." What this means in practice is that the "robot accounts" running your company's applications — the backup system, the monitoring tools, the deployment platform — were compromised one after another, each one leading the attacker to the next. It is like a burglar who finds a set of master keys and discovers that each key also has a tag showing where the next set of keys is hidden. The cascading failure is why so many systems are affected simultaneously.

---

## What Is a Service Account Attack?

Service accounts are the invisible workers of your company's IT infrastructure — automated accounts that run applications, perform backups, monitor systems, and deploy updates twenty-four hours a day. Unlike your personal account, these accounts do not have a person watching over them in real time. When an attacker compromises a service account, they gain access to whatever that account can touch — and many service accounts have access to far more systems than they actually need. Attackers chain these compromises, jumping from one service account to another across the organization. From your perspective, you will experience this as widespread system outages and access restrictions. Following IT's emergency procedures helps them contain the incident faster.
