# Seven3 — AI Automation Studio (Jaipur, India)

Interactive 3D motion website for **Seven3**, an AI automation studio founded by **Priyam Pachori** in Jaipur, Rajasthan, India. Built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, **React Three Fiber (Three.js)**, **GSAP ScrollTrigger**, and **Lenis**.

> [!NOTE]
> Front-end only implementation: zero backend required, zero database, zero paid external AI API keys. All client communications and plan enquiries are routed directly to WhatsApp and direct founder telephone.

---

## Visual & Motion Design System

- **Page Frame:** `#140E0B` dark brown outer frame with rounded viewport margins.
- **Main Panels:** Warm cream `#F0E4D6` with 24–28px rounded corners (`rounded-panel`) and subtle boundary borders.
- **Dark Turntable Panel:** `#1A100C` to `#2A1A14` gradient.
- **Accent:** Vibrant orange `#F26B21` (hover `#FF7F3A`).
- **Typography:**
  - **Headings:** Plus Jakarta Sans, weight 700–800, tracking `-0.04em`, line-height `0.95`.
  - **Micro Labels:** JetBrains Mono uppercase, 10–11px, tracking `0.2em`.
- **Procedural 3D Robot Mascot:**
  - Procedurally generated in Three.js (no downloaded 3D asset files).
  - Glossy orange glaze material (`MeshPhysicalMaterial`, clearcoat 1, roughness 0.25), clay matte variant, and obsidian dark glaze.
  - Dark glass visor with dynamic blinking orange eyes and antenna.
  - Orbiting cream ring and floating pearl spheres.
  - Interactive props dynamically reactive to scroll sections and active service rows.
- **Navigation & Rail:**
  - Pinned top bar with Seven3 wordmark, Jaipur studio badge, and "Get in touch" CTA button.
  - Vertical right-edge scroll rail with section dots (`HELLO`, `SERVICES`, `WHO`, `PLANS`, `START`) and real-time frame readout (`FR 0053 / 0360`).
  - Lenis buttery-smooth inertial scroll synchronized with GSAP ScrollTrigger.

---

## Project Structure

```
Seven3/
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom tokens, scrollbar, reduced-motion rules
│   │   ├── layout.tsx          # Plus Jakarta Sans & JetBrains Mono font loader, metadata
│   │   └── page.tsx            # Main layout orchestration & dynamic 3D canvas loader
│   ├── components/
│   │   ├── LenisProvider.tsx   # Lenis smooth scroll provider + GSAP ticker
│   │   ├── TopBar.tsx          # Pinned header bar with wordmark & contact button
│   │   ├── ScrollRail.tsx      # Vertical rail with live frame counter readout
│   │   ├── robot/
│   │   │   ├── RobotCanvas.tsx # WebGL canvas, lighting, tab-pause & fallback
│   │   │   └── ProceduralRobot.tsx # 3D Robot mesh, materials, animations & props
│   │   └── sections/
│   │       ├── HelloSection.tsx    # Hero section + 10s interactive demo simulation
│   │       ├── ServicesSection.tsx # 3 service rows + floating "Now Showing" glass card
│   │       ├── WhoSection.tsx      # Dark turntable panel + manual/agent toggle
│   │       ├── PlansSection.tsx    # Service filter chips + 3 plan tier cards
│   │       └── StartSection.tsx    # Contact form, direct phone, WhatsApp links & footer
│   └── content.ts              # Single source of truth for ALL text and plans
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Local Development

### 1. Prerequisites
- Node.js 18+ (tested on Node v24 LTS)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Testing Each Stage

1. **Stage 1 (Scaffold, Fonts, Frame, Rail, Hello & Robot):**
   - Open [http://localhost:3000](http://localhost:3000).
   - Verify the dark brown outer page frame (`#140E0B`) and warm cream panel (`#F0E4D6`).
   - Observe the 3D procedural robot floating on the right side: eyes blink periodically, antenna ball glows, cream ring rotates, and the head subtly tilts when moving the mouse.
   - Click the **"See it work 00:10"** button at the bottom-right of the Hello section to watch the 10-second interactive sorting simulation.

2. **Stage 2 (Services & Robot Props):**
   - Scroll down to the **SERVICES** section.
   - Hover or click between `01 AI Consulting`, `02 Connect Your Systems`, and `03 Custom Agentic Workflows`.
   - Observe the 3D robot props transition:
     - *Consulting:* Orbiting chart pillars and inspection magnifier.
     - *Systems:* Two cubes labeled ERP and CRM with animated glowing dashes.
     - *Workflows:* Sequential chain of 4 glowing nodes.
   - Watch the floating glass "Now showing" card update chips and progress.

3. **Stage 3 (Who It's For & Turntable Toggle):**
   - Scroll into the dark turntable panel (`#1A100C` to `#2A1A14`).
   - Notice the live readout `TURNTABLE 358°` tracking the robot's 360-degree rotation.
   - Click the **"WORKFLOW: Manual | With agent"** toggle:
     - *Manual:* Robot turns into matte warm grey clay, slumps into a tired pose, with scattered paper sheets floating in disorder.
     - *With agent:* Robot turns into glossy orange glaze, stands upright, with tidy flowing cards.

4. **Stage 4 (Plans & Contact):**
   - Scroll to **PLANS**. Click the chips (*Consulting*, *Connect systems*, *Custom workflows*) to switch tiers.
   - Confirm the Pro plan card is highlighted with the price text *"Price shared on contact"* (no price numbers or currency symbols anywhere).
   - Click *"Get the price"* to test opening WhatsApp with the prefilled enquiry message.
   - Scroll to **START**. Select an industry chip, fill in the bottleneck description, name, and phone number.
   - Click *"Send on WhatsApp"* to verify prefilled WhatsApp message generation.

5. **Stage 5 (Polish, Accessibility & Mobile):**
   - Test responsive layout by resizing to mobile width (<640px) and tablet width.
   - Test switching browser tabs: 3D canvas pauses rendering when the tab is hidden to save battery.
   - Verify keyboard focus outlines and smooth scrolling via rail dots.

---

## Production Build & Vercel Deployment

### Build Locally
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Install Vercel CLI (optional) or push to GitHub:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Or import the repository directly in the [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Next.js**.
4. Root Directory: `./`.
5. Deploy.

---

## Direct Contacts
- **Studio Founder:** Priyam Pachori
- **Location:** Jaipur, Rajasthan, India
- **Phone:** `+91 82906 44433`
- **WhatsApp:** `https://wa.me/918290644433`
