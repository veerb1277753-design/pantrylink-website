import { useState } from "react";
import "./index.css";

import logo from "./assets/pantrylink-logo.png";
import pantryPhoto from "./assets/pantry-photo.png";
import communityPhoto from "./assets/community-photo.png";

const navItems = [
  { id: "home", label: "Home" },
  { id: "how", label: "How It Works" },
  { id: "pantries", label: "For Pantries" },
  { id: "pilot", label: "Pilot Program" },
  { id: "contact", label: "Contact" },
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

function App() {
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  function goToPage(page) {
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <h2>Donors want to help, but pantries’ needs change quickly.</h2>
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
          <img src={communityPhoto} alt="Community members supporting food donations" />
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
      text: "When a donor claims a requested item, the pantry gets a clearer signal of what support may be coming in. This does not need to be complicated; it simply helps both sides coordinate around specific needs.",
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
            requests, and both sides get a clearer process than relying on
            broad donation lists or guesswork.
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
  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSezzmkpouSjRnPgbkaaBsz306BPCw5RtSL4DnCMoUOe-paqew/viewform?embedded=true";

  return (
    <section className="pageWrap pageFade">
      <PageHero
        label="Contact"
        title="Interested in PantryLink?"
        text="Use this page for early partner interest, pilot feedback, community outreach, or general questions about the project."
      />

      <section className="contactSection contactSectionWithForm">
        <div className="contactCopy">
          <p className="eyebrow">Get involved</p>

          <h2>Help shape PantryLink before launch.</h2>

          <p>
            PantryLink is currently focused on learning from organizations that
            understand food donation needs firsthand. If you represent a pantry,
            food bank, shelter, school club, nonprofit, or community group, this
            form is the best place to start.
          </p>

          <p>
            The goal is to connect with early partners, gather practical
            feedback, and understand what features would actually help pantries
            communicate donation needs more clearly.
          </p>

          <div className="contactCards">
            <div>
              <strong>Pantries and food banks</strong>
              <p>
                Share what donation coordination looks like for your
                organization.
              </p>
            </div>

            <div>
              <strong>Community partners</strong>
              <p>
                Reach out about outreach, donation drives, volunteering, or
                pilot feedback.
              </p>
            </div>
          </div>
        </div>

        <div
          className="embeddedFormPanel"
          style={{
            width: "100%",
            height: "1120px",
            minHeight: "1120px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className="embeddedFormHeader">
            <span>PantryLink interest form</span>
            <p>Submit your response through the Google Form below.</p>
          </div>

          <iframe
            className="embeddedGoogleForm"
            src={googleFormUrl}
            title="PantryLink interest form"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              flex: "1 1 auto",
              border: "0",
              display: "block",
              background: "white",
            }}
          >
            Loading…
          </iframe>
        </div>
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

      <div className="footerLinks">
        {navItems.map((item) => (
          <button key={item.id} type="button" onClick={() => goToPage(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
    </footer>
  );
}

export default App;