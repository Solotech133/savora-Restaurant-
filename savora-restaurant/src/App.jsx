
import { useState } from "react";
import "./App.css";

const dishes = [
  {
    id: 1,
    name: "Truffle Cream Pasta",
    category: "Main",
    price: 24,
    description: "Fresh pasta, wild mushrooms, parmesan and truffle cream.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    tag: "Chef's choice",
  },
  {
    id: 2,
    name: "Signature Steak",
    category: "Main",
    price: 38,
    description: "Grilled premium steak with herbs and roasted vegetables.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Garden Fresh Salad",
    category: "Starter",
    price: 14,
    description: "Seasonal greens, cherry tomatoes and citrus dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    tag: "Fresh",
  },
  {
    id: 4,
    name: "Golden Cheesecake",
    category: "Dessert",
    price: 12,
    description: "Creamy vanilla cheesecake with berry compote.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85",
    tag: "Sweet finish",
  },
  {
    id: 5,
    name: "Roasted Chicken",
    category: "Main",
    price: 27,
    description: "Herb-roasted chicken, buttery potatoes and pan jus.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    tag: "House special",
  },
  {
    id: 6,
    name: "Chocolate Indulgence",
    category: "Dessert",
    price: 13,
    description: "Rich chocolate dessert with cream and fresh berries.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    tag: "Guest favourite",
  },
];

const categories = ["All", "Starter", "Main", "Dessert"];

function App() {
  const [category, setCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    date: "",
    time: "19:00",
    guests: "2",
    notes: "",
  });
  const [message, setMessage] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function updateBooking(event) {
    const { name, value } = event.target;
    setBooking((previous) => ({ ...previous, [name]: value }));
    setMessage("");
  }

  function handleReservation(event) {
    event.preventDefault();

    if (booking.date < today) {
      setMessage("Please choose today or a future date.");
      return;
    }

    const reservation = {
      ...booking,
      reference: `SAV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };

    // Demo only: save the request in this browser.
    try {
      const existing = JSON.parse(
        localStorage.getItem("savoraReservations") || "[]"
      );
      localStorage.setItem(
        "savoraReservations",
        JSON.stringify([...existing, reservation])
      );
      setMessage(
        `Demo booking saved! Reference: ${reservation.reference}. This is not yet a confirmed restaurant reservation.`
      );
      setBooking({
        name: "",
        email: "",
        date: "",
        time: "19:00",
        guests: "2",
        notes: "",
      });
    } catch {
      setMessage(
        "Your browser could not save this demo booking. Please check your browser storage settings."
      );
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMobileMenu}>
          savora<span>.</span>
          <small>DINING EXPERIENCE</small>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={mobileMenuOpen ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={closeMobileMenu}>Home</a>
          <a href="#story" onClick={closeMobileMenu}>Our story</a>
          <a href="#menu" onClick={closeMobileMenu}>Menu</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
          <a
            className="nav-cta"
            href="#reservation"
            onClick={closeMobileMenu}
          >
            Reserve a table <span>↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant restaurant dining table"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow"><span /> GOOD FOOD. GREAT COMPANY.</p>
            <h1>
              A taste of
              <br />
              <em>the extraordinary.</em>
            </h1>
            <p className="hero-description">
              Thoughtfully crafted dishes, exceptional ingredients, and
              moments worth slowing down for.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#menu">
                Explore our menu <span>↗</span>
              </a>
              <a className="text-link" href="#story">
                Discover Savora <span>↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <span>01 — 06</span>
              <span className="meta-line" />
              <span>CRAFTED WITH PASSION</span>
            </div>
          </div>

          <div className="hero-side-note">
            AN EXPERIENCE FOR ALL THE SENSES
          </div>
        </section>

        <section className="intro section" id="story">
          <div className="intro-label">
            <span className="gold-number">01</span>
            <span className="label-line" />
            <span>THE SAVORA STORY</span>
          </div>

          <div className="intro-content">
            <h2>
              More than a meal.
              <br />
              <em>A feeling.</em>
            </h2>
            <div className="intro-copy">
              <p>
                We believe the best memories begin around a table. At Savora,
                every plate tells a story of seasonal ingredients, creative
                craft, and a genuine love for good food.
              </p>
              <a className="underlined-link" href="#reservation">
                Come experience it <span>↗</span>
              </a>
            </div>
          </div>

          <div className="story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
              alt="Warm and elegant restaurant interior"
              loading="lazy"
            />
            <div className="image-caption">
              <span>01 / OUR SPACE</span>
              <span>Made for memorable moments.</span>
            </div>
          </div>
        </section>

        <section className="menu-section section" id="menu">
          <div className="section-heading">
            <div>
              <div className="intro-label">
                <span className="gold-number">02</span>
                <span className="label-line" />
                <span>FROM OUR KITCHEN</span>
              </div>
              <h2>Made to be <em>savoured.</em></h2>
            </div>
            <p>
              Honest ingredients. Thoughtful preparation.
              <br />
              Flavours that stay with you.
            </p>
          </div>

          <div className="category-tabs" aria-label="Filter menu">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="dish-grid">
            {filteredDishes.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <div className="dish-image-wrap">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                  <span className="dish-tag">{dish.tag}</span>
                </div>
                <div className="dish-info">
                  <div>
                    <span className="dish-category">{dish.category}</span>
                    <h3>{dish.name}</h3>
                  </div>
                  <span className="dish-price">${dish.price}</span>
                </div>
                <p className="dish-description">{dish.description}</p>
              </article>
            ))}
          </div>

          <p className="menu-note">
            Sample menu and prices for this demo. Replace them with your
            restaurant's actual offerings.
          </p>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>
            Great food is the beginning.
            <br />
            Great memories are the reason.
          </blockquote>
          <span className="quote-credit">THE SAVORA PHILOSOPHY</span>
        </section>

        <section className="reservation-section section" id="reservation">
          <div className="reservation-copy">
            <div className="intro-label">
              <span className="gold-number">03</span>
              <span className="label-line" />
              <span>YOUR TABLE AWAITS</span>
            </div>
            <h2>Make room for <em>something special.</em></h2>
            <p>
              Plan a relaxed evening, a celebration, or a memorable dinner.
              Tell us when you would like to visit.
            </p>
            <div className="reservation-detail">
              <span className="detail-icon">◷</span>
              <div>
                <strong>Opening hours</strong>
                <span>Mon – Sun · 12:00 PM – 10:00 PM</span>
              </div>
            </div>
            <div className="reservation-detail">
              <span className="detail-icon">⌖</span>
              <div>
                <strong>Find us</strong>
                <span>123 Dining Avenue, Your City</span>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleReservation}>
            <h3>Reserve your table</h3>
            <p className="form-subtitle">
              Fill in your details to create a demo booking.
            </p>

            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              value={booking.name}
              onChange={updateBooking}
              placeholder="Your full name"
              autoComplete="name"
              required
              maxLength={100}
            />

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={booking.email}
              onChange={updateBooking}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <div className="form-row">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  value={booking.date}
                  onChange={updateBooking}
                  required
                />
              </div>
              <div>
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  name="time"
                  value={booking.time}
                  onChange={updateBooking}
                >
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            <label htmlFor="guests">Number of guests</label>
            <select
              id="guests"
              name="guests"
              value={booking.guests}
              onChange={updateBooking}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <option key={number} value={String(number)}>
                  {number} {number === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>

            <label htmlFor="notes">Special requests (optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={booking.notes}
              onChange={updateBooking}
              placeholder="Celebration, dietary requests..."
              rows="3"
              maxLength={500}
            />

            <button className="button button-gold submit-button" type="submit">
              Request a reservation <span>↗</span>
            </button>

            {message && (
              <p className="booking-message" role="status">
                {message}
              </p>
            )}

            <p className="privacy-note">
              Demo only. No email is sent, and no restaurant booking is
              confirmed.
            </p>
          </form>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home">
            savora<span>.</span>
            <small>DINING EXPERIENCE</small>
          </a>
          <p>
            Thoughtful food.
            <br />
            Unforgettable moments.
          </p>
          <a className="back-top" href="#home">
            Back to top ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Savora. Portfolio demo.</span>
          <span>MADE WITH CARE <span className="footer-heart">♥</span></span>
        </div>
      </footer>
    </>
  );
}

export default App;
