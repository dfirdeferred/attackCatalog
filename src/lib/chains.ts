export type ChainSlug =
  | "domain-takeover" | "silent-persistence" | "cloud-bridge"
  | "service-account-heist" | "zero-day-cascade" | "physical-vector" | "ai-breach";

export type AttackSlug =
  | "ldap-reconnaissance" | "password-spraying" | "kerberoasting" | "golden-ticket"
  | "dcsync" | "lateral-movement" | "ransomware" | "credential-stuffing"
  | "pass-the-hash" | "adminsdholder" | "dcshadow" | "skeleton-key" | "ssp-attack"
  | "password-attack" | "pass-the-cookie" | "abusing-entra-id" | "golden-saml"
  | "as-rep-roasting" | "gmsa-exploitation" | "silver-ticket" | "service-account-attacks"
  | "ntds-dit" | "hafnium" | "powershell-attacks" | "plaintext-password-extraction"
  | "pass-the-ticket" | "mousejacking" | "rainbow-table" | "zerologon"
  | "chatgpt-prompt-injection" | "sql-injection" | "malware" | "man-in-the-middle";

export interface Chain {
  name: string;
  slug: ChainSlug;
  description: string;
  attacks: readonly AttackSlug[];
}

export const CHAINS: readonly Chain[] = [
  {
    name: "The Domain Takeover",
    slug: "domain-takeover",
    description: "A full Active Directory compromise — from initial reconnaissance through Kerberos abuse to domain-wide ransomware deployment.",
    attacks: ["ldap-reconnaissance", "password-spraying", "kerberoasting", "golden-ticket", "dcsync", "lateral-movement", "ransomware"],
  },
  {
    name: "The Silent Persistence",
    slug: "silent-persistence",
    description: "An attacker gains a foothold with stolen credentials and establishes deep, stealthy persistence mechanisms that survive password resets.",
    attacks: ["credential-stuffing", "pass-the-hash", "adminsdholder", "dcshadow", "skeleton-key", "ssp-attack"],
  },
  {
    name: "The Cloud Bridge",
    slug: "cloud-bridge",
    description: "A hybrid attack that pivots from compromised cloud credentials through Entra ID into on-premises infrastructure via federation abuse.",
    attacks: ["password-attack", "pass-the-cookie", "abusing-entra-id", "golden-saml", "lateral-movement"],
  },
  {
    name: "The Service Account Heist",
    slug: "service-account-heist",
    description: "Targeting overlooked service accounts — from LDAP enumeration through Kerberos tricks to extracting the entire AD database.",
    attacks: ["ldap-reconnaissance", "as-rep-roasting", "gmsa-exploitation", "silver-ticket", "service-account-attacks", "ntds-dit"],
  },
  {
    name: "The Zero-Day Cascade",
    slug: "zero-day-cascade",
    description: "An unpatched Exchange server becomes the entry point for a cascading attack that ends in domain-wide ransomware.",
    attacks: ["hafnium", "powershell-attacks", "plaintext-password-extraction", "pass-the-ticket", "dcshadow", "ransomware"],
  },
  {
    name: "The Physical Vector",
    slug: "physical-vector",
    description: "A physical-proximity attack starts with a wireless keyboard exploit and escalates through network-level vulnerabilities to full domain compromise.",
    attacks: ["mousejacking", "rainbow-table", "zerologon", "golden-ticket", "lateral-movement"],
  },
  {
    name: "The AI-Assisted Breach",
    slug: "ai-breach",
    description: "AI tools are weaponized to craft social engineering attacks, discover injection flaws, and automate lateral movement and malware deployment.",
    attacks: ["chatgpt-prompt-injection", "sql-injection", "lateral-movement", "malware"],
  },
] as const;

export const CHAIN_SLUGS: readonly ChainSlug[] = CHAINS.map((c) => c.slug);

export function getChainBySlug(slug: ChainSlug): Chain | undefined {
  return CHAINS.find((c) => c.slug === slug);
}

export function isValidChainSlug(value: string): value is ChainSlug {
  return (CHAIN_SLUGS as readonly string[]).includes(value);
}

export function getChainsForAttack(attackSlug: AttackSlug): Chain[] {
  return CHAINS.filter((c) => c.attacks.includes(attackSlug));
}
