import { useState, useEffect } from "react";

const P = {
  bg: "radial-gradient(ellipse at 40% 30%, #EDE0D0 0%, #F0E6D8 30%, #F5EEE5 65%, #FAF7F2 100%)",
  textSoft: "#6B5A42",
  accentSoft: "#D9A882",
  cardBg: "rgba(255,252,248,0.72)",
  border: "rgba(180,145,105,0.28)",
  borderStrong: "rgba(140,100,60,0.45)",
  ink: "#3A2A18",
};

const BG_THEMES = [
  { name: "Rosa",   grad: "radial-gradient(ellipse at 50% 40%, #E8A898 0%, #EDBBAF 25%, #F2CFC7 55%, #F5E0DC 100%)", ink: "#4A2820" },
  { name: "Crema",  grad: "radial-gradient(ellipse at 40% 30%, #EDE0D0 0%, #F0E6D8 30%, #F5EEE5 65%, #FAF7F2 100%)", ink: "#3A2C1E" },
  { name: "Sage",   grad: "radial-gradient(ellipse at 60% 40%, #B8C9A8 0%, #C8D5BA 30%, #D8E2CC 60%, #E8EDDF 100%)", ink: "#1E3020" },
  { name: "Lino",   grad: "radial-gradient(ellipse at 50% 55%, #E8DDD0 0%, #EDE4D8 30%, #F2EBE0 60%, #F8F4EE 100%)", ink: "#3A2C1E" },
  { name: "Niebla", grad: "radial-gradient(ellipse at 30% 60%, #C0C0D8 0%, #CCCCE0 25%, #D8D8E8 55%, #E8E8F0 100%)", ink: "#252535" },
  { name: "Malva",  grad: "radial-gradient(ellipse at 50% 50%, #C898B8 0%, #D0A8C5 25%, #DBBDD0 55%, #E8D0DE 100%)", ink: "#3A1830" },
  { name: "Índigo", grad: "radial-gradient(ellipse at 40% 50%, #8888B8 0%, #9898C5 25%, #AAAAD0 55%, #C0C0DE 100%)", ink: "#15153A" },
];

const FONTS = [
  { name: "Playfair", value: "'Playfair Display', serif" },
  { name: "Lora",     value: "'Lora', serif" },
  { name: "DM Sans",  value: "'DM Sans', sans-serif" },
  { name: "Fraunces", value: "'Fraunces', serif" },
];

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=DM+Sans:opsz,wght@9..40,300..700&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Lora:ital,wght@0,400..600;1,400..600&display=swap";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

function Grain({ opacity = 0.35 }) {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none",
      opacity, backgroundImage: GRAIN_SVG,
      backgroundSize: "160px 160px", zIndex: 0,
    }} />
  );
}

// ── Bienvenida ────────────────────────────────────────────────────────────────
function PantallaBienvenida({ accent, fontDisplay, fontUI, bgGrad, onContinuar }) {
  const [nombre, setNombre] = useState("");
  const [step, setStep] = useState(0);

  return (
    <div style={{
      minHeight: "100vh", background: bgGrad, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "52px 32px 40px", fontFamily: fontUI,
    }}>
      <Grain opacity={0.35} />
      <div style={{ width: "100%", maxWidth: 360, position: "relative", zIndex: 1 }}>
        {step === 0 && (
          <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease" }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
              color: accent, opacity: 0.75, marginBottom: 10,
            }}>bienvenida</div>
            <h1 style={{
              fontFamily: fontDisplay, fontSize: 38, fontWeight: 400,
              margin: "0 0 14px", letterSpacing: -0.8, lineHeight: 1.05, color: P.ink,
            }}>
              Un lugar calmo<br/><em>para tu día</em>
            </h1>
            <p style={{
              fontSize: 14.5, color: P.textSoft, lineHeight: 1.55,
              maxWidth: 280, margin: "0 auto 36px",
            }}>
              Organiza tus tareas, hábitos y pequeños rituales sin que se sientan como una carga.
            </p>
            <button onClick={() => setStep(1)} style={{
              padding: "14px 36px", borderRadius: 30,
              background: accent, color: "white", border: "none",
              fontFamily: fontUI, fontSize: 14, fontWeight: 500,
              cursor: "pointer", boxShadow: `0 4px 20px ${accent}55`,
            }}>Empezar →</button>
          </div>
        )}
        {step === 1 && (
          <div style={{ width: "100%", animation: "fadeUp 0.5s ease" }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              letterSpacing: 2.5, textTransform: "uppercase",
              color: accent, opacity: 0.75, marginBottom: 8, textAlign: "center",
            }}>paso 1 de 1</div>
            <h2 style={{
              fontFamily: fontDisplay, fontSize: 28, fontWeight: 400,
              margin: "0 0 24px", textAlign: "center", color: P.ink, letterSpacing: -0.4,
            }}>¿Cómo te llamas?</h2>
            <input
              autoFocus value={nombre}
              onChange={e => setNombre(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && nombre.trim()) onContinuar(nombre.trim()); }}
              placeholder="Tu nombre"
              style={{
                width: "100%", padding: "14px 18px", fontSize: 16,
                fontFamily: fontDisplay, background: P.cardBg,
                border: `1.5px solid ${P.border}`, borderRadius: 14,
                color: P.ink, outline: "none", textAlign: "center",
                backdropFilter: "blur(12px)", marginBottom: 14, boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => nombre.trim() && onContinuar(nombre.trim())}
              disabled={!nombre.trim()}
              style={{
                width: "100%", padding: "14px", borderRadius: 14,
                background: nombre.trim() ? accent : P.border,
                color: "white", border: "none",
                fontFamily: fontUI, fontSize: 14.5, fontWeight: 500,
                cursor: nombre.trim() ? "pointer" : "not-allowed",
                opacity: nombre.trim() ? 1 : 0.6, transition: "all 0.25s",
              }}>Continuar</button>
            <button onClick={() => setStep(0)} style={{
              width: "100%", marginTop: 10, padding: 8,
              background: "transparent", border: "none",
              color: P.textSoft, opacity: 0.6,
              fontFamily: fontUI, fontSize: 12, cursor: "pointer",
            }}>← atrás</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Agregar tarea ─────────────────────────────────────────────────────────────
function PantallaAgregar({ accent, fontDisplay, fontUI, bgGrad, onGuardar, onCerrar }) {
  const [texto, setTexto] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [fecha, setFecha] = useState("hoy");
  const [categoria, setCategoria] = useState("personal");
  const [hora, setHora] = useState("");
  const [recurrencia, setRecurrencia] = useState("nunca");
  const [subs, setSubs] = useState([]);
  const [nuevaSub, setNuevaSub] = useState("");

  const Pill = ({ active, onClick, children, color }) => (
    <button onClick={onClick} style={{
      padding: "6px 12px", borderRadius: 20,
      border: `1px solid ${active ? (color || accent) : P.border}`,
      background: active ? (color || accent) : "transparent",
      color: active ? "white" : P.ink,
      fontFamily: fontUI, fontSize: 12, cursor: "pointer",
      fontWeight: active ? 500 : 400, transition: "all 0.15s",
    }}>{children}</button>
  );

  const Row = ({ label, children }) => (
    <div style={{
      padding: "14px 0", borderBottom: `1px solid ${P.border}`,
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{ fontSize: 12.5, color: P.textSoft, minWidth: 90, fontWeight: 500 }}>{label}</div>
      <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {children}
      </div>
    </div>
  );

  const guardar = () => {
    if (!texto.trim()) return;
    onGuardar({ texto, prioridad, fecha, categoria, hora: hora || null, recurrencia, subs });
  };

  return (
    <div style={{ minHeight: "100vh", background: bgGrad, position: "relative", fontFamily: fontUI }}>
      <Grain opacity={0.35} />
      <div style={{ position: "relative", zIndex: 1, padding: "66px 22px 90px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <button onClick={onCerrar} style={{
            background: "transparent", border: "none", color: P.textSoft,
            fontFamily: fontUI, fontSize: 13, cursor: "pointer", padding: 0,
          }}>Cancelar</button>
          <button onClick={guardar} disabled={!texto.trim()} style={{
            background: "transparent", border: "none",
            color: texto.trim() ? accent : P.textSoft,
            opacity: texto.trim() ? 1 : 0.4,
            fontFamily: fontUI, fontSize: 13, fontWeight: 600,
            cursor: texto.trim() ? "pointer" : "not-allowed", padding: 0,
          }}>Guardar</button>
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: 2.5, textTransform: "uppercase",
          color: accent, opacity: 0.75, marginBottom: 8,
        }}>nueva tarea</div>
        <input
          autoFocus value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") guardar(); }}
          placeholder="¿Qué quieres hacer?"
          style={{
            width: "100%", background: "transparent", border: "none",
            fontFamily: fontDisplay, fontSize: 26, fontWeight: 400,
            color: P.ink, outline: "none", marginBottom: 8,
            letterSpacing: -0.3, padding: 0,
          }}
        />
        <div>
          <Row label="Prioridad">
            <Pill active={prioridad === "alta"} onClick={() => setPrioridad("alta")} color="#9A4A4A">● Alta</Pill>
            <Pill active={prioridad === "media"} onClick={() => setPrioridad("media")}>● Media</Pill>
            <Pill active={prioridad === "baja"} onClick={() => setPrioridad("baja")}>● Baja</Pill>
          </Row>
          <Row label="Cuándo">
            <Pill active={fecha === "hoy"} onClick={() => setFecha("hoy")}>Hoy</Pill>
            <Pill active={fecha === "mañana"} onClick={() => setFecha("mañana")}>Mañana</Pill>
            <Pill active={fecha === "semana"} onClick={() => setFecha("semana")}>Esta semana</Pill>
          </Row>
          <Row label="Hora">
            <input value={hora} onChange={e => setHora(e.target.value)}
              placeholder="opcional · 14:30"
              style={{
                padding: "6px 12px", borderRadius: 20,
                border: `1px solid ${P.border}`, background: "transparent",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
                color: P.ink, outline: "none", textAlign: "right", width: 130,
              }}/>
          </Row>
          <Row label="Categoría">
            <Pill active={categoria === "trabajo"} onClick={() => setCategoria("trabajo")}>✎ Trabajo</Pill>
            <Pill active={categoria === "personal"} onClick={() => setCategoria("personal")}>◉ Personal</Pill>
            <Pill active={categoria === "salud"} onClick={() => setCategoria("salud")}>✿ Salud</Pill>
          </Row>
          <Row label="Repetir">
            <Pill active={recurrencia === "nunca"} onClick={() => setRecurrencia("nunca")}>Nunca</Pill>
            <Pill active={recurrencia === "diario"} onClick={() => setRecurrencia("diario")}>Diario</Pill>
            <Pill active={recurrencia === "semanal"} onClick={() => setRecurrencia("semanal")}>Semanal</Pill>
          </Row>
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12.5, color: P.textSoft, marginBottom: 10, fontWeight: 500 }}>Subtareas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {subs.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: accent, opacity: 0.5 }}>—</span>
                <span style={{ flex: 1, fontSize: 14, color: P.ink }}>{s}</span>
                <button onClick={() => setSubs(subs.filter((_, k) => k !== i))} style={{
                  background: "transparent", border: "none", color: P.textSoft,
                  opacity: 0.4, fontSize: 18, cursor: "pointer", padding: 0,
                }}>×</button>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: P.textSoft, opacity: 0.4 }}>—</span>
              <input value={nuevaSub} onChange={e => setNuevaSub(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && nuevaSub.trim()) {
                    setSubs([...subs, nuevaSub.trim()]); setNuevaSub("");
                  }
                }}
                placeholder="agregar subtarea..."
                style={{
                  flex: 1, background: "transparent", border: "none",
                  fontFamily: fontUI, fontSize: 14, color: P.ink,
                  outline: "none", fontStyle: "italic",
                }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Detalle de tarea ──────────────────────────────────────────────────────────
function PantallaDetalle({ accent, fontDisplay, fontUI, bgGrad, tarea, onCerrar, onToggle, onToggleSub, onEliminar }) {
  if (!tarea) return null;
  return (
    <div style={{ minHeight: "100vh", background: bgGrad, position: "relative", fontFamily: fontUI }}>
      <Grain opacity={0.35} />
      <div style={{ position: "relative", zIndex: 1, padding: "66px 22px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
          <button onClick={onCerrar} style={{
            width: 36, height: 36, borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            color: P.ink, cursor: "pointer", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(12px)", padding: 0,
          }}>←</button>
          <button onClick={onEliminar} style={{
            background: "transparent", border: "none", color: P.textSoft,
            fontFamily: fontUI, fontSize: 13, cursor: "pointer", padding: "8px 0",
          }}>Eliminar</button>
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: 2.5, textTransform: "uppercase",
          color: accent, opacity: 0.75, marginBottom: 8,
        }}>{tarea.categoria || "personal"} · {tarea.fecha || "hoy"}</div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
          <button onClick={onToggle} style={{
            width: 28, height: 28, borderRadius: 6,
            border: `1.5px solid ${tarea.done ? accent : P.borderStrong}`,
            background: tarea.done ? accent : "transparent",
            cursor: "pointer", flexShrink: 0, marginTop: 10,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
          }}>
            {tarea.done && <svg width="14" height="14" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
          </button>
          <h1 style={{
            fontFamily: fontDisplay, fontSize: 30, fontWeight: 400,
            margin: 0, letterSpacing: -0.4, lineHeight: 1.15, color: P.ink, flex: 1,
            textDecoration: tarea.done ? "line-through" : "none",
            textDecorationColor: accent, textDecorationThickness: "1.5px",
            opacity: tarea.done ? 0.55 : 1,
          }}>{tarea.texto}</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          <span style={{
            padding: "5px 12px", borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            fontSize: 11.5, color: P.ink,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 10, background: accent, display: "inline-block" }}/>
            {tarea.priority || "media"}
          </span>
          {tarea.hora && <span style={{
            padding: "5px 12px", borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            fontSize: 11.5, color: P.ink, fontFamily: "'IBM Plex Mono', monospace",
          }}>◷ {tarea.hora}</span>}
          {tarea.recurrencia && tarea.recurrencia !== "nunca" && <span style={{
            padding: "5px 12px", borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            fontSize: 11.5, color: P.ink,
          }}>↻ {tarea.recurrencia}</span>}
        </div>
        {(tarea.subs || []).length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
              letterSpacing: 2, textTransform: "uppercase",
              color: P.textSoft, opacity: 0.7, marginBottom: 12, fontWeight: 500,
            }}>Subtareas · {(tarea.subs || []).filter(s => s.done).length}/{(tarea.subs || []).length}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(tarea.subs || []).map(s => (
                <div key={s.id} onClick={() => onToggleSub(s.id)} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 0", borderBottom: `1px solid ${P.border}`, cursor: "pointer",
                }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: `1.5px solid ${s.done ? accent : P.borderStrong}`,
                    background: s.done ? accent : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {s.done && <svg width="10" height="10" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                  </span>
                  <span style={{
                    flex: 1, fontSize: 14, color: P.ink,
                    textDecoration: s.done ? "line-through" : "none",
                    opacity: s.done ? 0.55 : 1,
                  }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{
          marginTop: 28, padding: "16px 18px",
          background: P.cardBg, borderRadius: 14,
          border: `1px solid ${P.border}`, backdropFilter: "blur(12px)",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: 2, textTransform: "uppercase",
            color: P.textSoft, opacity: 0.7, marginBottom: 8, fontWeight: 500,
          }}>Notas</div>
          <div style={{
            fontFamily: fontDisplay, fontStyle: "italic",
            fontSize: 14, color: P.textSoft, opacity: 0.7, lineHeight: 1.5,
          }}>Toca para agregar una nota o reflexión...</div>
        </div>
      </div>
    </div>
  );
}

// ── Hábitos ───────────────────────────────────────────────────────────────────
function PantallaHabitos({ accent, fontDisplay, fontUI, bgGrad, tareas, onCerrar }) {
  const habitos = tareas.filter(t => t.habit);
  return (
    <div style={{ minHeight: "100vh", background: bgGrad, position: "relative", fontFamily: fontUI }}>
      <Grain opacity={0.35} />
      <div style={{ position: "relative", zIndex: 1, padding: "66px 22px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <button onClick={onCerrar} style={{
            width: 36, height: 36, borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            color: P.ink, cursor: "pointer", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(12px)", padding: 0,
          }}>←</button>
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
          letterSpacing: 2.5, textTransform: "uppercase",
          color: accent, opacity: 0.75, marginBottom: 6,
        }}>tus rituales</div>
        <h1 style={{
          fontFamily: fontDisplay, fontSize: 34, fontWeight: 400,
          margin: "0 0 22px", letterSpacing: -0.5, color: P.ink,
        }}>Hábitos</h1>
        {habitos.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            color: P.textSoft, fontSize: 14, opacity: 0.5, fontStyle: "italic",
          }}>
            Todavía no tienes hábitos.<br/>Agrega una tarea y márcala como hábito.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {habitos.map(h => (
              <div key={h.id} style={{
                padding: "18px 20px", background: P.cardBg, borderRadius: 14,
                border: `1px solid ${P.border}`, backdropFilter: "blur(12px)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 500, color: P.ink }}>{h.texto}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: accent, fontWeight: 600 }}>
                    🔥 {h.streak || 0}d
                  </div>
                </div>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 6, marginBottom: 10, justifyItems: "center",
                }}>
                  {(h.history || Array(28).fill(0)).slice(-28).map((d, i) => (
                    <div key={i} style={{
                      width: 12, height: 12, borderRadius: 10,
                      background: d ? accent : P.border,
                      opacity: d ? (0.4 + (i / 28) * 0.6) : 0.5,
                    }}/>
                  ))}
                </div>
                <div style={{
                  display: "flex", gap: 14, fontSize: 11, color: P.textSoft, opacity: 0.7,
                  fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.3,
                }}>
                  <span>mejor racha · {h.bestStreak || 0}d</span>
                  <span>· 28 días</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button style={{
          marginTop: 18, width: "100%", padding: "14px", borderRadius: 14,
          background: "transparent", border: `1.5px dashed ${P.borderStrong}`,
          color: P.textSoft, fontFamily: fontUI, fontSize: 13,
          cursor: "pointer", opacity: 0.7,
        }}>+ Nuevo hábito</button>
      </div>
    </div>
  );
}

// ── Galería de fondos ─────────────────────────────────────────────────────────
function GaleriaFondos({ accent, fontDisplay, fontUI, bgGrad, bgIndex, onSelect, onBack }) {
  const [cat, setCat] = useState("Populares");
  const CATS = ["Populares", "Cálidos", "Fríos", "Neutros"];
  return (
    <div style={{ minHeight: "100vh", background: bgGrad, position: "relative", fontFamily: fontUI }}>
      <Grain opacity={0.35} />
      <div style={{ position: "relative", zIndex: 1, padding: "66px 22px 60px" }}>
        <div style={{ marginBottom: 8 }}>
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: 20,
            background: P.cardBg, border: `1px solid ${P.border}`,
            color: P.ink, cursor: "pointer", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(12px)", padding: 0,
          }}>←</button>
        </div>
        <div style={{ textAlign: "center", margin: "8px 0 18px" }}>
          <h1 style={{
            fontFamily: fontDisplay, fontSize: 32, fontWeight: 500,
            color: P.ink, margin: 0, letterSpacing: -0.5,
          }}>Fondos</h1>
          <p style={{ fontFamily: fontUI, fontSize: 12, color: P.textSoft, opacity: 0.7, margin: "4px 0 0" }}>
            Elige la atmósfera del día
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 20 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "4px 2px", background: "transparent", border: "none",
              cursor: "pointer", fontFamily: fontUI, fontSize: 13,
              fontWeight: cat === c ? 600 : 400,
              color: cat === c ? P.ink : P.textSoft,
              opacity: cat === c ? 1 : 0.55,
              borderBottom: cat === c ? `1.5px solid ${accent}` : "1.5px solid transparent",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 14, rowGap: 18 }}>
          {BG_THEMES.map((b, i) => {
            const isSelected = i === bgIndex;
            return (
              <div key={b.name} onClick={() => onSelect(i)} style={{
                marginTop: i % 2 === 1 ? 22 : 0,
                cursor: "pointer", transition: "transform 0.25s ease",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
              }}>
                <div style={{
                  position: "relative", aspectRatio: "3/4.2", width: "100%",
                  borderRadius: "50% / 30%", overflow: "hidden", background: b.grad,
                  border: isSelected ? `2.5px solid ${accent}` : "2.5px solid transparent",
                  boxShadow: isSelected ? "0 10px 28px rgba(60,40,20,0.18)" : "0 4px 16px rgba(60,40,20,0.10)",
                }}>
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    opacity: 0.42, backgroundImage: GRAIN_SVG, backgroundSize: "110px 110px",
                  }}/>
                  {isSelected && (
                    <div style={{
                      position: "absolute", top: 14, right: 18,
                      width: 24, height: 24, borderRadius: 20,
                      background: accent, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <div style={{
                    position: "absolute", left: "50%", bottom: 18,
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)",
                    padding: "4px 12px", borderRadius: 20, fontFamily: fontUI,
                    fontSize: 11, fontWeight: 500, color: b.ink,
                    letterSpacing: 0.3, border: "1px solid rgba(255,255,255,0.4)",
                    whiteSpace: "nowrap",
                  }}>{b.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
function PantallaHome({ accent, fontDisplay, fontUI, bgGrad, nombre, tareas, setTareas, fontIndex, setFontIndex, onAbrirFondos, onAbrirHabitos, onAbrirAgregar, onAbrirDetalle, onEditarNombre }) {
  const [filter, setFilter] = useState("hoy");
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
  const hoy = new Date();
  const diasSemana = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const fechaLabel = `${diasSemana[hoy.getDay()]} · ${hoy.getDate()} ${meses[hoy.getMonth()]}`.toUpperCase();

  const filtradas = tareas.filter(t => {
    if (filter === "hábitos") return t.habit;
    if (filter === "semana") return t.fecha === "hoy" || t.fecha === "semana" || t.fecha === "mañana";
    if (filter === "todas") return true;
    return t.fecha === "hoy" || !t.fecha;
  });

  const completadas = filtradas.filter(t => t.done).length;
  const total = filtradas.length;
  const pct = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const circum = 2 * Math.PI * 17;

  const toggle = (id) => setTareas(tareas.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const toggleSub = (tid, sid) => setTareas(tareas.map(t =>
    t.id === tid ? { ...t, subs: (t.subs || []).map(s => s.id === sid ? { ...s, done: !s.done } : s) } : t
  ));
  const agregarRapido = () => {
    if (!nuevaTarea.trim()) return;
    setTareas([...tareas, {
      id: Date.now(), texto: nuevaTarea.trim(), done: false,
      priority: "media", fecha: "hoy", hora: null, categoria: "personal",
      recurrencia: "nunca", habit: false, streak: 0, bestStreak: 0,
      history: Array(28).fill(0), subs: [],
    }]);
    setNuevaTarea("");
  };

  const dotColor = (p) => p === "alta" ? "#9A4A4A" : p === "media" ? P.accentSoft : "rgba(120,100,80,0.3)";

  return (
    <div style={{
      minHeight: "100vh", background: bgGrad, position: "relative", fontFamily: fontUI,
      opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <Grain opacity={0.35} />
      <div style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: 2.5, textTransform: "uppercase",
            color: accent, opacity: 0.75, marginBottom: 6,
          }}>{fechaLabel}</div>
          <h1 style={{
            fontFamily: fontDisplay, fontSize: 34, fontWeight: 400,
            lineHeight: 1.05, margin: 0, letterSpacing: -0.5, color: P.ink,
          }}>
            {saludo},<br/>
            <em style={{ fontWeight: 400, color: accent }}>{nombre}</em>
            {" "}<button
              onClick={onEditarNombre}
              title="Cambiar nombre"
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, opacity: 0.3, padding: "2px 4px", borderRadius: 6,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.3}
            >✏️</button>
          </h1>
          <p style={{ fontSize: 14, color: P.textSoft, margin: "10px 0 0", opacity: 0.85 }}>
            {total === 0
              ? "Estas son tus tareas de hoy"
              : completadas === total
              ? "✨ Todo listo por hoy"
              : `${total - completadas} cosas por delante. Un paso a la vez.`}
          </p>
        </div>

        {/* Anillo de progreso */}
        {total > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 16px", marginBottom: 20,
            background: P.cardBg, borderRadius: 14,
            border: `1px solid ${P.border}`, backdropFilter: "blur(14px)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 14px rgba(120,80,40,0.06)",
          }}>
            <svg width="42" height="42" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="17" fill="none" stroke={P.border} strokeWidth="3"/>
              <circle cx="21" cy="21" r="17" fill="none" stroke={accent} strokeWidth="3"
                strokeDasharray={`${circum * pct / 100} ${circum}`} strokeLinecap="round"
                transform="rotate(-90 21 21)" style={{ transition: "stroke-dasharray 0.4s ease" }}/>
              <text x="21" y="25" textAnchor="middle" fontSize="11"
                fontFamily="'DM Sans', sans-serif" fontWeight="600" fill={P.ink}>{pct}%</text>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: P.ink }}>
                {completadas} de {total} completada{total !== 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: 12, color: P.textSoft, opacity: 0.7, marginTop: 2 }}>
                {pct >= 100 ? "¡Increíble, todo listo! 🎉" : "Sigue así, vas bien ✿"}
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div style={{ display: "flex", marginBottom: 20, borderBottom: `1px solid ${P.border}` }}>
          {["hoy", "semana", "todas", "hábitos"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 0", marginRight: 20,
              background: "transparent", border: "none",
              fontFamily: fontUI, fontSize: 13,
              fontWeight: filter === f ? 600 : 400,
              color: filter === f ? accent : P.textSoft,
              opacity: filter === f ? 1 : 0.65,
              cursor: "pointer",
              borderBottom: filter === f ? `2px solid ${accent}` : "2px solid transparent",
              marginBottom: -1, textTransform: "capitalize",
            }}>{f}</button>
          ))}
        </div>

        {/* Lista de tareas */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtradas.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "28px 20px",
              color: P.textSoft, fontSize: 14, fontStyle: "italic", opacity: 0.4,
            }}>
              {filter === "hábitos" ? "No tienes hábitos todavía" : "No hay tareas aquí"}
            </div>
          ) : filtradas.map(t => (
            <div key={t.id} style={{
              padding: "14px 4px", borderBottom: `1px solid ${P.border}`,
              opacity: t.done ? 0.55 : 1, transition: "opacity 0.25s",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <button onClick={() => toggle(t.id)} style={{
                  width: 20, height: 20, borderRadius: t.habit ? 10 : 5,
                  border: `1.5px solid ${t.done ? accent : P.borderStrong}`,
                  background: t.done ? accent : "transparent",
                  cursor: "pointer", flexShrink: 0, marginTop: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 0, transition: "all 0.2s",
                }}>
                  {t.done && <svg width="11" height="11" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
                </button>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => onAbrirDetalle(t)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 10, background: dotColor(t.priority), flexShrink: 0, display: "inline-block" }}/>
                    <span style={{
                      fontSize: 15, fontWeight: 400, color: P.ink,
                      textDecoration: t.done ? "line-through" : "none",
                      textDecorationColor: accent, textDecorationThickness: "1px",
                    }}>{t.texto}</span>
                    {t.habit && <span style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                      letterSpacing: 1.2, textTransform: "uppercase",
                      color: P.textSoft, opacity: 0.6,
                      padding: "2px 6px", border: `1px solid ${P.border}`, borderRadius: 4,
                    }}>hábito</span>}
                  </div>
                  {t.hora && <div style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                    color: P.textSoft, opacity: 0.6, marginTop: 4, marginLeft: 14,
                  }}>{t.hora}</div>}
                  {(t.subs || []).length > 0 && (
                    <div style={{ marginTop: 8, marginLeft: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                      {(t.subs || []).map(s => (
                        <div key={s.id} onClick={e => { e.stopPropagation(); toggleSub(t.id, s.id); }}
                          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                          <span style={{ color: accent, opacity: 0.5, fontSize: 12 }}>—</span>
                          <span style={{
                            fontSize: 13, color: P.textSoft,
                            textDecoration: s.done ? "line-through" : "none",
                            opacity: s.done ? 0.5 : 0.9,
                          }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setTareas(tareas.filter(x => x.id !== t.id))} style={{
                  background: "none", border: "none", color: P.textSoft,
                  opacity: 0.2, cursor: "pointer", fontSize: 18,
                  padding: "0 2px", lineHeight: 1, flexShrink: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 0.6}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.2}
                >×</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add row */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <input
            value={nuevaTarea}
            onChange={e => setNuevaTarea(e.target.value)}
            onKeyDown={e => e.key === "Enter" && agregarRapido()}
            placeholder="Agregar una tarea nueva..."
            style={{
              flex: 1, padding: "12px 16px", fontSize: 14,
              fontFamily: fontUI, background: P.cardBg,
              border: `1px dashed ${P.borderStrong}`,
              borderRadius: 14, color: P.ink, outline: "none",
              backdropFilter: "blur(14px)", fontStyle: "italic",
            }}
            onFocus={e => { e.target.style.borderColor = accent; e.target.style.fontStyle = "normal"; }}
            onBlur={e => { e.target.style.borderColor = P.borderStrong; if (!nuevaTarea) e.target.style.fontStyle = "italic"; }}
          />
          <button onClick={onAbrirAgregar} style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            background: accent, color: "white", border: "none",
            fontSize: 22, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 14px ${accent}44`,
          }}>+</button>
        </div>

        {/* Bottom controls */}
        <div style={{ marginTop: 32, paddingTop: 22, borderTop: `1px solid ${P.border}` }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
            letterSpacing: 2.5, textTransform: "uppercase",
            color: accent, opacity: 0.75, marginBottom: 12, fontWeight: 500,
          }}>Tipografía</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {FONTS.map((f, i) => {
              const active = i === fontIndex;
              return (
                <button key={f.name} onClick={() => setFontIndex(i)} style={{
                  padding: "7px 16px", borderRadius: 22,
                  border: `1.5px solid ${active ? accent : P.border}`,
                  background: active ? accent : "transparent",
                  color: active ? "white" : P.ink,
                  fontFamily: f.value, fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  cursor: "pointer", opacity: active ? 1 : 0.7,
                  transition: "all 0.2s",
                }}>{f.name}</button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={onAbrirFondos} style={{
              padding: "12px 22px", borderRadius: 80,
              background: P.cardBg, border: `1.5px solid ${P.border}`,
              color: P.ink, fontFamily: fontUI, fontSize: 13.5,
              cursor: "pointer", backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
            }}>🎨 Fondos</button>
            <button onClick={onAbrirHabitos} style={{
              padding: "12px 22px", borderRadius: 80,
              background: P.cardBg, border: `1.5px solid ${P.border}`,
              color: P.ink, fontFamily: fontUI, fontSize: 13.5,
              cursor: "pointer", backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
            }}>✿ Hábitos</button>
            <button disabled title="Próximamente" style={{
              padding: "12px 22px", borderRadius: 80,
              background: P.cardBg, border: `1.5px solid ${P.border}`,
              color: P.ink, fontFamily: fontUI, fontSize: 13.5,
              cursor: "not-allowed", opacity: 0.4, backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
            }}>🌸 Museo de flores</button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [pantalla, setPantalla] = useState("home");
  const [nombre, setNombre] = useState(() => localStorage.getItem("nombre") || "");
  const [tareas, setTareas] = useState(() => {
    try {
      const raw = localStorage.getItem("tareas");
      if (!raw) return [];
      return JSON.parse(raw).map(t => ({
        id: t.id || Date.now(),
        texto: t.texto || "",
        done: t.done ?? t.completada ?? false,
        priority: t.priority || "media",
        fecha: t.fecha || "hoy",
        hora: t.hora || null,
        categoria: t.categoria || null,
        recurrencia: t.recurrencia || "nunca",
        habit: t.habit || false,
        streak: t.streak || 0,
        bestStreak: t.bestStreak || 0,
        history: t.history || Array(28).fill(0),
        subs: t.subs || [],
      }));
    } catch { return []; }
  });
  const [fontIndex, setFontIndex] = useState(() => parseInt(localStorage.getItem("fontIndex") || "1", 10));
  const [bgIndex, setBgIndex] = useState(() => parseInt(localStorage.getItem("bgIndex") || "1", 10));
  const [accent] = useState(() => localStorage.getItem("accent") || "#3A2A1C");
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState(false);

  useEffect(() => { localStorage.setItem("tareas", JSON.stringify(tareas)); }, [tareas]);
  useEffect(() => { localStorage.setItem("nombre", nombre); }, [nombre]);
  useEffect(() => { localStorage.setItem("fontIndex", fontIndex); }, [fontIndex]);
  useEffect(() => { localStorage.setItem("bgIndex", bgIndex); }, [bgIndex]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      body { margin: 0; padding: 0; }
      * { box-sizing: border-box; }
      input::placeholder { opacity: 0.4; }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const bgGrad = BG_THEMES[bgIndex]?.grad || BG_THEMES[1].grad;
  const fontDisplay = FONTS[fontIndex]?.value || FONTS[1].value;
  const fontUI = "'DM Sans', system-ui, sans-serif";
  const tokens = { accent, fontDisplay, fontUI, bgGrad };

  if (!nombre || editandoNombre) {
    return (
      <PantallaBienvenida
        {...tokens}
        onContinuar={n => { setNombre(n); setEditandoNombre(false); setPantalla("home"); }}
      />
    );
  }

  if (pantalla === "agregar") {
    return (
      <PantallaAgregar
        {...tokens}
        onCerrar={() => setPantalla("home")}
        onGuardar={data => {
          setTareas([...tareas, {
            id: Date.now(), done: false, streak: 0, bestStreak: 0,
            history: Array(28).fill(0), habit: false,
            ...data,
            subs: (data.subs || []).map((text, i) => ({ id: Date.now() + i, text, done: false })),
          }]);
          setPantalla("home");
        }}
      />
    );
  }

  if (pantalla === "detalle" && tareaSeleccionada) {
    return (
      <PantallaDetalle
        {...tokens}
        tarea={tareaSeleccionada}
        onCerrar={() => setPantalla("home")}
        onToggle={() => {
          const updated = tareas.map(t => t.id === tareaSeleccionada.id ? { ...t, done: !t.done } : t);
          setTareas(updated);
          setTareaSeleccionada(prev => ({ ...prev, done: !prev.done }));
        }}
        onToggleSub={sid => {
          const updated = tareas.map(t =>
            t.id === tareaSeleccionada.id
              ? { ...t, subs: t.subs.map(s => s.id === sid ? { ...s, done: !s.done } : s) }
              : t
          );
          setTareas(updated);
          setTareaSeleccionada(prev => ({
            ...prev, subs: prev.subs.map(s => s.id === sid ? { ...s, done: !s.done } : s),
          }));
        }}
        onEliminar={() => {
          setTareas(tareas.filter(t => t.id !== tareaSeleccionada.id));
          setPantalla("home");
        }}
      />
    );
  }

  if (pantalla === "habitos") {
    return (
      <PantallaHabitos
        {...tokens}
        tareas={tareas}
        onCerrar={() => setPantalla("home")}
      />
    );
  }

  if (pantalla === "fondos") {
    return (
      <GaleriaFondos
        {...tokens}
        bgIndex={bgIndex}
        onSelect={i => { setBgIndex(i); setPantalla("home"); }}
        onBack={() => setPantalla("home")}
      />
    );
  }

  return (
    <PantallaHome
      {...tokens}
      nombre={nombre}
      tareas={tareas}
      setTareas={setTareas}
      fontIndex={fontIndex}
      setFontIndex={setFontIndex}
      onAbrirFondos={() => setPantalla("fondos")}
      onAbrirHabitos={() => setPantalla("habitos")}
      onAbrirAgregar={() => setPantalla("agregar")}
      onAbrirDetalle={t => { setTareaSeleccionada(t); setPantalla("detalle"); }}
      onEditarNombre={() => setEditandoNombre(true)}
    />
  );
}
