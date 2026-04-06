---
title: "The Physical Vector — Chapter 4: Golden Ticket"
chain: "physical-vector"
chainOrder: 4
role: "red-teamer"
attack: "golden-ticket"
choices:
  - label: "Forge tickets for multiple identities to blend with normal traffic"
    next: "lateral-movement"
  - label: "Create a Diamond Ticket for even stealthier persistence"
    next: "lateral-movement"
isDebrief: false
---

The DCSync gave you the KRBTGT hash: `aes256-cts-hmac-sha1-96` and `rc4-hmac` variants. You check the KRBTGT account's `pwdLastSet` attribute: 847 days ago. This hash has been valid for over two years, and it will remain valid until the target rotates it — twice.

You forge a Golden Ticket using Mimikatz: `kerberos::golden /user:FakeDA /domain:corp.target.com /sid:S-1-5-21-... /krbtgt:[hash] /id:500 /groups:512,519,520 /ptt`. The ticket grants Domain Admin, Enterprise Admin, and Group Policy Creator privileges with a 10-year lifetime.

For operational security, you also forge tickets impersonating real users — the ERP admin, the backup operator, the R&D lead — so your access patterns blend with legitimate traffic. Each ticket uses the correct encryption type matching the domain's policy (AES256) to avoid the common detection of Golden Tickets using RC4 when AES is enforced. You test each ticket against its target systems. Full access confirmed across the domain.

---

## What Is a Golden Ticket Attack?

Golden Ticket forging uses the KRBTGT AES or RC4 key to generate TGTs with arbitrary PAC contents. The `kerberos::golden` Mimikatz command accepts parameters for username, domain SID, group RIDs, and ticket lifetime. The resulting TGT is cryptographically valid — DCs verify it by decrypting with the KRBTGT key and checking the PAC checksum, both of which pass. Detection opportunities include: TGTs with RC4 when AES is enforced, abnormal ticket lifetimes, PAC group memberships inconsistent with the actual user, and Event ID 4769 anomalies. The Diamond Ticket technique (modifying a legitimately issued ticket) is stealthier because the ticket metadata matches a real DC issuance.
