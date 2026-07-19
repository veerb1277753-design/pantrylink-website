import { useEffect, useState } from "react";

import logo from "./assets/pantrylink-logo.png";
import dashboardShot from "./assets/app-dashboard.png";
import mapShot from "./assets/app-map-finder.png";
import needsShot from "./assets/app-needs.png";
import claimsShot from "./assets/app-my-claims.png";
import profileShot from "./assets/app-account-profile.png";
import settingsShot from "./assets/app-account-settings.png";
import signInShot from "./assets/app-sign-in.png";

const APP_STORE_URL = "https://apps.apple.com/us/app/pantrylink-ga/id6789333323";
const CONTACT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSce1z4CvQs8dG3d0_rFBdlaI65ad36n1Wr67GjTma2T7GKn4g/viewform?embedded=true";
const SUPPORT_EMAIL = "pantrylinkgeorgia@gmail.com";

const navItems = [
  ["home", "Home"],
  ["how-it-works", "How It Works"],
  ["for-pantries", "For Pantries"],
  ["contact", "Contact"],
];

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>,
    box: <><path d="m21 8-9 5-9-5 9-5 9 5Z"/><path d="m3 8 9 5 9-5M3 8v8l9 5 9-5V8M12 13v8"/></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    apple: <path fill="currentColor" stroke="none" d="M16.7 12.8c0-2.8 2.3-4.2 2.4-4.3-1.3-1.9-3.4-2.2-4.1-2.2-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.8-1-1.9 0-3.7 1.1-4.7 2.8-2 3.5-.5 8.7 1.4 11.5.9 1.4 2.1 3 3.6 2.9 1.4-.1 2-1 3.8-1s2.3 1 3.8 1c1.6 0 2.6-1.4 3.5-2.8 1.1-1.6 1.5-3.1 1.5-3.2-.1 0-3.1-1.2-3.1-4.7Zm-2.8-8.3c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.6 1.8-.8.9-1.4 2.3-1.2 3.7 1.4.1 2.8-.7 3.6-1.7Z"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function AppStoreButton({ compact = false, light = false }) {
  return (
    <a className={`store-button ${compact ? "compact" : ""} ${light ? "light" : ""}`} href={APP_STORE_URL} target="_blank" rel="noreferrer">
      <Icon name="apple" />
      <span><small>Download on the</small><strong>App Store</strong></span>
    </a>
  );
}

function Header({ page, navigate }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { setOpen(false); navigate(id); };
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <button className="brand" onClick={() => go("home")}>
          <img src={logo} alt="PantryLink logo" />
          <span>PantryLink <b>GA</b></span>
        </button>
        <button className={`menu-button ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation"><i/><i/><i/></button>
        <nav className={open ? "open" : ""}>
          {navItems.map(([id, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
          <AppStoreButton compact />
        </nav>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="PantryLink logo" />
          <div><strong>PantryLink GA</strong><p>Helping Georgia communities give more intentionally.</p></div>
        </div>
        <div className="footer-nav">
          {navItems.map(([id, label]) => <button key={id} onClick={() => navigate(id)}>{label}</button>)}
          <button onClick={() => navigate("privacy")}>Privacy & Data Deletion</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} PantryLink GA</span>
        <div className="veer-credit"><span className="vb-mark">VB</span><span>Website built by <strong>Veer Bharat</strong></span></div>
      </div>
    </footer>
  );
}

function HomePage({ navigate }) {
  return <main>
    <section className="home-hero">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="live-pill"><span/> Now live on the iOS App Store</div>
          <h1>Give what your community <em>actually needs.</em></h1>
          <p>PantryLink GA helps people find current requests from nearby food pantries, commit to a donation, and follow through—all in one clear place.</p>
          <div className="hero-actions"><AppStoreButton/><button className="secondary-button" onClick={() => navigate("for-pantries")}>Register your pantry <Icon name="arrow"/></button></div>
          <div className="hero-proof"><span><Icon name="check"/> Free to use</span><span><Icon name="check"/> Built for Georgia</span><span><Icon name="check"/> Live now</span></div>
        </div>
        <div className="hero-showcase">
          <div className="logo-medallion"><img src={logo} alt="PantryLink logo"/></div>
          <img className="phone phone-map" src={mapShot} alt="PantryLink map finder"/>
          <img className="phone phone-main" src={dashboardShot} alt="PantryLink dashboard"/>
          <div className="floating-card card-needs"><Icon name="box"/><div><b>Specific needs</b><span>See exact items and quantities</span></div></div>
          <div className="floating-card card-local"><Icon name="map"/><div><b>Local impact</b><span>Find pantries near you</span></div></div>
        </div>
      </div>
    </section>

    <section className="impact-strip">
      <div className="shell impact-grid">
        <div><strong>One app</strong><span>for local pantry needs</span></div>
        <div><strong>Clear requests</strong><span>with quantities and deadlines</span></div>
        <div><strong>Real commitments</strong><span>tracked from claim to drop-off</span></div>
      </div>
    </section>

    <section className="story-section shell">
      <div className="story-copy"><span className="kicker">Why PantryLink</span><h2>Donating should not require guessing.</h2><p>Food pantries often receive generous donations, but not always the items they need most at that moment. PantryLink gives organizations a direct way to share current needs and gives donors a simple way to respond.</p><button className="text-button" onClick={() => navigate("how-it-works")}>See how it works <Icon name="arrow"/></button></div>
      <div className="story-visual">
        <div className="story-logo"><img src={logo} alt="PantryLink logo"/><strong>Helping pantries share what they need most.</strong></div>
        <div className="story-card orange"><Icon name="heart"/><b>More useful donations</b><span>People can give based on a real, current request.</span></div>
        <div className="story-card green"><Icon name="people"/><b>Stronger local connection</b><span>Neighbors can see where their support is needed nearby.</span></div>
      </div>
    </section>

    <section className="process-section">
      <div className="shell"><div className="section-heading centered"><span className="kicker light">Simple from start to finish</span><h2>From nearby need to completed donation.</h2><p>Three clear steps keep the process focused and visible.</p></div>
      <div className="process-grid">
        <article className="process-card coral"><span>01</span><div className="process-icon"><Icon name="map"/></div><h3>Discover</h3><p>Find participating pantries and urgent requests near you.</p></article>
        <article className="process-card mint"><span>02</span><div className="process-icon"><Icon name="box"/></div><h3>Choose</h3><p>Review the exact item, quantity, location, and deadline.</p></article>
        <article className="process-card gold"><span>03</span><div className="process-icon"><Icon name="check"/></div><h3>Fulfill</h3><p>Claim what you can bring, deliver it, and mark it complete.</p></article>
      </div></div>
    </section>

    <section className="screens-section">
      <div className="shell"><div className="section-heading split"><div><span className="kicker">Inside the app</span><h2>Everything you need to help, in one place.</h2></div><p>Browse needs, find pantries, manage commitments, and personalize how you give through a clean mobile experience.</p></div>
        <div className="screen-feature">
          <div className="screen-copy"><span className="screen-number">01</span><h3>See urgent needs as soon as you open the app.</h3><p>The dashboard highlights current requests nearby, including what is needed, how much remains, and when the pantry needs it.</p><ul><li><Icon name="check"/> Current quantities</li><li><Icon name="check"/> Clear deadlines</li><li><Icon name="check"/> Nearby locations</li></ul></div>
          <div className="screen-art green-art"><img src={dashboardShot} alt="PantryLink dashboard"/></div>
        </div>
        <div className="screen-feature reverse">
          <div className="screen-copy"><span className="screen-number">02</span><h3>Find participating pantries on a map.</h3><p>Map Finder makes it easier to discover local organizations and understand where your support can have an immediate impact.</p><ul><li><Icon name="check"/> Location-based discovery</li><li><Icon name="check"/> Participating pantry markers</li><li><Icon name="check"/> Simple navigation</li></ul></div>
          <div className="screen-art orange-art"><img src={mapShot} alt="PantryLink map finder"/></div>
        </div>
        <div className="mini-screens">
          {[ [needsShot,"Browse exact requests"], [claimsShot,"Track your commitments"], [profileShot,"Set donation preferences"] ].map(([src,title]) => <article key={title}><div><img src={src} alt={title}/></div><h3>{title}</h3></article>)}
        </div>
      </div>
    </section>

    <section className="pantry-cta">
      <div className="shell pantry-cta-grid">
        <div className="cta-logo"><img src={logo} alt="PantryLink logo"/></div>
        <div><span className="kicker light">For food pantries</span><h2>Share what your organization needs right now.</h2><p>Join PantryLink GA, post current requests, and make it easier for supporters to respond with the items that are actually useful.</p><button className="cream-button" onClick={() => navigate("for-pantries")}>Learn about joining <Icon name="arrow"/></button></div>
      </div>
    </section>

    <section className="download-section shell">
      <div className="download-card"><div><span className="kicker">Available now</span><h2>Start helping through PantryLink GA.</h2><p>Download the app today and explore current pantry needs in your community.</p><AppStoreButton/></div><div className="download-phones"><img src={needsShot} alt="PantryLink needs screen"/><img src={signInShot} alt="PantryLink sign in screen"/></div></div>
    </section>
  </main>;
}

function HowItWorksPage({ navigate }) {
  const steps = [
    ["01","Create your account",signInShot,"Sign up, add your location, and choose how you prefer to help."],
    ["02","Explore nearby needs",mapShot,"Use the dashboard, Needs page, or Map Finder to see active requests."],
    ["03","Commit to an amount",needsShot,"Claim the quantity you can provide so the pantry and other donors can see the remaining need."],
    ["04","Complete the drop-off",claimsShot,"Deliver the donation and mark it dropped off once it reaches the organization."],
  ];
  return <main>
    <section className="page-hero how-hero"><div className="shell page-hero-grid"><div><span className="kicker light">How it works</span><h1>A clearer path from good intention to real impact.</h1><p>PantryLink keeps each step simple, from discovering a local need to confirming a completed donation.</p><AppStoreButton light/></div><div className="page-hero-phone"><img src={needsShot} alt="PantryLink needs screen"/></div></div></section>
    <section className="steps-list shell">{steps.map(([num,title,img,text],i)=><article className={`step-row ${i%2?"reverse":""}`} key={num}><div className="step-copy"><span>{num}</span><h2>{title}</h2><p>{text}</p></div><div className={`step-image step-image-${i+1}`}><img src={img} alt={title}/></div></article>)}</section>
    <section className="band-cta"><div className="shell"><img src={logo} alt="PantryLink logo"/><div><h2>Ready to try PantryLink GA?</h2><p>The app is available now on the iOS App Store.</p></div><AppStoreButton/></div></section>
  </main>;
}

function ForPantriesPage({ navigate }) {
  const benefits = [
    ["box","Post specific needs","Share the exact item, amount, and deadline instead of relying on general donation lists."],
    ["people","See donor commitments","Claims show how much of a request the community has already committed to provide."],
    ["map","Reach local supporters","Make your organization and its current needs easier to discover through the app."],
    ["heart","Help shape PantryLink","Your feedback can directly guide the improvements we prioritize next."],
  ];
  return <main>
    <section className="page-hero pantry-hero"><div className="shell page-hero-grid"><div><span className="kicker light">For pantry partners</span><h1>Make your current needs visible to the people ready to help.</h1><p>PantryLink gives food pantries a focused way to post current requests, track donor commitments, and connect with nearby supporters.</p><button className="cream-button" onClick={() => navigate("contact")}>Sign up as a pantry <Icon name="arrow"/></button></div><div className="pantry-hero-art"><div className="big-logo"><img src={logo} alt="PantryLink logo"/></div><img src={needsShot} alt="PantryLink needs screen"/></div></div></section>
    <section className="partner-benefits"><div className="shell"><div className="partner-heading"><div><span className="kicker light">Built for useful action</span><h2>More than another donation list.</h2></div><div className="partner-logo-card"><img src={logo} alt="PantryLink logo"/><span>Current needs. Clear commitments. Local support.</span></div></div><div className="benefit-grid">{benefits.map(([icon,title,text],i)=><article className={`benefit-card b${i+1}`} key={title}><div className="benefit-icon"><Icon name={icon}/></div><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="partner-process shell"><div className="section-heading centered"><span className="kicker">Getting started</span><h2>Joining is simple.</h2></div><div className="partner-steps"><article><b>1</b><h3>Tell us about your pantry</h3><p>Use the interest form to share your organization and contact information.</p></article><article><b>2</b><h3>Create your pantry profile</h3><p>Set up your organization so community members can identify and locate you.</p></article><article><b>3</b><h3>Begin posting needs</h3><p>Add specific requests and update them as your inventory and priorities change.</p></article></div></section>
    <section className="feedback-section"><div className="shell feedback-grid"><div className="feedback-phone"><img src={settingsShot} alt="PantryLink account settings"/></div><div><span className="kicker light">Early pantry partners</span><h2>Your feedback matters.</h2><p>PantryLink is live, but we are still improving it alongside the organizations it is meant to serve. Pantry partners can help us understand what is clear, what is missing, and what would make the platform more useful.</p><button className="cream-button" onClick={() => navigate("contact")}>Contact PantryLink <Icon name="arrow"/></button></div></div></section>
  </main>;
}

function ContactPage() {
  return <main>
    <section className="page-hero contact-hero"><div className="shell contact-hero-grid"><div><span className="kicker light">Contact PantryLink</span><h1>Join the platform or get in touch.</h1><p>Food pantries can use this form to express interest in joining. You can also contact us with app feedback, questions, or support needs.</p><a className="mail-link" href={`mailto:${SUPPORT_EMAIL}`}><Icon name="mail"/>{SUPPORT_EMAIL}</a></div><div className="contact-logo"><img src={logo} alt="PantryLink logo"/><span>Helping pantries share what they need most.</span></div></div></section>
    <section className="contact-section shell"><div className="form-intro"><span className="kicker">Pantry interest and support</span><h2>Send us a message.</h2><p>Complete the form below and we will follow up using the contact information you provide.</p></div><div className="form-frame"><iframe src={CONTACT_FORM_URL} title="PantryLink contact form">Loading…</iframe></div></section>
  </main>;
}

function PrivacyPage() {
  const cards = [
    ["Information you provide","When you create or update an account, PantryLink may receive information such as your name, email address, phone number, location, donation preferences, and other profile details you choose to provide."],
    ["How information is used","Information may be used to operate the app, display relevant pantry requests, support user accounts, process claims, improve the service, and respond to support requests."],
    ["Location information","Location information may be used to show nearby pantry requests and map results. The precise information available depends on the permissions and settings you choose on your device."],
    ["Pantry and donation activity","The app may store information connected to pantry requests, donation claims, committed amounts, drop-off status, and related activity needed to provide the service."],
    ["Notifications","When enabled, PantryLink may send alerts about urgent local needs or important account activity. Notification settings can be changed in the app or through your device settings."],
    ["Data sharing","PantryLink does not sell personal information. Information may be shared with service providers only when reasonably necessary to operate, maintain, secure, or improve the platform."],
    ["Data security","Reasonable safeguards are used to protect account and app information. No online system can guarantee absolute security, so users should also protect their passwords and devices."],
    ["Children’s privacy","PantryLink is not intended to knowingly collect personal information from children in violation of applicable law. Contact us if you believe such information has been provided."],
  ];
  return <main>
    <section className="privacy-hero"><div className="shell privacy-hero-grid"><div><span className="kicker light">Privacy & data deletion</span><h1>Your information should be understandable and manageable.</h1><p>This page explains the general types of information PantryLink may use and how users can request account deletion.</p><span className="updated-pill">Last updated: July 19, 2026</span></div><div className="privacy-brand"><img src={logo} alt="PantryLink logo"/><strong>PantryLink GA</strong><span>Privacy and account controls</span></div></div></section>
    <section className="privacy-layout shell">
      <aside className="delete-panel"><div className="delete-icon"><Icon name="trash"/></div><span className="kicker">Delete your account</span><h2>Account deletion is available inside the app.</h2><p>Open PantryLink GA and follow:</p><div className="delete-path"><span>Account</span><b>→</b><span>Delete Account</span></div><p>You may also email us from the address connected to your account and request deletion.</p><a href={`mailto:${SUPPORT_EMAIL}?subject=PantryLink%20Account%20Deletion%20Request`}><Icon name="mail"/> Email deletion request</a></aside>
      <div className="privacy-content"><div className="privacy-intro"><Icon name="shield"/><div><h2>Privacy overview</h2><p>We aim to collect and use only the information reasonably needed to operate PantryLink and connect people with local pantry needs.</p></div></div><div className="privacy-cards">{cards.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="privacy-contact"><div><span className="kicker light">Questions or requests</span><h2>Contact PantryLink</h2><p>For privacy questions, corrections, or account deletion support, email us directly.</p></div><a href={`mailto:${SUPPORT_EMAIL}`}><Icon name="mail"/>{SUPPORT_EMAIL}</a></div></div>
    </section>
  </main>;
}

function App() {
  const valid = ["home","how-it-works","for-pantries","contact","privacy"];
  const readHash = () => { const value = window.location.hash.replace("#",""); return valid.includes(value) ? value : "home"; };
  const [page,setPage] = useState(readHash);
  useEffect(() => { const onHash = () => { setPage(readHash()); window.scrollTo({top:0,behavior:"smooth"}); }; window.addEventListener("hashchange",onHash); return () => window.removeEventListener("hashchange",onHash); },[]);
  useEffect(() => { if (!window.location.hash) window.history.replaceState(null,"","#home"); },[]);
  const navigate = (id) => { if (window.location.hash === `#${id}`) window.scrollTo({top:0,behavior:"smooth"}); else window.location.hash = id; };
  let content = <HomePage navigate={navigate}/>;
  if (page === "how-it-works") content = <HowItWorksPage navigate={navigate}/>;
  if (page === "for-pantries") content = <ForPantriesPage navigate={navigate}/>;
  if (page === "contact") content = <ContactPage/>;
  if (page === "privacy") content = <PrivacyPage/>;
  return <div className="site-app"><Header page={page} navigate={navigate}/>{content}<Footer navigate={navigate}/></div>;
}

export default App;
