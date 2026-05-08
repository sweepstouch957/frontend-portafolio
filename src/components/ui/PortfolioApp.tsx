import { useState, useEffect, useRef, useCallback } from 'react';
import { CONTENT, EXPERIENCE, SEED_PROJECTS, type Lang } from '../../lib/content';
import { Icons } from './Icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ADMIN_PASS = 'sweepstouch2026';

type Theme = 'dark' | 'light';

interface Project {
  id: string;
  title: string | { en: string; es: string };
  desc: string | { en: string; es: string };
  tags: string[];
  link?: string;
  initials?: string;
  thumb?: string;
}

function pick<T>(val: T | { en: T; es: T }, lang: Lang): T {
  if (val && typeof val === 'object' && 'en' in (val as object)) {
    return (val as { en: T; es: T })[lang];
  }
  return val as T;
}

/* ─── Spotlight ──────────────────────────────────────────────────────── */
function Spotlight({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled]);
  if (!enabled) return null;
  return <div className="spotlight" aria-hidden="true" />;
}

/* ─── Reveal wrapper ─────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add('in')),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} data-delay={delay}>
      {children}
    </div>
  );
}

/* ─── Mobile Bottom Nav ──────────────────────────────────────────────── */
function MobileNav({ items }: { items: { id: string; label: string; icon: React.ReactNode }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const pillRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = items.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [items]);

  /* animate pill to active item */
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const activeEl = nav.querySelector(`[data-id="${active}"]`) as HTMLElement;
    if (!activeEl) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    gsap.to(pill, {
      x: itemRect.left - navRect.left,
      width: itemRect.width,
      duration: 0.4,
      ease: 'power3.inOut',
    });
  }, [active]);

  return (
    <nav className="mobnav" aria-label="Mobile navigation">
      <div className="mobnav-track" ref={navRef}>
        <span className="mobnav-pill" ref={pillRef} aria-hidden="true" />
        {items.map(({ id, icon }) => (
          <a key={id} data-id={id} href={`#${id}`}
            className={`mobnav-item${active === id ? ' active' : ''}`}
            onClick={() => setActive(id)}
          >
            <span className="mobnav-icon">{icon}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Side Nav ───────────────────────────────────────────────────────── */
function SideNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  useEffect(() => {
    const observers = items.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [items]);
  return (
    <nav className="sidenav" aria-label="Section navigation">
      {items.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
          <span className="bar" /> {label}
        </a>
      ))}
    </nav>
  );
}

/* ─── Controls ───────────────────────────────────────────────────────── */
function ThemeLangControls({
  theme, setTheme, lang, setLang,
}: {
  theme: Theme; setTheme: (t: Theme) => void;
  lang: Lang; setLang: (l: Lang) => void;
}) {
  return (
    <div className="ctl-cluster">
      <div className="ctl-seg" role="tablist" aria-label="Language">
        <button
          className={lang === 'en' ? 'on' : ''}
          onClick={() => setLang('en')}
          aria-label="English"
          aria-selected={lang === 'en'}
        >EN</button>
        <button
          className={lang === 'es' ? 'on' : ''}
          onClick={() => setLang('es')}
          aria-label="Español"
          aria-selected={lang === 'es'}
        >ES</button>
      </div>
      <button
        className="ctl-icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
      </button>
    </div>
  );
}

/* ─── Projects Island ────────────────────────────────────────────────── */
type ModalContent = (typeof CONTENT)['en']['modal'] | (typeof CONTENT)['es']['modal'];

function Projects({ lang, heading, addLabel, toasts, modal: m }: {
  lang: Lang;
  heading: string;
  addLabel: string;
  toasts: { added: string; removed: string };
  modal: ModalContent;
}) {
  const [items, setItems] = useState<Project[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('aha-projects-v2') || 'null');
      return stored || SEED_PROJECTS;
    } catch { return SEED_PROJECTS; }
  });
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');

  const persist = (next: Project[]) => {
    setItems(next);
    localStorage.setItem('aha-projects-v2', JSON.stringify(next));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleAdd = (p: Omit<Project, 'id'>) => {
    const next = [...items, { ...p, id: 'p-' + Date.now() }];
    persist(next);
    setOpen(false);
    showToast(toasts.added);
  };

  const handleDelete = (id: string) => {
    persist(items.filter((p) => p.id !== id));
    showToast(toasts.removed);
  };

  return (
    <section id="projects" className="section" data-screen-label="projects">
      <Reveal>
        <h2>{heading}</h2>
      </Reveal>
      <div className="projects">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i + 1, 4) as 0 | 1 | 2 | 3 | 4}>
            <article className="project">
              <div className="pj-thumb">
                {p.thumb
                  ? <img src={p.thumb} alt="" loading="lazy" />
                  : (p.initials || pick(p.title, lang).slice(0, 2).toUpperCase())}
              </div>
              <div>
                <a
                  className="pj-title"
                  href={p.link || '#'}
                  target={p.link ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {pick(p.title, lang)}
                  <span className="pj-arrow"><Icons.Arrow size={14} /></span>
                </a>
                <p className="pj-desc">{pick(p.desc, lang)}</p>
                <div className="tags">
                  {(p.tags || []).map((tg) => (
                    <span key={tg} className="tag">{tg}</span>
                  ))}
                </div>
              </div>
              <button
                className="pj-delete"
                onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}
                title="Remove"
                aria-label="Remove project"
              >
                <Icons.Trash />
              </button>
            </article>
          </Reveal>
        ))}
        <Reveal delay={Math.min(items.length + 1, 4) as 0 | 1 | 2 | 3 | 4}>
          <button className="add-card" onClick={() => setOpen(true)}>
            <span className="plus">+</span>
            {addLabel}
          </button>
        </Reveal>
      </div>
      {open && (
        <ProjectModal modal={m} onClose={() => setOpen(false)} onAdd={handleAdd} />
      )}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </section>
  );
}

function ProjectModal({ modal: m, onClose, onAdd }: {
  modal: ModalContent;
  onClose: () => void;
  onAdd: (p: Omit<Project, 'id'>) => void;
}) {
  const [form, setForm] = useState({ title: '', desc: '', tags: '', link: '', thumb: '' });
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd({
      title: form.title.trim(),
      desc: form.desc.trim(),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      link: form.link.trim(),
      thumb: form.thumb.trim(),
      initials: form.title.trim().slice(0, 2).toUpperCase(),
    });
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={m.title}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <h3>{m.title}</h3>
        <div className="field">
          <label htmlFor="pj-title">{m.title_label}</label>
          <input id="pj-title" value={form.title} onChange={update('title')} placeholder={m.title_ph} autoFocus required />
        </div>
        <div className="field">
          <label htmlFor="pj-desc">{m.desc_label}</label>
          <textarea id="pj-desc" rows={3} value={form.desc} onChange={update('desc')} placeholder={m.desc_ph} />
        </div>
        <div className="field">
          <label htmlFor="pj-tags">{m.tags_label}</label>
          <input id="pj-tags" value={form.tags} onChange={update('tags')} placeholder={m.tags_ph} />
        </div>
        <div className="field">
          <label htmlFor="pj-link">{m.link_label}</label>
          <input id="pj-link" type="url" value={form.link} onChange={update('link')} placeholder="https://…" />
        </div>
        <div className="field">
          <label htmlFor="pj-thumb">{m.thumb_label}</label>
          <input id="pj-thumb" type="url" value={form.thumb} onChange={update('thumb')} placeholder="https://…/cover.png" />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>{m.cancel}</button>
          <button type="submit" className="btn primary">{m.submit}</button>
        </div>
      </form>
    </div>
  );
}

/* ─── Admin Panel ────────────────────────────────────────────────────── */
function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('aha-admin') === '1');
  const [pass, setPass] = useState('');
  const [err, setErr]   = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    try { return JSON.parse(localStorage.getItem('aha-projects-v2') || 'null') || SEED_PROJECTS; }
    catch { return SEED_PROJECTS; }
  });
  const [form, setForm] = useState({ title: '', desc: '', tags: '', link: '', thumb: '' });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) { sessionStorage.setItem('aha-admin', '1'); setAuthed(true); setErr(false); }
    else { setErr(true); setPass(''); }
  };

  const persist = (next: Project[]) => {
    setProjects(next);
    localStorage.setItem('aha-projects-v2', JSON.stringify(next));
  };

  const addProject = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    persist([...projects, {
      id: 'p-' + Date.now(),
      title: form.title.trim(), desc: form.desc.trim(),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      link: form.link.trim(), thumb: form.thumb.trim(),
      initials: form.title.trim().slice(0, 2).toUpperCase(),
    }]);
    setForm({ title: '', desc: '', tags: '', link: '', thumb: '' });
  };

  const del = (id: string) => persist(projects.filter(p => p.id !== id));

  return (
    <div className="admin-back" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-header">
          <h3>
            {authed ? '⚡ Admin' : '🔐 Admin'}
            <span className="admin-badge">{authed ? 'AUTHENTICATED' : 'PRIVATE'}</span>
          </h3>
          <button className="admin-close" onClick={onClose}>×</button>
        </div>

        {!authed ? (
          <form onSubmit={login}>
            <div className="field">
              <label htmlFor="adm-pass">Password</label>
              <input
                id="adm-pass" type="password" autoFocus
                value={pass} onChange={e => { setPass(e.target.value); setErr(false); }}
                placeholder="Enter admin password"
                style={err ? { borderColor: '#ef4444' } : {}}
              />
              {err && <span style={{ fontSize: 12, color: '#ef4444' }}>Wrong password</span>}
            </div>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn primary">Unlock</button>
            </div>
            <p className="admin-login-hint">EASTER EGG · ADMIN ONLY</p>
          </form>
        ) : (
          <>
            <p className="admin-section-title">Projects ({projects.length})</p>
            <div className="admin-proj-list">
              {projects.map(p => (
                <div key={p.id} className="admin-proj-row">
                  <span>{typeof p.title === 'object' ? p.title.en : p.title}</span>
                  <button className="admin-proj-del" onClick={() => del(p.id)} title="Delete">×</button>
                </div>
              ))}
            </div>

            <p className="admin-section-title" style={{ marginTop: 20 }}>Add project</p>
            <form onSubmit={addProject}>
              <div className="field">
                <label htmlFor="a-title">Title</label>
                <input id="a-title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Project name" required />
              </div>
              <div className="field">
                <label htmlFor="a-desc">Description</label>
                <textarea id="a-desc" rows={2} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="What you built…" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="field">
                  <label htmlFor="a-tags">Tech (comma-sep)</label>
                  <input id="a-tags" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Next.js, Node" />
                </div>
                <div className="field">
                  <label htmlFor="a-link">Link</label>
                  <input id="a-link" type="url" value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="https://…" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => { sessionStorage.removeItem('aha-admin'); setAuthed(false); }}>Log out</button>
                <button type="submit" className="btn primary">+ Add project</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Contact Island ─────────────────────────────────────────────────── */
function Contact({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].contact;
  const [copied, setCopied] = useState(false);
  const email = 'allan.aceituno20@gmail.com';

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <section id="contact" className="section" data-screen-label="contact">
      <Reveal>
        <h2>{c.heading}</h2>
      </Reveal>
      <Reveal delay={1}>
        <div className="contact-card">
          <div className="contact-grid">
            <div className="contact-copy">
              <h3 dangerouslySetInnerHTML={{ __html: c.lead }} />
              <p>{c.body}</p>
              <div className="contact-stats">
                {c.stats.map((s, i) => (
                  <div key={i} className="cstat">
                    <div className="cstat-v">{s.v}</div>
                    <div className="cstat-k">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-actions-stack">
              <a className="btn primary btn-hero" href={`mailto:${email}`} aria-label="Send email">
                <Icons.Mail />
                <span className="btn-hero-label">{email}</span>
                <span className="btn-hero-arrow"><Icons.Arrow size={14} /></span>
              </a>
              <a
                className="btn cv-btn"
                href="/Allan_Aceituno_CV.docx"
                download="Allan_Aceituno_CV.docx"
              >
                <Icons.Download /> {c.cv}
              </a>
              <div className="contact-action-grid">
                <button className="btn small-btn" onClick={copy} aria-label="Copy email address">
                  <Icons.Copy /> {copied ? c.copied : c.copy}
                </button>
                <a
                  className="btn small-btn"
                  href="https://wa.me/50498622160"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <Icons.Whatsapp /> WhatsApp
                </a>
                <a className="btn small-btn" href="tel:+50498622160" aria-label="Call phone">
                  <Icons.Phone /> +504 9862-2160
                </a>
                <a
                  className="btn small-btn"
                  href="https://www.linkedin.com/in/allan-castro-1055b4150/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Icons.Linkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Root App ───────────────────────────────────────────────────────── */
export default function PortfolioApp() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('aha-lang') as Lang) || 'en';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('aha-theme') as Theme) || 'dark';
  });
  const [adminOpen, setAdminOpen] = useState(false);
  const eggTaps = useRef(0);
  const eggTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEasterEgg = () => {
    eggTaps.current += 1;
    if (eggTimer.current) clearTimeout(eggTimer.current);
    eggTimer.current = setTimeout(() => { eggTaps.current = 0; }, 1200);
    if (eggTaps.current >= 5) { eggTaps.current = 0; setAdminOpen(true); }
  };

  const c = CONTENT[lang];

  const NAV = [
    { id: 'about',      label: c.nav.about,      icon: <Icons.NavUser /> },
    { id: 'experience', label: c.nav.experience,  icon: <Icons.NavBriefcase /> },
    { id: 'services',   label: c.nav.services,    icon: <Icons.NavCode /> },
    { id: 'projects',   label: c.nav.projects,    icon: <Icons.NavGrid /> },
    { id: 'contact',    label: c.nav.contact,     icon: <Icons.NavMail /> },
  ];

  const SERVICE_ICONS: Record<string, React.ReactNode> = {
    whatsapp: <Icons.Bot />,
    n8n: <Icons.Workflow />,
    mobile: <Icons.MobilePhone />,
    backend: <Icons.Server />,
    frontend: <Icons.Layers />,
    growth: <Icons.TrendUp />,
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    localStorage.setItem('aha-theme', theme);
    localStorage.setItem('aha-lang', lang);
  }, [theme, lang]);

  useEffect(() => {
    /* ── Name entrance ─────────────────────────────── */
    gsap.from('.gsap-name-word', {
      y: 70,
      opacity: 0,
      duration: 0.9,
      stagger: 0.14,
      ease: 'power4.out',
      delay: 0.1,
      clearProps: 'all',
    });

    /* ── Role / tagline ────────────────────────────── */
    gsap.from(['.role', '.tagline', '.avail-badge'], {
      y: 18,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.45,
      clearProps: 'all',
    });

    /* ── Section headings line reveal ─────────────── */
    gsap.utils.toArray<HTMLElement>('.section h2').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    /* ── Experience cards stagger ─────────────────── */
    ScrollTrigger.batch('.exp-item', {
      onEnter: (els) => gsap.from(els, { y: 36, opacity: 0, stagger: 0.1, duration: 0.55, ease: 'power2.out', clearProps: 'all' }),
      start: 'top 88%',
      once: true,
    });

    /* ── Service cards stagger ────────────────────── */
    ScrollTrigger.batch('.service', {
      onEnter: (els) => gsap.from(els, { y: 28, opacity: 0, scale: 0.97, stagger: 0.07, duration: 0.5, ease: 'power2.out', clearProps: 'all' }),
      start: 'top 88%',
      once: true,
    });

    /* ── Project items stagger ────────────────────── */
    ScrollTrigger.batch('.project', {
      onEnter: (els) => gsap.from(els, { x: -24, opacity: 0, stagger: 0.09, duration: 0.5, ease: 'power2.out', clearProps: 'all' }),
      start: 'top 88%',
      once: true,
    });

    /* ── Contact stats counter ────────────────────── */
    ScrollTrigger.create({
      trigger: '.contact-card',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.cstat-v', { opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'back.out(1.7)', clearProps: 'all' });
        gsap.from('.contact-card', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
      },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      <Spotlight enabled={true} />
      <div className="bg-dots" aria-hidden="true" />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}

      {/* Mobile topbar — controls only */}
      <header className="topbar">
        <ThemeLangControls theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
        <a href="#contact" className="btn primary btn-sm">
          <Icons.Mail /> {c.rail.hire}
        </a>
      </header>

      {/* Mobile bottom nav */}
      <MobileNav items={NAV} />

      {/* Desktop floating controls */}
      <div className="floating-ctl">
        <ThemeLangControls theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
      </div>

      <div className="shell">
        {/* Left rail */}
        <aside className="rail" data-screen-label="rail">
          <h1 className="name" onClick={handleEasterEgg} style={{ cursor: 'default', userSelect: 'none' }}>
            <span className="gsap-name-word" style={{ display: 'inline-block' }}>Allan</span>
            {' '}
            <em className="gsap-name-word" style={{ display: 'inline-block' }}>Aceituno</em>
          </h1>
          <p className="role">{c.rail.role}</p>
          <p className="tagline">{c.rail.tagline}</p>
          <div className="avail-badge">
            <span className="avail-dot" />
            {lang === 'en' ? 'Open to work' : 'Disponible'}
          </div>

          <div className="socials">
            <a href="https://github.com/allan021" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icons.Github />
            </a>
            <a href="https://www.linkedin.com/in/allan-castro-1055b4150/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icons.Linkedin />
            </a>
            <a href="https://codepen.io/Allan-Aceituno" target="_blank" rel="noreferrer" aria-label="CodePen">
              <Icons.Codepen />
            </a>
            <a href="mailto:allan.aceituno20@gmail.com" aria-label="Email">
              <Icons.Mail />
            </a>
            <a href="https://wa.me/50498622160" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Icons.Whatsapp />
            </a>
          </div>

          <SideNav items={NAV} />
        </aside>

        {/* Right main content */}
        <main className="main" id="main-content">
          {/* About */}
          <section id="about" className="section" data-screen-label="about">
            <Reveal>
              <h2>{c.about.heading}</h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="about-card">
                <div className="about-prose">
                  {c.about.paras.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  <div className="kv-row">
                    <span><span className="key">/loc</span> {c.about.pkv.loc}</span>
                    <span><span className="key">/now</span> {c.about.pkv.now}</span>
                    <span><span className="key">/tz</span> {c.about.pkv.tz}</span>
                  </div>
                </div>
                <div className="avatar-wrap">
                  <div className="avatar">
                    <img src="/allan.jpeg" alt="Allan Aceituno" width={160} height={213} loading="eager" />
                    <div className="avatar-tag">
                      <span>{c.about.tag1}</span>
                      <span>★</span>
                    </div>
                  </div>
                  <div className="avatar-badge">HN</div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Experience */}
          <section id="experience" className="section" data-screen-label="experience">
            <Reveal>
              <h2>{c.nav.experience}</h2>
            </Reveal>
            <div className="exp-list">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={Math.min(i + 1, 4) as 0 | 1 | 2 | 3 | 4}>
                  <div className="exp-item">
                    <div className="exp-period">{pick(e.period, lang)}</div>
                    <div>
                      {e.href ? (
                        <a className="exp-role" href={e.href} target="_blank" rel="noreferrer">
                          {pick(e.role, lang)} · {e.company}
                          <span className="exp-arrow"><Icons.Arrow size={14} /></span>
                        </a>
                      ) : (
                        <div className="exp-role">
                          {pick(e.role, lang)} · {e.company}
                        </div>
                      )}
                      <div className="exp-company">{pick(e.location, lang)}</div>
                      <p className="exp-desc">{pick(e.desc, lang)}</p>
                      <div className="tags">
                        {e.tags.map((tg) => (
                          <span key={tg} className="tag">{tg}</span>
                        ))}
                      </div>
                      {e.links && e.links.length > 0 && (
                        <div className="exp-links">
                          {e.links.map((l) => (
                            <a key={l.href} className="exp-link" href={l.href} target="_blank" rel="noreferrer">
                              <Icons.Arrow size={11} /> {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA after experience */}
          <Reveal>
            <div className="cta-banner">
              <p>{lang === 'en'
                ? <>Looking for a <strong>fullstack developer</strong> who delivers end-to-end? Let's talk.</>
                : <>¿Buscas un <strong>desarrollador fullstack</strong> que entrega de punta a punta? Hablemos.</>}
              </p>
              <a href="#contact" className="btn primary btn-sm" style={{ flexShrink: 0 }}>
                {lang === 'en' ? 'Work with me' : 'Trabajemos juntos'} <Icons.Arrow size={13} />
              </a>
            </div>
          </Reveal>

          {/* Services */}
          <section id="services" className="section" data-screen-label="services">
            <Reveal>
              <h2>{c.services.heading}</h2>
            </Reveal>
            <div className="services">
              {c.services.items.map((s, i) => (
                <Reveal key={s.key} delay={Math.min(i + 1, 4) as 0 | 1 | 2 | 3 | 4}>
                  <div className="service">
                    <div className="ico">{SERVICE_ICONS[s.key]}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="stack">{s.stack}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          <Projects
            lang={lang}
            heading={c.projectsHeading}
            addLabel={c.addProject}
            toasts={c.toasts}
            modal={c.modal}
          />

          {/* Contact */}
          <Contact lang={lang} />

          {/* Social Rail */}
          <Reveal>
            <div className="social-rail" data-screen-label="socials">
              <div className="social-rail-head">{c.socialsHeading}</div>
              <div className="social-rail-icons">
                {[
                  { href: 'https://github.com/allan021', label: 'GitHub', icon: <Icons.Github /> },
                  { href: 'https://www.linkedin.com/in/allan-castro-1055b4150/', label: 'LinkedIn', icon: <Icons.Linkedin /> },
                  { href: 'https://codepen.io/Allan-Aceituno', label: 'CodePen', icon: <Icons.Codepen /> },
                  { href: 'https://wa.me/50498622160', label: 'WhatsApp', icon: <Icons.Whatsapp /> },
                  { href: 'mailto:allan.aceituno20@gmail.com', label: 'Email', icon: <Icons.Mail /> },
                ].map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    target={it.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={it.label}
                    className="social-chip"
                  >
                    {it.icon}
                    <span className="social-chip-tip">{it.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="footer">{c.rail.footer}</div>
        </main>
      </div>
    </>
  );
}
