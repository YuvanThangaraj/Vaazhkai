import { useEffect, useState } from "react"
import { assetUrl } from "./lib/assets"
import { useSiteData } from "./lib/useSiteData"
import heroDogPhoto from "./assets/vaazhkai-hero-dog.jpg"
import logoImage from "./assets/vaazhkai-logo.jpg"
import dogCloseup from "./assets/dog-closeup.jpg"
import creamDogCloseup from "./assets/dog-cream-closeup.jpg"
import comfortedDog from "./assets/dog-comforted.jpg"
import kittensPhoto from "./assets/kittens.jpg"
import fieldworkPhoto from "./assets/community-fieldwork.jpg"
import womanWithDog from "./assets/community-woman-dog.jpg"
import communityCat from "./assets/community-cat.jpg"
import blackWhiteDog from "./assets/community-black-white-dog.jpg"
import horsePhoto from "./assets/community-horse.jpg"
import careDog from "./assets/community-care-dog.jpg"
import tongueDog from "./assets/vaazhkai-dog.jpg"

// External links open in a new tab, safely.
const ext = { target: "_blank", rel: "noopener noreferrer" } as const

const facebookUrl = "https://www.facebook.com/profile.php?id=61594953604868"
const websiteUrl = "https://vaazhkai.vercel.app"

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    className={diagonal ? "icon icon-diagonal" : "icon"}
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.4-5A8.4 8.4 0 1 1 20.5 11.7Z" />
    <path d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .3-.2 1.4-.9 2-.5.5-1.3.8-2.1.6-1.1-.2-2.6-.7-4.3-2.1-2-1.7-3.2-3.8-3.5-4.9-.3-1.1.1-1.8.4-2.2Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle className="icon-fill" cx="17.4" cy="6.7" r="1" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.5 10v7M7.5 7v.1M11.2 17v-7m0 3c.7-2 5.3-2.2 5.3 1.4V17" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 21v-6.5h2.2l.4-2.6H15v-1.6c0-.8.3-1.3 1.4-1.3h1.3V6.7c-.3 0-1-.2-1.8-.2-2 0-3.3 1.2-3.3 3.4v2H10.4v2.6h2.2V21" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3 12h18" />
  </svg>
)

const PawMark = () => (
  <span className="paw-mark" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
    <i />
  </span>
)

const BrandMark = ({ compact = false }: { compact?: boolean }) => (
  <span className={`brand-mark${compact ? " compact" : ""}`}>
    <span className="brand-crop">
      <img src={logoImage} alt="" />
    </span>
    {!compact && <span className="brand-name">VAAZHKAI</span>}
  </span>
)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const { settings, stories, resources } = useSiteData()
  const wa = settings.whatsapp_url
  const ig = settings.instagram_url
  const li = settings.linkedin_url
  const support = settings.support_url // no fallback: absent = no Support CTA
  const story = stories[0]
  const storyImage = assetUrl(story?.image_key)

  // The story section only exists once data loads, so a /#stories deep link can't scroll on its own.
  useEffect(() => {
    if (story && location.hash === "#stories") document.getElementById("stories")?.scrollIntoView()
  }, [story])

  return (
    <div className="site-shell">
      <header className="floating-nav">
        <a
          className="nav-brand"
          href="#top"
          aria-label="Vaazhkai home"
          onClick={closeMenu}
        >
          <BrandMark compact />
          <span>VAAZHKAI</span>
        </a>
        <nav
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#what-we-do" onClick={closeMenu}>
            What We Do
          </a>
          {story && (
            <a href="#stories" onClick={closeMenu}>
              Stories
            </a>
          )}
          <a href="#resources" onClick={closeMenu}>
            Resources
          </a>
          <a
            className="mobile-join"
            href={wa}
            {...ext}
            onClick={closeMenu}
          >
            <WhatsAppIcon /> Join Community
          </a>
        </nav>
        <a
          className="nav-cta"
          href={wa}
          {...ext}
        >
          <WhatsAppIcon /> Join Community
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <PawMark /> Student-led · Chennai
            </p>
            <h1>For those who can’t ask.</h1>
            <p>
              Vaazhkai helps people understand, care for and protect community
              animals.
            </p>
            <div className="button-row">
              <a
                className="button button-primary"
                href={wa}
                {...ext}
              >
                <WhatsAppIcon /> Join our WhatsApp Community
              </a>
              <a
                className="text-link"
                href={ig}
                {...ext}
              >
                <InstagramIcon /> Instagram <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={heroDogPhoto}
              alt="A cream-coloured community dog resting closely against a person"
            />
            <span className="photo-caption">Care begins with connection.</span>
          </div>
        </section>

        <section className="manifesto" id="about">
          <div className="manifesto-photo">
            <img
              src={blackWhiteDog}
              alt="A black and white community dog looking attentively upward"
            />
          </div>
          <div className="manifesto-type">
            <span>Everyday action · 01</span>
            <h2>You don’t have to volunteer to help.</h2>
            <p>Start where you are.</p>
          </div>
        </section>

        <section className="actions" id="what-we-do">
          <div className="section-heading">
            <p className="eyebrow">Small actions</p>
            <h2>Care can look like this.</h2>
          </div>
          <div className="action-collage">
            <figure className="action-photo action-photo-large">
              <img
                src={womanWithDog}
                alt="A Vaazhkai community member sitting closely with a brown dog"
              />
              <figcaption>
                <span>Kindness</span>
                <strong>Choose understanding.</strong>
              </figcaption>
            </figure>
            <div className="action-type action-water">
              <span>Water</span>
              <strong>Leave clean water.</strong>
              <svg viewBox="0 0 80 100" aria-hidden="true">
                <path d="M40 4S8 49 8 70a32 32 0 0 0 64 0C72 49 40 4 40 4Z" />
              </svg>
            </div>
            <figure className="action-photo action-kittens">
              <img
                src={kittensPhoto}
                alt="A group of young kittens together in a box"
              />
              <figcaption>
                <span>Notice</span>
                <strong>Know when to help.</strong>
              </figcaption>
            </figure>
            <div className="action-type action-feed">
              <span>Feed</span>
              <strong>Share a meal.</strong>
              <PawMark />
            </div>
          </div>
        </section>

        <section className="neighbourhood">
          <img
            src={dogCloseup}
            alt="A community dog looking directly at the camera"
          />
          <div>
            <span>
              <svg className="pin-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Our neighbourhoods
            </span>
            <h2>They’re already part of our neighbourhood.</h2>
            <p>Notice them. Understand them. Care for them.</p>
          </div>
        </section>

        <section className="problem">
          <span className="eyebrow">Why we exist</span>
          <h2>They can’t ask us for help.</h2>
          <div className="problem-bottom">
            <PawMark />
            <p>We can choose to notice.</p>
          </div>
        </section>

        <section className="fieldwork">
          <div className="fieldwork-image">
            <img
              src={fieldworkPhoto}
              alt="A Vaazhkai community member interacting with a group of dogs"
            />
          </div>
          <div className="fieldwork-copy">
            <span>People · Animals · Community</span>
            <h2>Care starts with showing up.</h2>
            <p>Small acts become meaningful when more people take part.</p>
          </div>
        </section>

        {story && (
          <section className="sundaresan" id="stories">
            <div className="sundaresan-image">
              {storyImage && <img src={storyImage} alt={story.image_alt ?? ""} />}
              <span>First rescue · 01</span>
            </div>
            <div className="sundaresan-copy">
              {story.eyebrow && <p>{story.eyebrow}</p>}
              <h2>{story.title}</h2>
              {story.excerpt && <h3>{story.excerpt}</h3>}
              {story.body && <span>{story.body}</span>}
            </div>
          </section>
        )}

        <section className="fear" id="resources">
          <div className="fear-copy">
            <span>Learn before you act</span>
            <h2>Understanding changes fear.</h2>
            <p>Not every unfamiliar animal is something to fear.</p>
            {resources.map((r) => (
              <a key={r.url} href={r.url} {...ext}>
                {r.title} <Arrow diagonal />
              </a>
            ))}
          </div>
          <img src={creamDogCloseup} alt="A calm community dog in profile" />
        </section>

        <section className="stories-gallery">
          <div className="gallery-title">
            <p>From our community</p>
            <h2>
              Real animals.
              <br />
              Real stories.
            </h2>
          </div>
          <img
            className="gallery-dog"
            src={communityCat}
            alt="An orange and white community cat resting outdoors"
          />
          <img
            className="gallery-kittens"
            src={horsePhoto}
            alt="A brown horse standing among green foliage"
          />
          <img
            className="gallery-face"
            src={tongueDog}
            alt="A cheerful community dog with its tongue out"
          />
          <img
            className="gallery-litter"
            src={kittensPhoto}
            alt="A group of young kittens together in a box"
          />
        </section>

        <section className="community" id="community">
          <div className="community-collage">
            <img
              src={careDog}
              alt="A community dog holding a caregiver’s hand with its paw"
            />
            <div className="community-collage-mark" aria-hidden="true">
              <WhatsAppIcon />
            </div>
            <div className="community-collage-line" aria-hidden="true">
              <PawMark />
            </div>
          </div>
          <div className="community-copy">
            <WhatsAppIcon />
            <h2>Stay connected.</h2>
            <p>Learn. Share. Help where you are.</p>
            <a
              className="button button-light"
              href={wa}
              {...ext}
            >
              <WhatsAppIcon /> Join our WhatsApp Community
            </a>
            <a
              className="community-instagram"
              href={ig}
              {...ext}
            >
              <InstagramIcon /> Follow us on Instagram <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="instagram" id="instagram">
          <div className="instagram-heading">
            <h2>Find us online.</h2>
            <a
              href={ig}
              {...ext}
            >
              Follow Vaazhkai on Instagram <Arrow diagonal />
            </a>
          </div>
          <div className="instagram-grid" id="instagram-grid">
            <img src={comfortedDog} alt="A dog being comforted" />
            <a
              className="instagram-visual instagram-visual-heart"
              href={ig}
              aria-label="Vaazhkai on Instagram"
              {...ext}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
            </a>
            <img
              className="instagram-photo"
              src={dogCloseup}
              alt="A community dog looking directly at the camera"
            />
            <a
              className="social-tile"
              href={ig}
              {...ext}
            >
              <InstagramIcon />
              <span>Vaazhkai on Instagram</span>
            </a>
            <a
              className="social-tile social-linkedin"
              href={li}
              {...ext}
            >
              <LinkedInIcon />
              <span>Vaazhkai on LinkedIn</span>
            </a>
            <a
              className="social-tile social-facebook"
              href={facebookUrl}
              {...ext}
            >
              <FacebookIcon />
              <span>Vaazhkai on Facebook</span>
            </a>
            <a
              className="social-tile social-website"
              href={websiteUrl}
              {...ext}
            >
              <GlobeIcon />
              <span>Vaazhkai website</span>
            </a>
          </div>
        </section>

        <section className="involved" id="get-involved">
          <div>
            <p>Take the next step</p>
            <h2>Want to do more?</h2>
          </div>
          <div className="involved-grid">
            <a
              className="involved-primary"
              href={wa}
              {...ext}
            >
              <WhatsAppIcon />
              <span>Join Community</span>
              <Arrow diagonal />
            </a>
            <a
              href={wa}
              {...ext}
            >
              <span>Volunteer</span>
              <Arrow diagonal />
            </a>
            <a
              href={wa}
              {...ext}
            >
              <span>Foster / Adopt</span>
              <Arrow diagonal />
            </a>
            {support && (
              <a href={support} {...ext}>
                <span>Support</span>
                <Arrow diagonal />
              </a>
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-lead">
          <BrandMark />
          <h2>For those who can’t ask.</h2>
          <a
            className="button button-primary"
            href={wa}
            {...ext}
          >
            <WhatsAppIcon /> Join WhatsApp Community
          </a>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="#about">About</a>
            <a href="#what-we-do">What We Do</a>
            {story && <a href="#stories">Stories</a>}
            <a href="#resources">Resources</a>
          </div>
          <div>
            <span>Social</span>
            <a
              href={ig}
              {...ext}
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href={wa}
              {...ext}
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href={li}
              {...ext}
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
          <div>
            <span>Take part</span>
            <a
              href={wa}
              {...ext}
            >
              Get Involved
            </a>
            {support && (
              <a href={support} {...ext}>
                Support
              </a>
            )}
          </div>
        </div>
        <div className="footer-bottom" id="footer-note">
          <span>© {new Date().getFullYear()} Vaazhkai</span>
          <span>Chennai, India</span>
        </div>
      </footer>
    </div>
  )
}
