---
title: "The Service Account Heist — Chapter 4: Silver Ticket"
chain: "service-account-heist"
chainOrder: 4
role: "it-admin"
attack: "silver-ticket"
choices:
  - label: "Deploy PAC validation on all critical services to detect forged tickets"
    next: "service-account-attacks"
  - label: "Implement service account credential vaulting with automatic rotation"
    next: "service-account-attacks"
isDebrief: false
---

With the gMSA passwords in hand, the attacker forges a Silver Ticket for your production SQL Server service. You only discover this because a database administrator notices unusual query patterns — large SELECT statements against customer tables at 2 AM, using an account that normally only runs stored procedures during business hours. But when you check the domain controller authentication logs, there is no record of this account authenticating. The ticket was forged offline and presented directly to SQL Server.

You examine the Kerberos ticket using network capture and find the telltale signs: the service ticket was not issued by the KDC. The Privilege Attribute Certificate inside the ticket claims Domain Admin group membership for an account that is actually a standard service account. SQL Server validated the ticket locally using its own service account key and honored the elevated privileges without question. The attacker has had sysadmin-level access to your SQL cluster for at least eleven days, and your centralized logging never recorded a single authentication event.

---

## What Is a Silver Ticket Attack?

A Silver Ticket is a forged Kerberos Ticket Granting Service (TGS) ticket created using the password hash of a service account. Unlike a Golden Ticket, which requires the KRBTGT hash and provides domain-wide access, a Silver Ticket targets a specific service and is validated locally by that service rather than the domain controller. This means the attack completely bypasses centralized authentication logging. The forged ticket can contain arbitrary Privilege Attribute Certificate (PAC) data, allowing the attacker to claim any group memberships and escalate privileges on the target service. Detection requires enabling PAC validation on services so they verify tickets with the domain controller, monitoring for service access without corresponding KDC ticket issuance, and comparing PAC claims against actual group memberships.
