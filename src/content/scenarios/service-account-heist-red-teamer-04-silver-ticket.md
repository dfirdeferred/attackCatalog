---
title: "The Service Account Heist — Chapter 4: Silver Ticket"
chain: "service-account-heist"
chainOrder: 4
role: "red-teamer"
attack: "silver-ticket"
choices:
  - label: "Use the Silver Ticket access to extract credentials from the SQL Server"
    next: "service-account-attacks"
  - label: "Leverage the forged service ticket to pivot to additional service accounts"
    next: "service-account-attacks"
isDebrief: false
---

With the gmsa_sqlcluster NTLM hash, you forge a Silver Ticket using Mimikatz. You craft a TGS ticket for the MSSQLSvc SPN, embedding a forged PAC that claims Domain Admin group membership. The ticket is created entirely offline — no domain controller interaction, no authentication log entry. You present it directly to the SQL Server, which validates it locally using the service account's key and grants sysadmin access.

You are now a database administrator on the production SQL cluster. You run xp_cmdshell to verify OS-level access, enumerate linked servers to discover additional database instances, and query system tables for stored credentials. The SQL Server Agent has jobs running under additional service account credentials stored in plaintext in the msdb database. You extract connection strings from application configuration tables that contain credentials for upstream and downstream systems. The Silver Ticket gave you access to one service, but the data inside that service reveals the credentials for a dozen more. Eleven days pass before network anomaly detection flags your unusual query volume.

---

## What Is a Silver Ticket Attack?

A Silver Ticket is a forged Kerberos TGS ticket crafted using the NTLM hash of a service account. The attacker uses tools like Mimikatz or Rubeus to create a ticket with arbitrary PAC data — claiming any user identity and any group memberships — that is validated locally by the target service without contacting the domain controller. This bypass of centralized authentication means no logon events are generated at the KDC. The technique provides targeted, stealthy access to specific services: SQL Server via MSSQLSvc, web applications via HTTP, file shares via CIFS, and any other Kerberos-authenticated service. Offensive value lies in the combination of stealth — no KDC logging — and persistence — tickets can be minted repeatedly as long as the service account hash remains valid.
