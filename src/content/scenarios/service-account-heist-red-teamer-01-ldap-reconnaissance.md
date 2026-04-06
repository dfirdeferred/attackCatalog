---
title: "The Service Account Heist — Chapter 1: LDAP Reconnaissance"
chain: "service-account-heist"
chainOrder: 1
role: "red-teamer"
attack: "ldap-reconnaissance"
choices:
  - label: "Filter for accounts without pre-authentication to identify AS-REP Roasting targets"
    next: "as-rep-roasting"
  - label: "Query for accounts with the DONT_REQUIRE_PREAUTH flag set"
    next: "as-rep-roasting"
isDebrief: false
---

Day one of the engagement. You have a standard domain user account — the same level of access any new hire receives. You fire up SharpHound from a contractor workstation and let it rip. Within four minutes, you have a complete graph of the domain: eight thousand user objects, two hundred and thirty-one service accounts, four hundred and twelve group objects, and every trust relationship mapped.

You pivot to targeted LDAP queries. First, accounts with servicePrincipalName attributes — Kerberoasting candidates. You find forty-seven. Next, accounts with the UserAccountControl flag DONT_REQUIRE_PREAUTH — AS-REP Roasting candidates. Twelve hits. You cross-reference with the BloodHound graph and identify three service accounts that are both AS-REP Roastable and members of high-privilege groups. The domain's LDAP permissions are default — no restrictions on attribute reads, no query logging configured. The blue team has no visibility into what you just mapped. Your attack plan writes itself.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is the foundational enumeration phase of Active Directory attacks. Using tools like SharpHound, BloodHound, PowerView, or raw LDAP queries, an attacker with any authenticated domain account can enumerate all directory objects and their attributes. Key targets include accounts with servicePrincipalName attributes (Kerberoasting), accounts without pre-authentication (AS-REP Roasting), group membership chains to Domain Admins, computer objects and their delegations, trust relationships, and GPO links. Default Active Directory permissions grant all authenticated users broad read access to the directory. Effective enumeration typically takes minutes and provides a complete roadmap for privilege escalation. The data feeds into graph-based analysis tools like BloodHound to identify the shortest path to domain compromise.
