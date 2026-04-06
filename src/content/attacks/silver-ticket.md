---
title: "Silver Ticket Attack"
severity: "High"
category: "Kerberos / AD Authentication"
targets:
  - "Active Directory"
  - "Service Accounts"
killChains:
  - "service-account-heist"
roles:
  c-level:
    intro: "A Silver Ticket attack lets an attacker forge authentication tickets for specific services, gaining unauthorized access without ever contacting the domain controller."
    whyCare: "Business impact: compromised services can expose sensitive data, and because Silver Tickets bypass the KDC, they are invisible to centralized authentication logging."
  it-admin:
    intro: "Silver Tickets are forged Ticket Granting Service (TGS) tickets created using a service account's NTLM hash, granting access to that specific service without KDC involvement."
    whyCare: "Detection: look for service access events (Event ID 4624 type 3) without corresponding TGT requests (Event ID 4768). Monitor for service account hash exposure through Kerberoasting or credential dumps."
  end-user:
    intro: "Silver Ticket attacks target services you use daily — file shares, databases, web apps — allowing attackers to impersonate you or access data silently."
    whyCare: "Report any unexpected access patterns or permissions changes on shared services, as they may indicate forged ticket abuse."
  red-teamer:
    intro: "With a service account's NTLM hash, forge TGS tickets using Mimikatz or Rubeus targeting specific SPNs — CIFS for file shares, MSSQLSvc for databases, HTTP for web apps."
    whyCare: "Scoped alternative to Golden Tickets with lower detection risk. The forged TGS never touches the KDC, so TGT-based monitoring is blind to it. Valid until the service account password rotates."
---

A Silver Ticket attack is a Kerberos exploitation technique where an attacker forges a Ticket Granting Service (TGS) ticket for a specific service using that service account's NTLM password hash. Unlike a Golden Ticket, which grants domain-wide access, a Silver Ticket targets individual services — but it also evades KDC-level detection entirely.

## How It Works

1. **Obtain a service account hash** — through Kerberoasting, credential dumping (LSASS, NTDS.dit), or other extraction methods
2. **Identify the target SPN** — determine the Service Principal Name for the service to attack (e.g., `CIFS/fileserver.domain.com` for file shares)
3. **Forge the TGS ticket** — using Mimikatz (`kerberos::golden /service:`) or Rubeus, create a TGS encrypted with the service account's hash
4. **Inject and use the ticket** — load the forged ticket into the session and access the target service as any user, including domain admins

## Impact

- Unauthorized access to specific services (file shares, SQL servers, web applications, Exchange)
- Bypasses the KDC entirely, so no TGT request is logged on the domain controller
- Can impersonate any user, including privileged accounts, for that service
- Persists until the targeted service account's password is changed
- Harder to detect than Golden Tickets since the scope is narrower and less noisy

## Key Mitigations

- **Rotate service account passwords regularly** — use Group Managed Service Accounts (gMSAs) with automatic 30-day rotation
- **Enable PAC validation** — configure services to validate the Privilege Attribute Certificate with the KDC, defeating forged tickets
- **Monitor for TGS without TGT** — correlate service access logs with KDC ticket-granting logs to identify orphaned sessions
- **Minimize service account privileges** — apply least privilege principles to service accounts
- **Implement network segmentation** — restrict which hosts can connect to sensitive services
