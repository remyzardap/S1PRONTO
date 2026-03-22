import {
  Brain, MessageSquare, Layers, CloudLightning, Sparkles, Shield,
  Phone, Check, ArrowRight, Zap, Globe, Lock
} from "lucide-react";
import { useLocation } from "wouter";
import { useV2Theme } from "../components/ThemeToggle";
import ThemeToggle from "../components/ThemeToggle";

const SLogo = () => (
  <svg width="48" height="28" viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,28 C45,20 38,8 26,8 C12,8 4,17 4,28 C4,39 12,48 26,48 C38,48 45,36 48,28 C51,20 58,8 70,8 C84,8 92,17 92,28 C92,39 84,48 70,48 C58,48 51,36 48,28Z" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" fill="none"/>
    <line x1="62" y1="19" x2="78" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M60,28 C60,24.5 63.5,22.5 66.5,24 C67,21.5 70,20.5 72.5,22 C74.5,20.5 79,21.5 79,25 C79,28 76,29.5 73,29 C72,30.5 67,30.5 65.5,29 C62.5,29 60,28.8 60,28Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="59" y1="34" x2="81" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M67.5,34 L70,38.5 L72.5,34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const features = [
  {
    icon: Brain,
    title: "Persistent Identity",
    description: "Your AI identity persists across every model, every conversation, every platform. One memory, everywhere.",
  },
  {
    icon: Layers,
    title: "Skill Collection",
    description: "Collect and combine skills from any AI model. Build your personal toolkit that grows with you.",
  },
  {
    icon: CloudLightning,
    title: "Memory Vault",
    description: "Everything you learn, every preference you set, stored in your sovereign memory vault.",
  },
  {
    icon: Phone,
    title: "Kemma Voice AI",
    description: "Talk naturally with Kemma. Voice-first AI that understands context and remembers everything.",
  },
  {
    icon: Sparkles,
    title: "Multi-Model Intelligence",
    description: "Access Claude, GPT, Gemini, and more through a single interface. Use the right model for every task.",
  },
  {
    icon: Shield,
    title: "Sovereign & Private",
    description: "Your data, your control. End-to-end encrypted memories with zero data selling. Ever.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with AI that remembers you",
    features: [
      "500 messages/month",
      "Basic memory (100 entries)",
      "3 skill slots",
      "1 connected model",
      "Community support",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$20",
    period: "/month",
    description: "For power users who demand more",
    features: [
      "Unlimited messages",
      "Unlimited memory",
      "Unlimited skills",
      "All AI models included",
      "Kemma Voice AI",
      "Priority support",
      "API access",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Max",
    price: "$50",
    period: "/month",
    description: "Maximum power, zero limits",
    features: [
      "Everything in Pro",
      "Max context windows",
      "Custom model fine-tuning",
      "Advanced workflows",
      "Team collaboration",
      "Dedicated support",
      "White-label option",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Go Max",
  },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const { mode, toggle } = useV2Theme();

  return (
    <div style={{ background: "var(--v2-bg)", color: "var(--v2-text)", minHeight: "100vh" }}>
      {/* ─── Navigation ─── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(10, 10, 15, 0.70)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          borderBottom: "1px solid var(--v2-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SLogo />
          <span
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--v2-text)",
            }}
          >
            Sutaeru
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <ThemeToggle mode={mode} onToggle={toggle} />
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              border: "1px solid var(--v2-border)",
              background: "transparent",
              fontFamily: "var(--v2-font-heading)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--v2-text-secondary)",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/login")}
            className="v2-cta-btn"
            style={{ padding: "9px 20px", fontSize: 11 }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="v2-landing-hero" style={{ minHeight: "90vh", padding: "0 24px" }}>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: 720,
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(var(--v2-accent-rgb), 0.08)",
              border: "1px solid rgba(var(--v2-accent-rgb), 0.15)",
              fontFamily: "var(--v2-font-heading)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--v2-accent)",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--v2-accent)",
                animation: "v2-hero-orb 2s ease infinite",
              }}
            />
            Now live
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 800,
              fontSize: "clamp(40px, 8vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--v2-text)",
              margin: "0 0 20px",
            }}
          >
            Your Sovereign{" "}
            <span className="v2-text-gradient">AI</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontWeight: 300,
              fontSize: "clamp(16px, 2.5vw, 20px)",
              lineHeight: 1.6,
              color: "var(--v2-text-secondary)",
              maxWidth: 520,
              margin: "0 auto 40px",
            }}
          >
            The personal agent that works for you, not against you.
            One persistent memory across every model, every conversation.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/login")}
              className="v2-cta-btn"
              style={{ fontSize: 15, padding: "16px 36px" }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "16px 36px",
                borderRadius: 999,
                border: "1px solid var(--v2-border)",
                background: "var(--v2-glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                fontFamily: "var(--v2-font-heading)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--v2-text-secondary)",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--v2-text)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need
          </h2>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 16,
              color: "var(--v2-text-secondary)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            A complete AI operating system built around your identity.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <div key={feature.title} className="v2-feature-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(var(--v2-accent-rgb), 0.10)",
                  marginBottom: 16,
                }}
              >
                <feature.icon className="w-5 h-5" style={{ color: "var(--v2-accent)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--v2-font-heading)",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--v2-text)",
                  margin: "0 0 8px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--v2-font-body)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--v2-text-secondary)",
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--v2-text)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Simple pricing
          </h2>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 16,
              color: "var(--v2-text-secondary)",
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            Start free. Scale when you're ready.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`v2-pricing-card ${plan.highlighted ? "v2-pricing-card--highlighted" : ""}`}
            >
              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontFamily: "var(--v2-font-heading)",
                    fontWeight: 600,
                    fontSize: 20,
                    color: "var(--v2-text)",
                    margin: "0 0 4px",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: 13,
                    color: "var(--v2-text-muted)",
                    margin: 0,
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <span
                  style={{
                    fontFamily: "var(--v2-font-heading)",
                    fontWeight: 800,
                    fontSize: 40,
                    color: "var(--v2-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    style={{
                      fontFamily: "var(--v2-font-body)",
                      fontSize: 14,
                      color: "var(--v2-text-muted)",
                    }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 0",
                      fontFamily: "var(--v2-font-body)",
                      fontSize: 13,
                      color: "var(--v2-text-secondary)",
                    }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{
                        color: plan.highlighted ? "var(--v2-accent)" : "var(--v2-text-muted)",
                        flexShrink: 0,
                      }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: plan.highlighted ? "none" : "1px solid var(--v2-border)",
                  background: plan.highlighted ? "var(--v2-accent-gradient)" : "var(--v2-glass-bg)",
                  color: plan.highlighted ? "#ffffff" : "var(--v2-text-secondary)",
                  fontFamily: "var(--v2-font-heading)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  boxShadow: plan.highlighted
                    ? "0 4px 20px rgba(var(--v2-accent-rgb), 0.3)"
                    : "none",
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: "32px 24px",
          borderTop: "1px solid var(--v2-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SLogo />
          <span
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--v2-text-muted)",
            }}
          >
            Sutaeru
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: 12,
            color: "var(--v2-text-muted)",
          }}
        >
          © 2025 Sutaeru. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
