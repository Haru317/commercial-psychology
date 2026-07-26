"use client";

import { useEffect, useState } from "react";
import { days, engineSteps, stages, type Day } from "./curriculum";

type View = "home" | "journey" | "engine" | "portfolio" | "day";
type CourseState = {
  completed: number[];
  answers: Record<string, string>;
  reveals: Record<string, boolean>;
  checks: Record<string, boolean>;
  lastDay: number;
};

const initialState: CourseState = {
  completed: [],
  answers: {},
  reveals: {},
  checks: {},
  lastDay: 1,
};

const tabs = [
  { id: "orientation", label: "01 今日の任務" },
  { id: "learn", label: "02 理論" },
  { id: "case", label: "03 OJTケース" },
  { id: "practice", label: "04 練習" },
  { id: "apply", label: "05 実案件へ" },
  { id: "pass", label: "06 合格" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    engine: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.14.38.36.72.66 1 .3.28.69.42 1.1.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
    case: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    portfolio: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h5M9 13h6M9 17h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z" /><path d="M4 6.5v13" /></>,
    spark: <><path d="m12 3 1.2 4.3L17.5 9l-4.3 1.7L12 15l-1.2-4.3L6.5 9l4.3-1.7Z" /><path d="m19 15 .6 2.1L22 18l-2.4.9L19 21l-.6-2.1L16 18l2.4-.9Z" /></>,
    external: <><path d="M14 3h7v7M10 14 21 3" /><path d="M21 14v6H4V3h6" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function stageColor(day: Day) {
  return stages[day.stage - 1]?.color || "#1d315c";
}

function AppButton({ children, onClick, variant = "primary", disabled = false }: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "ghost" | "soft"; disabled?: boolean }) {
  return <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selectedDay, setSelectedDay] = useState(1);
  const [tab, setTab] = useState("orientation");
  const [state, setState] = useState<CourseState>(initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const saved = localStorage.getItem("cde-course-v1");
        if (saved) {
          const parsed = { ...initialState, ...JSON.parse(saved) };
          setState(parsed);
          setSelectedDay(parsed.lastDay || 1);
        }
      } catch { /* start clean when local data is malformed */ }
      setLoaded(true);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("cde-course-v1", JSON.stringify(state));
  }, [state, loaded]);

  const currentDay = days[Math.min(selectedDay, 30) - 1];
  const nextOpen = Math.min(30, Math.max(1, state.completed.length ? Math.max(...state.completed) + 1 : 1));
  const progress = Math.round((state.completed.length / 30) * 100);

  function openDay(n: number) {
    setSelectedDay(n);
    setState(s => ({ ...s, lastDay: n }));
    setTab("orientation");
    setView("day");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setAnswer(key: string, value: string) {
    setState(s => ({ ...s, answers: { ...s.answers, [key]: value } }));
  }

  function toggleCheck(key: string) {
    setState(s => ({ ...s, checks: { ...s.checks, [key]: !s.checks[key] } }));
  }

  function dayScore(day: Day) {
    const guided = day.drills.filter((_, i) => (state.answers[`d${day.day}-q${i}`] || "").trim()).length;
    const guidedPoints = Math.round((guided / day.drills.length) * 40);
    const independent = (state.answers[`d${day.day}-ind`] || "").trim() ? 20 : 0;
    const transfer = (state.answers[`d${day.day}-transfer`] || "").trim() ? 20 : 0;
    const checks = [0, 1, 2, 3].filter(i => state.checks[`d${day.day}-c${i}`]).length * 5;
    return guidedPoints + independent + transfer + checks;
  }

  function completeDay(day: Day) {
    if (dayScore(day) < 75) return;
    setState(s => ({
      ...s,
      completed: Array.from(new Set([...s.completed, day.day])).sort((a, b) => a - b),
      lastDay: Math.min(30, day.day + 1),
    }));
    if (day.day < 30) openDay(day.day + 1);
    else setView("portfolio");
  }

  function exportPortfolio() {
    const md = [
      "# Commercial Psychology Portfolio v1",
      "",
      `進捗: ${state.completed.length}/30 Days`,
      `出力日: ${new Date().toLocaleDateString("ja-JP")}`,
      "",
      ...days.flatMap(day => {
        const hasAny = day.drills.some((_, i) => state.answers[`d${day.day}-q${i}`]) || state.answers[`d${day.day}-transfer`];
        if (!hasAny) return [];
        return [
          `## Day ${day.day} — ${day.title}`,
          `成果物: ${day.output}`,
          "",
          ...day.drills.flatMap((q, i) => state.answers[`d${day.day}-q${i}`] ? [`### ${q.prompt}`, state.answers[`d${day.day}-q${i}`], ""] : []),
          ...(state.answers[`d${day.day}-ind`] ? ["### Independent Practice", state.answers[`d${day.day}-ind`], ""] : []),
          ...(state.answers[`d${day.day}-transfer`] ? ["### 自分の実案件", state.answers[`d${day.day}-transfer`], ""] : []),
        ];
      }),
    ].join("\n");
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Commercial_Psychology_Portfolio_v1.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  const nav = [
    { id: "home" as View, label: "Today", icon: "home" },
    { id: "journey" as View, label: "30 Days", icon: "map" },
    { id: "engine" as View, label: "Engine", icon: "engine" },
    { id: "portfolio" as View, label: "Portfolio", icon: "portfolio" },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")} aria-label="ホームへ">
          <span className="brand-mark">C</span>
          <span><strong>Commercial</strong><em>DIAGNOSIS ENGINE</em></span>
        </button>
        <div className="top-progress">
          <span>30-DAY OJT</span>
          <div className="mini-track"><i style={{ width: `${progress}%` }} /></div>
          <b>{state.completed.length}/30</b>
        </div>
        <button className="avatar" aria-label="学習者プロフィール">H</button>
      </header>

      <aside className="sidebar">
        <div className="side-intro">
          <small>YOUR MISSION</small>
          <p>未知案件を、根拠ある商業判断へ。</p>
        </div>
        <nav>
          {nav.map(item => (
            <button key={item.id} className={view === item.id || (view === "day" && item.id === "home") ? "active" : ""} onClick={() => setView(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="side-card">
          <Icon name="spark" />
          <small>NEXT ASSET</small>
          <strong>{days[nextOpen - 1].output}</strong>
          <button onClick={() => openDay(nextOpen)}>続きを開く <Icon name="arrow" size={15} /></button>
        </div>
      </aside>

      <main className="main">
        {view === "home" && <Dashboard progress={progress} nextOpen={nextOpen} state={state} openDay={openDay} setView={setView} />}
        {view === "journey" && <Journey state={state} openDay={openDay} />}
        {view === "engine" && <Engine />}
        {view === "portfolio" && <Portfolio state={state} openDay={openDay} exportPortfolio={exportPortfolio} />}
        {view === "day" && currentDay && (
          <Lesson
            day={currentDay}
            tab={tab}
            setTab={setTab}
            state={state}
            setAnswer={setAnswer}
            toggleCheck={toggleCheck}
            score={dayScore(currentDay)}
            completeDay={() => completeDay(currentDay)}
          />
        )}
      </main>

      <nav className="mobile-nav">
        {nav.map(item => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}
      </nav>
    </div>
  );
}

function Dashboard({ progress, nextOpen, state, openDay, setView }: { progress: number; nextOpen: number; state: CourseState; openDay: (n: number) => void; setView: (v: View) => void }) {
  const day = days[nextOpen - 1];
  const stage = stages[day.stage - 1];
  const recentOutputs = days.filter(d => state.completed.includes(d.day)).slice(-3).reverse();
  return (
    <div className="page dashboard">
      <section className="hello-hero">
        <div className="hello-copy">
          <div className="eyebrow"><span>30 DAYS · PERSONAL MBA × VIRTUAL OJT</span></div>
          <h1>30日後、曖昧な商業問題を<br /><span>「売れる次の一手」</span>に変える。</h1>
          <p>実在企業の数値・失敗・意思決定を教材に、顧客診断から商品、価格、集客、営業、実験、有料提案までを一つのEngineとして運転します。</p>
          <div className="hero-capabilities">
            <span><b>DIAGNOSE</b>原因を証拠で絞る</span>
            <span><b>DESIGN</b>価値・商品・価格を組む</span>
            <span><b>SELL &amp; PROVE</b>提案し、結果で更新する</span>
          </div>
          <div className="hero-actions">
            <AppButton onClick={() => openDay(nextOpen)}>Day {nextOpen} を始める <Icon name="arrow" size={17} /></AppButton>
            <AppButton variant="ghost" onClick={() => document.getElementById("course-blueprint")?.scrollIntoView({ behavior: "smooth" })}>全体像を見る</AppButton>
          </div>
        </div>
        <div className="progress-orbit" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
          <div><small>COMPLETE</small><b>{progress}<em>%</em></b><span>{state.completed.length} of 30 days</span></div>
          <i className="orbit-dot" />
        </div>
        <span className="hero-shape shape-a" />
        <span className="hero-shape shape-b" />
      </section>

      <CourseBlueprint />

      <section className="mission-card" style={{ "--accent": stage.color } as React.CSSProperties}>
        <div className="day-tile"><small>DAY</small><strong>{String(day.day).padStart(2, "0")}</strong><span>{stages[day.stage - 1].days}</span></div>
        <div className="mission-copy">
          <div className="micro-label">STAGE {day.stage} · {stage.name}</div>
          <h2>{day.title}</h2>
          <p>{day.question}</p>
          <div className="mission-meta"><span><Icon name="clock" size={16} /> 必須 2–3時間</span><span><Icon name="case" size={16} /> {day.case.name}</span><span><Icon name="portfolio" size={16} /> {day.output}</span></div>
        </div>
        <button className="round-arrow" onClick={() => openDay(day.day)} aria-label={`Day ${day.day}を開く`}><Icon name="arrow" /></button>
      </section>

      <section className="dashboard-grid">
        <div className="panel engine-preview">
          <div className="panel-heading"><div><small>YOUR THINKING SYSTEM</small><h3>Commercial Diagnosis Engine</h3></div><button onClick={() => setView("engine")}>全体を見る <Icon name="arrow" size={15} /></button></div>
          <div className="engine-mini">
            {engineSteps.map((step, i) => <div key={step.n} className={i < Math.ceil((nextOpen / 30) * 10) ? "built" : ""}><span>{step.n}</span><b>{step.name}</b></div>)}
          </div>
          <p className="quiet">観測から価値実現までを一つの循環として運転します。前工程の誤りほど、後工程の損失が大きくなります。</p>
        </div>
        <div className="panel assets-preview">
          <div className="panel-heading"><div><small>PORTFOLIO</small><h3>積み上がった実務資産</h3></div><b>{state.completed.length}<em>/30</em></b></div>
          {recentOutputs.length ? recentOutputs.map(d => <button key={d.day} onClick={() => openDay(d.day)}><span className="asset-check"><Icon name="check" size={14} /></span><span><small>DAY {d.day}</small><strong>{d.output}</strong></span><Icon name="arrow" size={15} /></button>) : <div className="empty-asset"><Icon name="portfolio" /><p>Day 1を終えると、最初の診断成果物がここに保存されます。</p></div>}
        </div>
      </section>
    </div>
  );
}

function CourseBlueprint() {
  const framework = [
    { n: "01–03", name: "診断", detail: "Mandate · Evidence · Hypotheses", result: "症状と原因を分ける" },
    { n: "04–06", name: "意思決定", detail: "Customer · Decision · Market", result: "誰が、なぜ、何と比べて決めるか読む" },
    { n: "07–08", name: "価値設計", detail: "Value · Intervention", result: "商品・価格・一変数実験を組む" },
    { n: "09–10", name: "実証と収益化", detail: "Measure · Realize", result: "結果を測り、有料提案へ変える" },
  ];
  const outcomes = [
    "未知案件の売上停滞を、事実・解釈・競合仮説へ分解できる",
    "顧客のJob、感情、信頼、権限、摩擦から購買判断を説明できる",
    "狙う市場、Offer、価値証拠、参照価格、交渉条件を一貫設計できる",
    "集客・営業施策を一変数で試し、KPIと反証条件から改善できる",
    "診断を6ページの有料提案書と90日Commercial OSへ変換できる",
  ];
  return <section className="course-blueprint" id="course-blueprint">
    <div className="blueprint-heading">
      <div><small>CURRICULUM AT A GLANCE</small><h2>この30日で、何をどの順番で身につけるか</h2></div>
      <p>答えの暗記ではなく、実在ケースでプロの判断順序を反復し、同じ型を別業界と自分の案件へ移植します。</p>
    </div>
    <div className="blueprint-diagram">
      <div className="diagram-input"><small>INPUT</small><strong>数字はある。<br />原因は不明。</strong><span>売上停滞／失注／価格反論／集客不振</span></div>
      <div className="diagram-arrow"><Icon name="arrow" /></div>
      <div className="framework-clusters">{framework.map(item => <div key={item.n}><span>{item.n}</span><strong>{item.name}</strong><small>{item.detail}</small><p>{item.result}</p></div>)}</div>
      <div className="diagram-arrow"><Icon name="arrow" /></div>
      <div className="diagram-output"><small>DAY 30 OUTPUT</small><strong>根拠ある<br />商業判断</strong><span>有料提案書＋90日実行計画</span></div>
    </div>
    <div className="agenda-grid">{stages.map(stage => <div key={stage.id} style={{ "--stage-color": stage.color } as React.CSSProperties}><span>STAGE {stage.id} · {stage.days}</span><strong>{stage.name}</strong><p>{stage.after}</p></div>)}</div>
    <div className="blueprint-bottom">
      <div className="learning-loop">
        <small>EVERY DAY · OJT LOOP</small>
        <div><span>1</span><b>実在ケース</b><i>状況と数値を見る</i></div><Icon name="arrow" />
        <div><span>2</span><b>プロの完成例</b><i>判断順序を読む</i></div><Icon name="arrow" />
        <div><span>3</span><b>型を写す</b><i>問いと模範を即比較</i></div><Icon name="arrow" />
        <div><span>4</span><b>自案件へ移植</b><i>一能力だけ使う</i></div>
      </div>
      <div className="outcome-list"><small>AFTER 30 DAYS · できるようになること</small>{outcomes.map((outcome, i) => <p key={outcome}><span>{i + 1}</span>{outcome}</p>)}</div>
    </div>
  </section>;
}

function Journey({ state, openDay }: { state: CourseState; openDay: (n: number) => void }) {
  const maxOpen = Math.min(30, Math.max(1, state.completed.length ? Math.max(...state.completed) + 1 : 1));
  return (
    <div className="page">
      <PageTitle eyebrow="THE 30-DAY BLUEPRINT" title="一日一能力。30日後、一つのEngine。" text="各Dayは前日までの成果物を使う累積型です。理論は主役ではなく、その日の判断能力を作る道具です。" />
      <div className="stage-list">
        {stages.map(stage => (
          <section key={stage.id} className="stage-block" style={{ "--accent": stage.color } as React.CSSProperties}>
            <header>
              <div className="stage-number">0{stage.id}</div>
              <div><small>{stage.days}</small><h2>{stage.name}</h2></div>
              <div className="ability-shift"><span>{stage.before}</span><Icon name="arrow" size={16} /><strong>{stage.after}</strong></div>
            </header>
            <div className="day-grid">
              {days.filter(d => d.stage === stage.id).map(day => {
                const done = state.completed.includes(day.day);
                const locked = day.day > maxOpen;
                return <button key={day.day} className={`day-card ${done ? "done" : ""} ${locked ? "locked" : ""}`} onClick={() => openDay(day.day)}>
                  <span className="day-number">{done ? <Icon name="check" size={17} /> : locked ? <Icon name="lock" size={15} /> : String(day.day).padStart(2, "0")}</span>
                  <small>DAY {day.day}</small>
                  <strong>{day.title}</strong>
                  <p>{day.capability}</p>
                  <em>{day.output}</em>
                </button>;
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Engine() {
  return (
    <div className="page">
      <PageTitle eyebrow="YOUR THINKING OPERATING SYSTEM" title="Commercial Diagnosis Engine" text="売れない理由を当てるチェックリストではありません。証拠から仮説を更新し、介入の結果を次の知的資産へ戻す循環です。" />
      <div className="engine-loop">
        {engineSteps.map((step, i) => (
          <div key={step.n} className="engine-step">
            <span>{step.n}</span>
            <div><small>STEP {step.n}</small><h3>{step.name}</h3><p>{step.desc}</p></div>
            <div className="failure"><b>ここを誤ると</b>{step.failure}</div>
            {i < engineSteps.length - 1 && <i><Icon name="arrow" size={17} /></i>}
          </div>
        ))}
        <div className="feedback-loop"><Icon name="engine" /><div><strong>UPDATE LOOP</strong><p>測定結果はEvidenceへ戻り、仮説順位・顧客理解・Offerを更新する。</p></div></div>
      </div>
      <div className="expert-difference">
        <div><small>BEGINNER</small><h3>答えを早く出す</h3><p>最初の物語に合う情報を集め、施策を多く実行する。</p></div>
        <div className="difference-arrow"><Icon name="arrow" /></div>
        <div><small>PROFESSIONAL</small><h3>次の最良判断を出す</h3><p>不確実性を明示し、最も安い識別証拠を取り、予測誤差から更新する。</p></div>
      </div>
    </div>
  );
}

function Lesson({ day, tab, setTab, state, setAnswer, toggleCheck, score, completeDay }: {
  day: Day; tab: string; setTab: (s: string) => void; state: CourseState;
  setAnswer: (k: string, v: string) => void; toggleCheck: (k: string) => void;
  score: number; completeDay: () => void;
}) {
  const color = stageColor(day);
  return (
    <div className="lesson" style={{ "--accent": color } as React.CSSProperties}>
      <section className="lesson-hero">
        <div className="lesson-day"><small>DAY</small><strong>{String(day.day).padStart(2, "0")}</strong></div>
        <div><div className="micro-label">STAGE {day.stage} · {stages[day.stage - 1].name}</div><h1>{day.title}</h1><p>{day.capability}</p></div>
        <div className="lesson-time"><Icon name="clock" /><span><small>REQUIRED</small><b>2–3 HOURS</b></span></div>
      </section>
      <nav className="lesson-tabs">
        {tabs.map(t => <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => { setTab(t.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{t.label}</button>)}
      </nav>

      <div className="lesson-body">
        {tab === "orientation" && <Orientation day={day} setTab={setTab} />}
        {tab === "learn" && <Learn day={day} setTab={setTab} />}
        {tab === "case" && <Case day={day} setTab={setTab} />}
        {tab === "practice" && <Practice day={day} state={state} setAnswer={setAnswer} setTab={setTab} />}
        {tab === "apply" && <Apply day={day} state={state} setAnswer={setAnswer} setTab={setTab} />}
        {tab === "pass" && <Pass day={day} state={state} toggleCheck={toggleCheck} score={score} completeDay={completeDay} />}
      </div>
    </div>
  );
}

function Orientation({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  const prev = day.day > 1 ? days[day.day - 2] : null;
  return <div className="content-flow">
    <section className="today-question"><small>TODAY’S COMMERCIAL PROBLEM</small><h2>{day.question}</h2></section>
    <div className="connection-row">
      <div><small>YESTERDAY</small><strong>{prev ? prev.title : "ここから開始"}</strong><p>{prev ? prev.output : "診断する問題の境界を作る"}</p></div>
      <Icon name="arrow" />
      <div className="today"><small>TODAY</small><strong>{day.title}</strong><p>{day.capability}</p></div>
      <Icon name="arrow" />
      <div><small>TOMORROW</small><strong>{day.day < 30 ? days[day.day].title : "90日実務へ"}</strong><p>{day.next}</p></div>
    </div>
    <section className="white-card two-col">
      <div><span className="section-index">A</span><small>ENGINE PART</small><h3>今日つくる部品</h3><p>{day.capability}</p><div className="asset-pill"><Icon name="portfolio" size={17} /> {day.output}</div></div>
      <div><span className="section-index">C</span><small>WHY IT MATTERS</small><h3>これがない専門家の損失</h3><p>{day.why}</p></div>
    </section>
    <NextButton label="理論を日本語で理解する" onClick={() => setTab("learn")} />
  </div>;
}

function Learn({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="D" eyebrow="WORKING THEORY" title={day.theory.name} text="理論名を暗記する必要はありません。今日の判断の、どこで使い、どこで止めるかを理解します。" />
    <section className="theory-grid">
      <div className="theory-main"><small>PLAIN JAPANESE</small><h3>ひとことで言うと</h3><p>{day.theory.plain}</p></div>
      <div><small>説明できる</small><p>{day.theory.can}</p></div>
      <div><small>説明できない</small><p>{day.theory.limit}</p></div>
      <div className="warning"><small>よくある誤用</small><p>{day.theory.misuse}</p></div>
    </section>
    <section className="source-section">
      <div className="source-heading"><div><small>PRIMARY MATERIALS</small><h3>今日見る範囲だけ</h3></div><span>合計 {day.sources.reduce((n, s) => n + s.minutes, 0)} min</span></div>
      {day.sources.map((source, i) => <a className="source-card" key={`${source.url}-${i}`} href={source.url} target="_blank" rel="noreferrer">
        <span className="source-index">0{i + 1}</span>
        <div><small>{source.provider}</small><h4>{source.title}</h4><p><b>見る範囲：</b>{source.range}</p><p><b>視聴中の問い：</b>{source.purpose}ために、原著者が「言えること／言っていないこと」を一つずつ拾う。</p></div>
        <div className="source-time"><Icon name="clock" size={15} /> {source.minutes} min <Icon name="external" size={16} /></div>
      </a>)}
      <div className="source-goal"><Icon name="check" /><p><b>視聴後の到達条件</b>：{day.theory.name}を、定義・使う工程・限界・誤用の4文で説明できる。</p></div>
    </section>
    <NextButton label="プロの完成思考を見る" onClick={() => setTab("case")} />
  </div>;
}

function Case({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="E" eyebrow="WORKED EXAMPLE" title={day.case.name} text={day.case.role} />
    <section className="case-brief">
      <div className="brief-label">SITUATION</div>
      <h3>{day.case.scene}</h3>
      <div className="fact-grid">{day.case.facts.map((fact, i) => <div key={fact}><span>FACT {i + 1}</span><p>{fact}</p></div>)}</div>
    </section>
    <section className="reasoning-track">
      <div className="track-title"><small>PROFESSIONAL REASONING</small><h3>結論ではなく、判断の順序を追う</h3></div>
      {day.case.reasoning.map((step, i) => <div className="reason-step" key={step}><span>{String(i + 1).padStart(2, "0")}</span><p>{step}</p></div>)}
    </section>
    <section>
      <SectionHead index="F" eyebrow="DISSECTION" title="三段階の答えを比較する" text="それらしく聞こえる答えほど、反証と測定がないと危険です。" />
      <div className="answer-levels">
        <div><small>BEGINNER</small><h4>初心者</h4><p>最初に目立った説明を原因とみなし、すぐ施策を提案する。</p></div>
        <div><small>DANGEROUSLY SMART</small><h4>一見優秀だが危険</h4><p>専門理論を多数当てはめるが、どの証拠で順位が変わるかを示さない。</p></div>
        <div><small>PROFESSIONAL</small><h4>プロ</h4><p>事実と不足を分け、競合仮説を置き、最小の識別証拠→予測→更新の順で決める。</p></div>
      </div>
    </section>
    <NextButton label="一判断ずつ真似する" onClick={() => setTab("practice")} />
  </div>;
}

function Practice({ day, state, setAnswer, setTab }: { day: Day; state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="G" eyebrow="USE CASE → SAMPLE → PATTERN" title="実例と模範を先にインストールする。" text="一から正解を発明しません。ケース、プロの答え、転用できる型を同じ画面で読み、自分の言葉で一度だけ再現します。" />
    <section className="practice-case-anchor">
      <div><small>CASE INPUT · 今日の全設問で使う実例</small><h3>{day.case.name}</h3><p>{day.case.scene}</p></div>
      <div className="practice-facts">{day.case.facts.map((fact, i) => <span key={fact}><b>FACT {i + 1}</b>{fact}</span>)}</div>
    </section>
    {day.drills.map((drill, i) => {
      const key = `d${day.day}-q${i}`;
      return <section className="drill-card" key={key}>
        <div className="drill-top"><span>USE CASE {i + 1} / {day.drills.length}</span><small>{i === 0 ? "OBSERVE" : i === 1 ? "DIAGNOSE" : "DECIDE"}</small></div>
        <h3>{drill.prompt}</h3>
        <div className="drill-guidance"><p><b>この設問で見るもの</b>{drill.hint}</p><p className="avoid"><b>混ぜないもの</b>{drill.avoid}</p></div>
        <div className="practice-pair">
          <div className="learner-side"><div className="pair-label"><span>01</span><b>型を写す</b><small>模範を読んでから、同じ判断を自分の言葉で1〜3文</small></div><textarea value={state.answers[key] || ""} onChange={e => setAnswer(key, e.target.value)} placeholder="右の模範を参考に、判断の型を一度だけ再現する…" /></div>
          <div className="model-answer"><div className="model-label"><Icon name="spark" size={17} /> 02 · プロの模範解答</div><p>{drill.model}</p><div className="model-notes"><span><b>なぜ良い？</b>{drill.why}</span><span><b>失敗パターン</b>{drill.mistake}</span></div><div className="revise-line"><b>別案件へ転用する型</b>：{drill.hint}を確認し、「観測できる根拠 → 判断 → 次に変わる条件」の順で書く。</div></div>
        </div>
      </section>;
    })}
    <section className="independent-card">
      <div className="independent-head"><span>H</span><div><small>ANOTHER INDUSTRY · 別業界サンプル</small><h3>{day.independent.name}</h3></div></div>
      <p className="scene">{day.independent.scene}</p>
      <h4>{day.independent.prompt}</h4>
      <div className="independent-pair">
        <div><div className="pair-label light"><span>01</span><b>10秒で型を当てる</b><small>長考せず、上の3例と同じ順番で書く</small></div><textarea value={state.answers[`d${day.day}-ind`] || ""} onChange={e => setAnswer(`d${day.day}-ind`, e.target.value)} placeholder="1〜3文で型を移植する…" /></div>
        <div className="ind-model"><b>02 · 模範の筋道</b><p>{day.independent.model}</p><small>読んだら、自分の答案に不足している判断を一つだけ追記する。</small></div>
      </div>
    </section>
    <NextButton label="自分の案件へ一つ移植する" onClick={() => setTab("apply")} />
  </div>;
}

function Apply({ day, state, setAnswer, setTab }: { day: Day; state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  const key = `d${day.day}-transfer`;
  return <div className="content-flow">
    <SectionHead index="I" eyebrow="TRANSFER PRACTICE" title="今日は、この能力だけを自分の案件へ。" text="大きな診断書を毎日完成させません。今日つくった部品を、統合ファイルへ一つ追加します。" />
    <section className="transfer-card">
      <div className="transfer-badge"><Icon name="case" /> YOUR REAL CASE</div>
      <h2>{day.transfer}</h2>
      <p>実名や機密情報は避け、判断に必要な文脈だけを書いてください。</p>
      <div className="transfer-pair">
        <textarea value={state.answers[key] || ""} onChange={e => setAnswer(key, e.target.value)} placeholder="左で学んだ型を、自分の実案件へ置き換える…" />
        <div className="transfer-model"><small>書き方の見本 · 今日のケースなら</small><h3>{day.case.name}</h3>{day.drills.map((drill, i) => <p key={drill.model}><b>{i + 1}</b>{drill.model}</p>)}</div>
      </div>
      <div className="save-note"><Icon name="portfolio" /><span>保存先</span><strong>{day.output}</strong><em>入力内容はこのブラウザに自動保存されます。</em></div>
    </section>
    <section className="tomorrow-card"><small>L · WHY TOMORROW?</small><p>{day.next}</p></section>
    <NextButton label="判断品質を採点する" onClick={() => setTab("pass")} disabled={!(state.answers[key] || "").trim()} />
  </div>;
}

function Pass({ day, state, toggleCheck, score, completeDay }: { day: Day; state: CourseState; toggleCheck: (k: string) => void; score: number; completeDay: () => void }) {
  const checks = [
    ["最低合格", day.rubric.pass],
    ["標準レベル", day.rubric.standard],
    ["プロレベル", day.rubric.pro],
    ["修正できた", day.rubric.revise],
  ];
  return <div className="content-flow">
    <SectionHead index="J" eyebrow="JUDGMENT QUALITY" title="文章量ではなく、判断品質で合格する。" text="自己採点は『できた気がする』ではなく、実際の答案にその要素が見える場合だけチェックします。" />
    <section className="assessment">
      <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><b>{score}</b><span>/ 100</span><small>{score >= 75 ? "PASS READY" : "KEEP REVISING"}</small></div></div>
      <div className="check-list">
        {checks.map((item, i) => <label key={item[0]} className={state.checks[`d${day.day}-c${i}`] ? "checked" : ""}>
          <input type="checkbox" checked={!!state.checks[`d${day.day}-c${i}`]} onChange={() => toggleCheck(`d${day.day}-c${i}`)} />
          <span className="fake-check">{state.checks[`d${day.day}-c${i}`] && <Icon name="check" size={15} />}</span>
          <span><b>{item[0]}</b><p>{item[1]}</p></span>
        </label>)}
      </div>
    </section>
    <section className="integration-card">
      <div><small>K · ENGINE INTEGRATION</small><h3>{day.output}</h3><p>今日の回答はPortfolioへ統合され、次のDayの入力として使います。</p></div>
      <Icon name="engine" size={36} />
    </section>
    <button className="complete-button" disabled={score < 75} onClick={completeDay}>
      {score >= 75 ? <><Icon name="check" /> Day {day.day} を完了して次へ</> : <>あと {75 - score} 点：回答と自己修正を追加する</>}
    </button>
  </div>;
}

function Portfolio({ state, openDay, exportPortfolio }: { state: CourseState; openDay: (n: number) => void; exportPortfolio: () => void }) {
  return <div className="page">
    <PageTitle eyebrow="YOUR COMMERCIAL IP" title="Commercial Psychology Portfolio" text="毎日の小さな判断が、一つの診断・提案・実行システムへ累積します。回答はMarkdownで手元へ書き出せます。" />
    <section className="portfolio-hero">
      <div><small>PORTFOLIO v1</small><h2>{state.completed.length}<span>/30</span></h2><p>実務成果物 完成</p></div>
      <div className="portfolio-copy"><h3>{state.completed.length === 30 ? "未知案件を一人で運転できる状態です。" : "次の成果物を完成させよう。"}</h3><p>暗記した理論ではなく、あなたが実際に書き、比較し、修正した判断の記録です。</p></div>
      <AppButton onClick={exportPortfolio} variant="soft"><Icon name="download" size={17} /> Markdownを出力</AppButton>
    </section>
    <div className="portfolio-list">
      {days.map(day => {
        const done = state.completed.includes(day.day);
        return <button key={day.day} className={done ? "done" : ""} onClick={() => openDay(day.day)}>
          <span className="portfolio-day">{done ? <Icon name="check" size={16} /> : day.day}</span>
          <span><small>DAY {day.day} · STAGE {day.stage}</small><strong>{day.output}</strong><p>{day.title}</p></span>
          <span className="portfolio-status">{done ? "COMPLETED" : "NOT YET"} <Icon name="arrow" size={15} /></span>
        </button>;
      })}
    </div>
  </div>;
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className="page-title"><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></header>;
}

function SectionHead({ index, eyebrow, title, text }: { index: string; eyebrow: string; title: string; text: string }) {
  return <header className="section-head"><span>{index}</span><div><small>{eyebrow}</small><h2>{title}</h2><p>{text}</p></div></header>;
}

function NextButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <button className="next-section" onClick={onClick} disabled={disabled}><span>{label}</span><Icon name="arrow" /></button>;
}
