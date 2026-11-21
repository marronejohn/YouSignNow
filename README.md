<p align="center">
  <img src="docs/images/banner.png" alt="YouSignNow: e-signatures you actually own. Open source and MIT licensed. Send, sign and seal documents from your own Vercel account, at $0 per seat. Shown: a signer drawing a signature on a consulting agreement, and both signers marked Signed.">
</p>

<p align="center">
  An e-signature app for your own organization, on your own Vercel account.<br>
  Upload a PDF, place fields, send signing links, and keep the sealed, signed copy with its audit certificate.
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmarronejohn%2FYouSignNow&project-name=yousignnow&repository-name=yousignnow&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22resend%22%2C%22productSlug%22%3A%22resend-email%22%2C%22protocol%22%3A%22messaging%22%7D%2C%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22neon%22%2C%22productSlug%22%3A%22neon%22%2C%22protocol%22%3A%22storage%22%7D%2C%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22private%22%7D%5D&demo-title=YouSignNow&demo-description=Your%20own%20e-signature%20site.%20Upload%20a%20PDF%2C%20place%20fields%2C%20send%20signing%20links%2C%20and%20keep%20the%20signed%20copy%20with%20its%20audit%20certificate.&demo-url=https%3A%2F%2Fgithub.com%2Fmarronejohn%2FYouSignNow&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fmarronejohn%2FYouSignNow%2Fmain%2Fdocs%2Fimages%2Fbanner.png"><img src="docs/images/deploy-to-vercel.svg" alt="Deploy to Vercel" height="32"></a><br>
  <sub>or <a href="docs/deploy-with-an-agent.md">copy this to your LLM</a></sub>
</p>

<p align="center">
  <a href="#everything-it-takes-to-get-a-document-signed">Features</a> ·
  <a href="#what-it-costs">What it costs</a> ·
  <a href="#get-started">Get started</a> ·
  <a href="docs/self-hosting.md">Self-hosting guide</a>
</p>

## Why YouSignNow

**No seats to pay for.** YouSignNow is open source, and the Deploy button sets it up on free plans from Vercel, Neon and Resend, which carry about 250 documents a month for $0. YouSignNow costs the same whether one person sends or fifty.

**No envelope allowance to watch.** YouSignNow has no limit of its own. What you can send depends on your hosting plans, and the free ones carry about 250 documents a month.

**Your documents stay in your accounts.** PDFs live in a private Vercel Blob store and everything else in a Neon Postgres database, both in your name and in the region you choose. Nobody else hosts your agreements, and the code is yours to read, change and run.

**Evidence anyone can check.** Every finished PDF and its audit certificate carry a PAdES seal that PDF readers check for changes, the audit trail is hash-chained so an edited or deleted row shows, and anyone holding a copy can check it on the install's public Verify page.

**One click, nothing to look after.** The Deploy button creates the database, the file store and email for you, on free plans. There are no servers to patch, and every push to your copy deploys again.

## Everything it takes to get a document signed

<p align="center">
  <img src="docs/images/how-it-works.png" alt="How it works. 1: upload a PDF and place the fields. 2: signers open a link from their email and type or draw a signature, on any device. 3: everyone gets the sealed PDF and its audit certificate.">
</p>

### Prepare a document in minutes

Upload a PDF, add up to 25 signers in the order they sign, or have some of them sign at the same time, and add people who only receive the finished copy. Then place fields where they belong: signature, initials, date, name, text, number, checkbox, dropdown and radio buttons, each required or optional and each tied to one signer.

![Placing signature, date and dropdown fields for two signers on a master services agreement](docs/images/prepare.png)

<p align="center">
  <sub>The organization, people and documents in these screenshots are made up.</sub>
</p>

### Signing without an account

Each signer gets a link by email, agrees to use electronic records, and signs with a typed or drawn signature on any phone, tablet or computer. Fields from earlier signers stay visible and locked. Signers can download the document before they sign, or decline with a reason, and the sender is told.

![Jordan Lee signing a consulting agreement with a drawn signature, with the earlier signer's signature locked](docs/images/signing.png)

### Know who is signing

For documents that need more than an email link, ask a signer for an access code you give them yourself, or have YouSignNow email a one-time code when they open the link. The audit certificate records how each signer was checked, with their IP address and browser.

### Follow every envelope

The dashboard shows each document as a card with its first page, its status (draft, sent, completed, declined, voided or expired) and who it waits on, with search and a status filter. Each envelope has its own signing deadline, from 3 to 90 days, which you can change while it is out, and automatic reminders every 1, 2, 3 or 7 days, on top of the reminder you can send by hand.

![The dashboard: six documents as cards, with drafts, a sent offer letter, an NDA one of two signed, and completed agreements](docs/images/dashboard.png)

![A sent NDA: its deadline, reminders and Save as template, the two signers, and the timeline](docs/images/envelope.png)

### Templates for the documents you send every week

Open any envelope and choose Save as template. The template keeps the document, the fields and the signing order, with roles instead of names. Using it asks who signs this time and opens a draft ready to send.

### Sealed, certified, and checkable by anyone

When the last signer finishes, YouSignNow builds the signed PDF and an audit certificate, seals both, and emails them to every signer and copy recipient. Names and text in Latin, Greek, Cyrillic, Chinese, Japanese and Korean scripts are drawn correctly. Anyone can drop a copy on the Verify page to see whether it is exactly the file the site produced; the file never leaves their device, only its fingerprint does.

![The Verify page confirming that a signed contractor agreement is unchanged](docs/images/verify.png)

### Your name, logo and color

Signers see your organization, not YouSignNow. Give the install your name, logo and brand color, and they appear on the site, the signing pages and every email. Serve it at your own domain and link your own terms and privacy policy.

![The same signing page in the organization's own green, with its logo](docs/images/branding.png)

### Run by your administrators

The first account is the administrator, and you can make more. Choose who may create an account: people at your email domains, nobody, or anyone. People who only sign never need one. Set how long finished documents are kept, and answer a signer who asks for their data with a built-in export or erasure tool.

### On your phone

YouSignNow works on small screens as well as large ones: check on your documents from your phone, and signers sign from theirs.

<p align="center">
  <img src="docs/images/phone.png" width="300" alt="The dashboard on a phone">
</p>

## What it costs

YouSignNow is free, and the Deploy button puts it on free plans from Vercel, Neon and Resend. Those plans carry about **250 documents a month**, however many people send them, before anything costs money. That is the first row below, and the rows after it are what you pay once you pass it.

| Documents sent in a year                                       | What YouSignNow costs                         |
| -------------------------------------------------------------- | --------------------------------------------- |
| **3,000**: 250 a month, the most the free plans carry          | **$0**                                        |
| **5,000**                                                      | $240, for Vercel Pro                          |
| **7,200**: 600 a month, the most Resend's free plan will email | $240                                          |
| **More than that**                                             | $480, for Vercel Pro and Resend Pro, plus use |

### Where the $0 limit comes from

Each free plan has its own monthly allowance, and the smallest one sets the limit:

|                                                                                    | The free plan allows                        | Which carries                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Files**, on [Vercel Blob](https://vercel.com/docs/vercel-blob/usage-and-pricing) | 2,000 uploads, 10,000 reads and 1 GB stored | **About 250 documents a month.** A two-signer document takes 7 to 9 uploads, from the first PDF to the sealed copy and its certificates, and about 20 reads. 1 GB keeps over 1,000 finished documents of a few pages each. |
| **Email**, on [Resend](https://resend.com/pricing)                                 | 3,000 emails, and no more than 100 a day    | 600 two-signer documents a month, and 20 in one day. Each takes five emails: two invitations and three finished copies. Reminders and one-time codes are emails too.                                                       |
| **Database**, on [Neon](https://neon.com/faqs/free-plan-limits-and-quotas)         | 1 GB and 100 compute hours                  | About 400 hours a month with the database awake. It sleeps when nobody is using the site.                                                                                                                                  |
| **Hosting**, on Vercel Hobby                                                       | More than the rows above will use           | Any number of people. Vercel [limits Hobby to personal, non-commercial use](https://vercel.com/docs/limits/fair-use-guidelines).                                                                                           |

None of these plans bills you for going over. It stops instead: files cannot be read, email is not sent, or the database pauses. The monthly allowances come back when the month turns over. The two 1 GB limits do not, because stored files and database rows stay until they are deleted: make room by deleting old documents, or by setting how long finished documents are kept under Settings, Organization. Better still, move up before you reach a limit, not after.

### Past the free plans

- **Vercel Pro is $20 a month** for the one person who deploys, whatever the size of the team. The people who send and sign need no Vercel seat. It lifts the file limits: Blob is then paid from the plan's $20 monthly credit, at $0.023 per GB a month. A company belongs on [Pro](https://vercel.com/docs/plans/pro-plan) from the start, because of Vercel's rule for Hobby.
- **Resend Pro is $20 a month** for 50,000 emails, with no daily limit.
- **Neon's Launch plan** charges for what the database uses, with no monthly minimum.
- **Your own domain**, if you want one, costs whatever your registrar charges. Vercel Pro includes one free for the first year.

The document counts are estimates for two signers and PDFs of a few pages; more signers, longer documents and reminders use more. Prices and free plans change, so check them before you quote these.

## Get started

### Deploy to Vercel

1. **Click Deploy to Vercel** above, and sign in to Vercel. It copies YouSignNow into your GitHub account and builds your site from that copy.
2. **Add the three things Vercel offers to create**, each on a free plan: [Resend](https://resend.com) for email, a [Neon](https://neon.com) Postgres database, and a private [Vercel Blob](https://vercel.com/docs/vercel-blob) store.
3. **Click Deploy.** The build creates the database tables by itself. If Vercel stops with "One or more integration resources failed to provision", nothing is wrong with your copy: Resend was still checking its domain. Wait a minute or two, refresh the page, and click **Redeploy**. See [If the first deployment fails](docs/self-hosting.md#if-the-first-deployment-fails).
4. **Open your new site.** Name your organization, give the email address people should write to for help, and create the first account, which is the administrator.
5. **Set up the address you send from.** Under Settings, Organization, enter an address at your own domain. The site lists the DNS records to add and checks them for you.

**Taking new versions.** Settings, YouSignNow, **Check for updates** tells you when a new release is out and what is in it. A workflow that comes with your copy then opens a pull request with the release in your GitHub repository; merge it and Vercel deploys the update. See [Keep your install up to date](docs/self-hosting.md#keep-your-install-up-to-date).

**Deploying with an AI agent.** An agent that can use your browser can do all of this for you. Point it at [docs/deploy-with-an-agent.md](docs/deploy-with-an-agent.md), which lists every screen, what to choose, what to ask you, and how to retry.

There is nothing to type in Vercel and no terminal to open. Until step 5 is done, email reaches only the address on your Resend account, so you can try the whole product straight away by sending a document to yourself. The [self-hosting guide](docs/self-hosting.md) covers your own domain, locking down a new install, keeping it up to date, running in the EU, and every optional setting.

### Try it on your computer

With Node.js 24 and Docker:

```bash
npm install
cp .env.example .env
npm run db:start   # Postgres in Docker, with the schema applied
npm run dev        # YouSignNow at http://localhost:3000
```

Files stay on disk and emails are written to `.data/outbox` instead of being sent, so you need no outside account. [Development](docs/development.md) says more.

## Built on Vercel

- **Vercel-native from end to end.** Next.js 16 on Vercel Functions, Neon Postgres and Resend from the Vercel Marketplace, private Vercel Blob storage with direct browser uploads, a daily Vercel cron job for reminders and cleanup, and optional [Vercel BotID](https://vercel.com/docs/botid).
- **Secure by default.** Private file storage with no public URLs, a strict Content Security Policy, rate limits kept in Postgres, signing links that are hashed at rest, and a setup page that only the first visitor, or the holder of a `SETUP_TOKEN`, can use.
- **Tested.** Unit tests, database tests against a real Postgres, and a browser test that sets up a fresh install, sends a document and signs it, run on every pull request.

## Using YouSignNow for real agreements

YouSignNow is not a law firm and does not give legal advice, and nothing here is a promise that a signature made with it will be accepted for a given purpose. It gives you the features that electronic signature laws such as the US ESIGN Act and UETA and the EU's eIDAS regulation look for in a simple electronic signature: each signer's consent to electronic records, a record of who signed, when and how, optional identity checks, and a sealed copy that shows any change. Whether that is enough for a particular document depends on the document, where you and the signers are, and how you use it. Ask a lawyer when it matters.

Every install has a page at `/electronic-signatures` that says what it is for, and senders confirm it before each send. It is meant for ordinary business agreements, such as contracts, NDAs, statements of work, offer letters, purchase orders and approvals. It is **not** built for:

- documents that need an advanced or qualified electronic signature (AdES or QES) under eIDAS, unless you add a signing provider (see below);
- protected health information under HIPAA;
- documents that many laws keep out of electronic signature, such as wills, family-law matters, court orders, notices of foreclosure, eviction, utility shut-off or insurance cancellation, and in most EU countries real estate transfers and documents that need a notary.

For **advanced or qualified electronic signatures** under eIDAS, connect a signing provider: [eID Easy](https://eideasy.com), or a trust service provider's remote signing service that speaks the CSC API v2. A sender can then choose that signature type for an envelope, and each signer proves who they are at the provider and signs with a certificate in their own name. Every signature goes into the PDF in a revision of its own, so all of them stay valid, and the finished PDF gets long-term validation. The provider is a paid service outside Vercel, so it is optional, and the flow has been tested against stand-ins for both interfaces but not yet against the live services. [Signatures in the signers' own names](docs/self-hosting.md#signatures-in-the-signers-own-names-eidas-ades-and-qes) has the setup.

For FDA 21 CFR Part 11 records, an administrator can turn on **Part 11 mode** under Settings. Signers then sign with their own accounts, whose identity an administrator has confirmed, give their password again at each signature, and see the meaning of their signature (approval, review, responsibility or authorship) printed beside it with their name and the time. Audit trails export as CSV, and finished records are never deleted on a timer. That covers the software's part only: validating your install, writing and following your own procedures, training your people and certifying your electronic signatures to the FDA stay with your organization. The [Part 11 validation pack](docs/part11/README.md) gives you starting documents for that: requirements, a traceability matrix, a risk assessment, qualification scripts, SOP templates and the FDA letter.

Your install carries your organization's name, and your organization is responsible for how it is used: linking your own terms and privacy policy, keeping the support address pointed at a mailbox someone reads, choosing how long documents are kept, and answering signers' data requests. [Your responsibilities](docs/self-hosting.md#your-responsibilities) has the details.

## Learn more

- [Self-hosting guide](docs/self-hosting.md): deploying, first-run setup, what it costs, your own domain, updates, the EU, the seal, cleanup, rate limits, bot protection and every optional setting.
- [Development](docs/development.md): running YouSignNow locally, storage, the database, email, tests and the code's layout.
- [Contributing](CONTRIBUTING.md) and [Security](SECURITY.md).

## License and credits

YouSignNow is [MIT licensed](LICENSE). Copyright © 2026 Nyllon Software. It redistributes third-party assets, including bundled fonts and PDF.js, under their own licenses: see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The project has no email address of its own. Report a security problem privately through GitHub, as [SECURITY.md](SECURITY.md) describes. For help with one particular site that runs YouSignNow, write to the organization that runs it.

## Legal disclaimer

The cost figures are estimates for illustration, not quotes. What you pay depends on your own use and on the prices of the services your install runs on.

YouSignNow is provided "as is", without warranty of any kind, as the [MIT License](LICENSE) sets out. Nothing in this repository is legal advice. Whether an electronic signature is valid or enforceable for a particular document depends on the law that applies to it; ask a qualified lawyer.
