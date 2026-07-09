import { useEffect, useState } from "react";
import "./index.css";

import logo from "./assets/pantrylink-logo.png";
import pantryPhoto from "./assets/pantry-photo.png";
import communityPhoto from "./assets/community-photo.png";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSce1z4CvQs8dG3d0_rFBdlaI65ad36n1Wr67GjTma2T7GKn4g/viewform?usp=publish-editor";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSce1z4CvQs8dG3d0_rFBdlaI65ad36n1Wr67GjTma2T7GKn4g/viewform?embedded=true";

const SUPPORT_EMAIL = "pantrylinkgeorgia@gmail.com";

const DELETE_ACCOUNT_SUBJECT = "PantryLink Account and Data Deletion Request";

const DELETE_ACCOUNT_BODY =
  "Hello PantryLink team,\n\n" +
  "I am requesting deletion of my PantryLink account and associated data.\n\n" +
  "Name:\n" +
  "Email used for PantryLink:\n" +
  "Organization, if applicable:\n\n" +
  "Thank you.";

const DELETE_ACCOUNT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  DELETE_ACCOUNT_SUBJECT
)}&body=${encodeURIComponent(DELETE_ACCOUNT_BODY)}`;

const DELETE_ACCOUNT_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  SUPPORT_EMAIL
)}&su=${encodeURIComponent(DELETE_ACCOUNT_SUBJECT)}&body=${encodeURIComponent(
  DELETE_ACCOUNT_BODY
)}`;

const navItems = [
  { id: "home", label: "Home" },
  { id: "how", label: "How It Works" },
  { id: "pantries", label: "For Pantries" },
  { id: "pilot", label: "Pilot Program" },
  { id: "contact", label: "Contact" },
];

const footerLegalItems = [
  { id: "privacy", label: "Privacy Policy & Data Deletion" },
];

const allPageIds = [
  "home",
  "how",
  "pantries",
  "pilot",
  "contact",
  "privacy",
];

const workflowSteps = [
  {
    number: "01",
    title: "Pantries share current needs",
    text: "A pantry, food bank, shelter, or community organization can post the items it currently needs most. Instead of relying only on a broad donation list, the organization can communicate specific items, quantities, urgency, and whether the request is temporary or ongoing.",
  },
  {
    number: "02",
    title: "Donors see specific requests",
    text: "Local donors can view clear requests before they shop, collect items, or drop off donations. This helps donors understand what would actually be useful instead of guessing what an organization may need.",
  },
  {
    number: "03",
    title: "Support becomes easier to coordinate",
    text: "When donors claim specific items, pantries get a clearer picture of what may be coming in. The goal is to make incoming support easier to manage while helping donors contribute in a more intentional way.",
  },
];

const pantryBenefits = [
  "Post specific food or supply requests based on current demand",
  "Mark items as urgent, ongoing, claimed, or fulfilled",
  "Help donors understand what would be most useful before they donate",
  "Reduce mismatched donations that are difficult to store or use",
  "Give early feedback that shapes how PantryLink is built",
];

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");

  if (hash === "delete-account" || hash === "data-deletion") {
    return "privacy";
  }

  return allPageIds.includes(hash) ? hash : "home";
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleHashChange() {
      setActivePage(getPageFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const titles = {
    home: "PantryLink | Food Donation Coordination",
    how: "How It Works | PantryLink",
    pantries: "For Pantries | PantryLink",
    pilot: "Pilot Program | PantryLink",
    contact: "Contact | PantryLink",
    privacy: "Privacy Policy & Data Deletion | PantryLink",
  };

    document.title = titles[activePage] || "PantryLink";
  }, [activePage]);

  function goToPage(page) {
    setActivePage(page);
    setMenuOpen(false);

    if (page === "home") {
      window.history.pushState("", document.title, window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = page;
  }

  return (
    <div className="site">
      <Header
        activePage={activePage}
        goToPage={goToPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {activePage === "home" && <HomePage goToPage={goToPage} />}
        {activePage === "how" && <HowItWorksPage goToPage={goToPage} />}
        {activePage === "pantries" && <PantriesPage goToPage={goToPage} />}
        {activePage === "pilot" && <PilotPage goToPage={goToPage} />}
        {activePage === "contact" && <ContactPage />}
        {activePage === "privacy" && <PrivacyPolicyPage goToPage={goToPage} />}
      </main>

      <Footer goToPage={goToPage} />
    </div>
  );
}

function Header({ activePage, goToPage, menuOpen, setMenuOpen }) {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <button type="button" className="brand" onClick={() => goToPage("home")}>
          <img src={logo} alt="PantryLink logo" />
          <span>PantryLink</span>
        </button>

        <button
          type="button"
          className="menuButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "navLinks open" : "navLinks"}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activePage === item.id ? "navItem active" : "navItem"}
              onClick={() => goToPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ goToPage }) {
  return (
    <div className="pageFade">
      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Built for local food support</p>

          <h1>
            Helping pantries share what they <span>actually need.</span>
          </h1>

          <p className="leadText">
            PantryLink is a developing platform that helps food banks, pantries,
            shelters, and community organizations communicate real donation
            needs to local donors. The goal is to make giving more specific,
            more useful, and easier to coordinate.
          </p>

        <div className="heroStatusNote">
          <span>App in development</span>
            <p>
                PantryLink is currently being built. This launch site helps us connect with
                early pantry partners, donors, and community members before the app’s wider
                release.
            </p>
        </div>

          <div className="buttonRow">
            <AnimatedButton onClick={() => goToPage("contact")}>
              Partner with PantryLink
            </AnimatedButton>

            <AnimatedButton variant="secondary" onClick={() => goToPage("how")}>
              See how it works
            </AnimatedButton>
          </div>

          <div className="heroNotes">
            <div>
              <strong>For pantries</strong>
              <p>Post current needs and urgent requests.</p>
            </div>
            <div>
              <strong>For donors</strong>
              <p>Know what to bring before donating.</p>
            </div>
          </div>
        </div>

        <div className="heroVisual">
          <div className="photoCard floating">
            <img src={pantryPhoto} alt="Food pantry shelves and donations" />
          </div>

          <div className="requestPanel floatingTwo">
            <div className="requestHeader">
              <img src={logo} alt="" />
              <div>
                <p>Pantry Need Board</p>
                <strong>Today’s Requests</strong>
              </div>
            </div>

            <RequestItem item="Canned vegetables" note="High priority" />
            <RequestItem item="Rice and pasta" note="Needed this week" />
            <RequestItem item="Peanut butter" note="12 requested" />

            <button type="button" className="panelButton">
              View requests
            </button>
          </div>
        </div>
      </section>

      <section className="section twoColumnSection">
        <div>
          <p className="eyebrow">The problem</p>
          <h2>Donors want to help, but pantry needs change quickly.</h2>
        </div>

        <div>
          <p>
            Many donors are willing to support food banks and pantries, but they
            often only see general donation lists or outdated information. In
            reality, a pantry may have enough of one item while urgently needing
            another.
          </p>
          <p>
            PantryLink is designed to close that communication gap by helping
            organizations publish specific requests that donors can understand
            before they donate.
          </p>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          label="How it works"
          title="A simple request-and-claim workflow."
          text="The platform is built around a practical donation flow. Pantries share what they need, donors see specific requests, and incoming support becomes easier to coordinate."
        />

        <div className="cardGrid">
          {workflowSteps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="section imageSection">
        <div className="imageWrap">
          <img
            src={communityPhoto}
            alt="Community members supporting food donations"
          />
        </div>

        <div>
          <p className="eyebrow">Early pantry partners</p>
          <h2>Built with feedback before a wider launch.</h2>
          <p>
            PantryLink is currently focused on learning from pantries, food
            banks, shelters, and community organizations. Early partners can
            help shape how request posting, donor communication, and donation
            coordination should actually work.
          </p>
          <p>
            The first version is not meant to be complicated. It is meant to
            test whether a clearer request system can help organizations receive
            better-matched donations from people who already want to help.
          </p>

          <div className="buttonRow">
            <AnimatedButton onClick={() => goToPage("pilot")}>
              View pilot program
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function HowItWorksPage({ goToPage }) {
  const workflow = [
    {
      number: "01",
      title: "A pantry posts a specific need",
      text: "Instead of relying on a broad donation list, a pantry can post the exact items it needs right now. A request can include the item name, quantity, urgency level, and any short note that helps donors understand why the item matters.",
      detail: "Example: 24 jars of peanut butter needed before Friday distribution.",
    },
    {
      number: "02",
      title: "Donors see what would actually help",
      text: "Local donors can view current requests before they shop, collect items, or drop off donations. This helps remove the guesswork from donating and gives donors a more practical way to support organizations near them.",
      detail: "Example: Donors can see which items are urgent, open, claimed, or fulfilled.",
    },
    {
      number: "03",
      title: "Donors claim items they can provide",
      text: "When a donor claims a requested item, the pantry gets a clearer signal of what support may be coming in. This simply helps both sides coordinate around specific needs.",
      detail: "Example: A donor claims 6 rice bags and plans to bring them this week.",
    },
    {
      number: "04",
      title: "The pantry updates requests as needs change",
      text: "After donations arrive or inventory changes, the pantry can update the request status. This keeps the information accurate and helps prevent donors from bringing items that are no longer needed.",
      detail: "Example: An urgent request becomes fulfilled once enough items arrive.",
    },
  ];

  return (
    <section className="pageWrap pageFade">
      <section className="howPageHero">
        <div className="howHeroText">
          <p className="eyebrow">How it works</p>
          <h1>A clearer donation process from request to drop-off.</h1>
          <p>
            PantryLink is built around a simple request-and-claim workflow.
            Pantries communicate what they need, donors respond to specific
            requests, and both sides get a clearer process than relying on broad
            donation lists or guesswork.
          </p>

          <div className="buttonRow">
            <AnimatedButton onClick={() => goToPage("contact")}>
              Talk to PantryLink
            </AnimatedButton>
            <AnimatedButton variant="secondary" onClick={() => goToPage("pantries")}>
              For pantries
            </AnimatedButton>
          </div>
        </div>

        <div className="workflowPreviewCard">
          <div className="previewTop">
            <img src={logo} alt="" />
            <div>
              <span>PantryLink workflow</span>
              <strong>Request status</strong>
            </div>
          </div>

          <div className="previewStep active">
            <span>Request</span>
            <p>Pantry posts a need</p>
          </div>

          <div className="previewStep">
            <span>Claim</span>
            <p>Donor chooses an item</p>
          </div>

          <div className="previewStep">
            <span>Update</span>
            <p>Pantry tracks status</p>
          </div>
        </div>
      </section>

      <section className="howIntroSection">
        <div className="howIntroImage">
          <img src={pantryPhoto} alt="Food pantry shelves and donation supplies" />
        </div>

        <div className="howIntroText">
          <p className="eyebrow">The core idea</p>
          <h2>PantryLink supports the pantry’s process instead of replacing it.</h2>
          <p>
            A pantry may already know which items are running low, which
            donations are less useful, and what will be needed before the next
            distribution day. The problem is that donors may not have a reliable
            way to see that information before giving.
          </p>
          <p>
            PantryLink creates a simple bridge between those two sides. It gives
            organizations a way to publish current needs and gives donors a way
            to respond to those needs directly.
          </p>
        </div>
      </section>

      <section className="workflowSection">
        <div className="sectionHeader centeredHeader">
          <p className="eyebrow">Step-by-step workflow</p>
          <h2>Four steps, one clearer donation path.</h2>
          <p>
            The workflow is intentionally simple. Each step is designed to help
            pantries communicate needs clearly without adding a complicated new
            system for staff, volunteers, or donors.
          </p>
        </div>

        <div className="workflowGrid">
          {workflow.map((step) => (
            <article className="workflowCard" key={step.number}>
              <div className="workflowNumber">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="workflowExample">{step.detail}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="experienceSection">
        <div>
          <p className="eyebrow">What each side sees</p>
          <h2>One platform, two simple experiences.</h2>
          <p>
            PantryLink should feel useful for pantries without becoming
            overwhelming, and it should feel clear for donors without requiring
            them to understand the pantry’s full internal process.
          </p>
        </div>

        <div className="experienceGrid">
          <div className="experienceCard">
            <span>Pantry view</span>
            <h3>Post and manage requests</h3>
            <p>
              Pantries can create item requests, add urgency, update quantities,
              and mark requests as claimed or fulfilled as donations come in.
            </p>
          </div>

          <div className="experienceCard orangeCard">
            <span>Donor view</span>
            <h3>Find and claim useful items</h3>
            <p>
              Donors can browse current needs, understand what is most urgent,
              and claim items they are able to provide before dropping them off.
            </p>
          </div>
        </div>
      </section>

      <section className="ctaSection">
        <h2>Want to help test the idea?</h2>
        <p>
          PantryLink is looking for feedback from organizations that understand
          the real challenges of receiving and coordinating donations.
        </p>
        <AnimatedButton onClick={() => goToPage("contact")}>
          Contact PantryLink
        </AnimatedButton>
      </section>
    </section>
  );
}

function PantriesPage({ goToPage }) {
  return (
    <section className="pageWrap pageFade">
      <PageHero
        label="For pantries"
        title="A request tool built around real pantry needs."
        text="PantryLink is being built for food banks, pantries, shelters, and community organizations that need a clearer way to communicate donation needs. The goal is to help organizations share specific requests with local donors without creating a complicated system that adds more work."
      />

      <section className="section imageSection reverseOnDesktop">
        <div>
          <p className="eyebrow">What pantries can do</p>
          <h2>Share specific needs in a format donors can act on.</h2>
          <p>
            PantryLink gives organizations a more direct way to tell donors what
            would be useful before donations arrive. Instead of depending only
            on broad donation categories, pantries can post requests based on
            current inventory, upcoming distribution needs, seasonal demand, or
            items that are running low.
          </p>

          <div className="checkList">
            {pantryBenefits.map((benefit) => (
              <p key={benefit}>{benefit}</p>
            ))}
          </div>

          <AnimatedButton onClick={() => goToPage("contact")}>
            Become an early partner
          </AnimatedButton>
        </div>

        <div className="imageWrap tallImage">
          <img src={pantryPhoto} alt="Food pantry shelves and donations" />
        </div>
      </section>

      <section className="section">
        <SectionHeader
          label="Designed to be realistic"
          title="Support the pantry’s process, not replace it."
          text="The early version is not meant to replace a pantry’s existing workflow or force staff into a complicated dashboard. It is meant to test whether a simple request-posting system can help pantries communicate needs more clearly, reduce mismatched donations, and build stronger connections with local supporters."
        />

        <div className="infoGrid">
          <InfoCard
            title="Low-friction posting"
            text="Requests should be quick to create, easy to update, and clear enough for donors to understand without extra explanation."
          />
          <InfoCard
            title="Local donor visibility"
            text="The platform can help nearby donors see what community organizations actually need before they decide what to bring."
          />
          <InfoCard
            title="Feedback-led development"
            text="Early pantry partners can help decide which features are useful, which ones are unnecessary, and how simple the platform should stay."
          />
        </div>
      </section>
    </section>
  );
}

function PilotPage({ goToPage }) {
  return (
    <section className="pageWrap pageFade">
      <PageHero
        label="Pilot program"
        title="Looking for early organizations to help shape PantryLink."
        text="Before a full launch, PantryLink needs feedback from food banks, pantries, shelters, and community organizations that understand how donation coordination works in real life."
      />

      <section className="section imageSection">
        <div className="imageWrap">
          <img src={communityPhoto} alt="Community volunteers supporting donations" />
        </div>

        <div>
          <p className="eyebrow">Early testing</p>
          <h2>The pilot is about learning what actually works.</h2>
          <p>
            The goal of the pilot is not to immediately create a perfect system.
            It is to understand how pantries would use a donation request tool,
            what information donors need, and how the platform can stay simple
            enough to be useful.
          </p>

          <div className="numberList">
            <div>
              <strong>1</strong>
              <p>Collect feedback from pantry staff, volunteers, and organizers.</p>
            </div>
            <div>
              <strong>2</strong>
              <p>Test how request posting should work in practice.</p>
            </div>
            <div>
              <strong>3</strong>
              <p>Refine the platform before expanding to more users.</p>
            </div>
          </div>

          <AnimatedButton onClick={() => goToPage("contact")}>
            Join the pilot conversation
          </AnimatedButton>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          label="Who this is for"
          title="PantryLink is looking for practical, honest feedback."
          text="The best early partners are organizations that can explain what donation coordination looks like day to day: what donors get right, what they miss, and what would make incoming support easier to manage."
        />

        <div className="infoGrid">
          <InfoCard
            title="Food banks"
            text="Organizations managing larger donation flows, recurring community needs, or multiple distribution programs."
          />
          <InfoCard
            title="Local pantries"
            text="Smaller organizations that need a clearer way to communicate specific item requests to nearby supporters."
          />
          <InfoCard
            title="Community groups"
            text="Groups supporting outreach, donation drives, school service projects, or volunteer-based food assistance."
          />
        </div>
      </section>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="pageWrap pageFade">
      <PageHero
        label="Contact"
        title="Interested in PantryLink?"
        text="Use this page for early partner interest, pilot feedback, community outreach, or general questions about the project."
      />

      <section className="contactSection updatedContactSection">
        <div>
          <p className="eyebrow">Get involved</p>
          <h2>Help shape the platform before launch.</h2>
          <p>
            PantryLink is focused on learning from organizations that understand
            food donation needs firsthand. If you represent a pantry, food bank,
            shelter, school club, nonprofit, or community group, this is the
            best place to start.
          </p>

          <div className="buttonRow">
            <ExternalButton href={FORM_URL}>Open interest form</ExternalButton>
          </div>
          <div className="contactCards">
            <div>
              <strong>Pantries</strong>
              <p>Share what features would actually help your workflow.</p>
            </div>
            <div>
              <strong>Community partners</strong>
              <p>Discuss outreach, donation drives, or local support.</p>
            </div>
          </div>
        </div>

        <div className="formEmbedCard">
          <div className="formEmbedHeader">
            <span>PantryLink interest form</span>
            <p>
              Fill out the form below, or open it in a new tab if the embedded
              form does not load correctly.
            </p>
          </div>

          <iframe
            title="PantryLink interest form"
            src={FORM_EMBED_URL}
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </section>
  );
}

function PrivacyPolicyPage() {
  return (
    <section className="pageWrap pageFade">
      <PageHero
        label="Privacy policy & data deletion"
        title="Privacy Policy and Data Deletion for PantryLink."
        text="This page explains what information PantryLink may collect, how that information may be used, and how users can request deletion of their account and associated data."
      />

      <section className="legalPage">
        <p className="legalUpdated">Last updated: June 22, 2026</p>

        <LegalSection title="1. Overview">
          <p>
            PantryLink is designed to help food pantries, food banks, community
            organizations, and donors communicate donation needs more clearly.
            This Privacy Policy explains how PantryLink collects, uses, and
            protects information submitted through the PantryLink app, website,
            contact forms, and related services.
          </p>
        </LegalSection>

        <LegalSection title="2. Information we may collect">
          <p>Depending on how you use PantryLink, we may collect:</p>
          <ul>
            <li>Name, email address, and account login information.</li>
            <li>Organization name, pantry location, role, and contact details.</li>
            <li>
              Donation requests, item names, quantities, urgency labels, and
              request status.
            </li>
            <li>
              Donor activity, such as claimed items or submitted interest forms.
            </li>
            <li>
              Messages or information submitted through Google Forms or contact
              pages.
            </li>
            <li>
              Basic technical information such as device, browser, and usage
              data used to improve reliability and security.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. How we use information">
          <p>PantryLink may use collected information to:</p>
          <ul>
            <li>Create and manage user accounts.</li>
            <li>Help pantries publish and update donation needs.</li>
            <li>Help donors view, claim, or respond to posted requests.</li>
            <li>Contact interested pantries, donors, and community partners.</li>
            <li>
              Improve the safety, reliability, and usefulness of the platform.
            </li>
            <li>
              Respond to support, privacy, and account deletion requests.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Sharing of information">
          <p>
            PantryLink does not sell user personal information. Information may
            be shared only when needed to operate the service, communicate
            donation needs, comply with legal obligations, prevent misuse, or
            work with service providers that help host, process, or maintain the
            platform.
          </p>
        </LegalSection>

        <LegalSection title="5. Third-party services">
          <p>
            PantryLink may use third-party services such as hosting providers,
            databases, authentication tools, analytics tools, email tools, and
            Google Forms. These services may process information according to
            their own privacy and security practices.
          </p>
        </LegalSection>

        <LegalSection title="6. Data retention">
          <p>
            PantryLink keeps information only as long as reasonably needed to
            operate the service, support users, maintain records, prevent misuse,
            or meet legal and safety obligations. Some information may be
            retained for legitimate reasons such as security, fraud prevention,
            backup recovery, or compliance.
          </p>
        </LegalSection>

        <LegalSection title="7. Account and data deletion">
  <p>
    Users may request deletion of their PantryLink account and associated
    data by contacting the PantryLink team. To help identify the correct
    information, the request should include the user’s full name, the email
    address used for PantryLink, and the organization name if the account is
    connected to a pantry or community group.
  </p>

  <p>
    Depending on the account type and usage, deletion may include account
    profile information, pantry or organization details, donation requests,
    claim history, and related account activity.
  </p>

  <p>
    PantryLink may retain limited information when necessary for legitimate
    purposes such as security, fraud prevention, legal compliance, dispute
    resolution, backup recovery, or protection of the service and its users.
  </p>

  <div className="deletionActionBox">
  <a
    className="animatedButton primary linkButton"
    href={DELETE_ACCOUNT_GMAIL_URL}
    target="_blank"
    rel="noreferrer"
  >
    <span>Open Gmail deletion request</span>
    <span className="buttonArrow">→</span>
  </a>

  <a className="deletionBackupLink" href={DELETE_ACCOUNT_MAILTO}>
    Use default email app instead
  </a>

  <p className="deletionFallbackText">
    If the button does not open correctly, email{" "}
    <strong>{SUPPORT_EMAIL}</strong> with the subject line{" "}
    <strong>{DELETE_ACCOUNT_SUBJECT}</strong>.
  </p>
</div>
</LegalSection>

        <LegalSection title="8. Contact">
          <p>
            For privacy questions, account deletion requests, or data-related
            concerns, contact PantryLink at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </LegalSection>
      </section>
    </section>
  );
}


function PageHero({ label, title, text }) {
  return (
    <section className="pageHero">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function SectionHeader({ label, title, text }) {
  return (
    <div className="sectionHeader">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <article className="stepCard">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="infoCard">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function RequestItem({ item, note }) {
  return (
    <div className="requestItem">
      <div>
        <strong>{item}</strong>
        <p>{note}</p>
      </div>
      <span />
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <article className="legalSection">
      <h2>{title}</h2>
      {children}
    </article>
  );
}

function AnimatedButton({ children, onClick, variant = "primary" }) {
  return (
    <button
      type="button"
      className={`animatedButton ${variant}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="buttonArrow">→</span>
    </button>
  );
}

function ExternalButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="animatedButton primary linkButton"
    >
      <span>{children}</span>
      <span className="buttonArrow">→</span>
    </a>
  );
}

function Footer({ goToPage }) {
  return (
    <footer className="footer">
      <div>
        <button
          type="button"
          className="footerBrand"
          onClick={() => goToPage("home")}
        >
          <img src={logo} alt="PantryLink logo" />
          <span>PantryLink</span>
        </button>
        <p>
          Helping local food support organizations communicate specific donation
          needs more clearly.
        </p>
      </div>

      <div className="footerNavGroup">
        <div className="footerLinks">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goToPage(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="footerLinks legalFooterLinks">
          {footerLegalItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goToPage(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default App;