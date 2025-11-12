# Cybersecurity Training Platform - Design Guidelines

## Design Approach

**Reference-Based + System Hybrid**: Drawing inspiration from modern e-learning platforms (Duolingo, Khan Academy, Udemy) combined with Material Design principles for information-dense interfaces. The warm color palette differentiates this from typical cybersecurity products while maintaining professionalism and trust.

**Core Principle**: Create an approachable, gamified learning experience that reduces cybersecurity intimidation through friendly visuals and clear progression systems.

## Typography

**Font Families** (Google Fonts):
- **Primary**: Inter (headings, UI elements) - weights: 400, 500, 600, 700
- **Secondary**: DM Sans (body text, descriptions) - weights: 400, 500

**Hierarchy**:
- H1: text-4xl/text-5xl, font-bold (Dashboard headings, page titles)
- H2: text-3xl, font-semibold (Section headers, module titles)
- H3: text-xl, font-semibold (Card titles, lesson names)
- Body Large: text-lg (Introductory text, important descriptions)
- Body: text-base (Primary content, quiz questions)
- Small: text-sm (Metadata, timestamps, hints)

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Micro spacing: gap-2, p-2 (tight groupings, icon padding)
- Component padding: p-4, p-6 (cards, buttons)
- Section spacing: py-12, py-16 (between major sections)
- Container margins: mx-4, mx-8 (responsive gutters)

**Grid System**: 
- Dashboard: 12-column grid with 3-4 column cards on desktop, single column mobile
- Max container width: max-w-7xl for main content areas

## Component Library

### Core UI Elements

**Cards**:
- Course cards: Rounded-2xl, shadow-lg, p-6, with hover lift effect (transform scale-105)
- Progress cards: Rounded-xl, border-2, p-4, with completion rings/bars
- Quiz answer cards: Rounded-lg, border, p-4, interactive states for selection

**Buttons**:
- Primary: Rounded-lg, px-6, py-3, text-base, font-semibold
- Secondary: Outlined variant with border-2
- Icon buttons: Rounded-full, p-3 for action buttons

**Progress Indicators**:
- Linear progress bars: h-3, rounded-full, with animated fill
- Circular progress: Stroke-based SVG rings showing completion percentage
- Badge counters: Rounded-full, px-3, py-1, text-sm

**Navigation**:
- Top navbar: Fixed, backdrop-blur, with logo, main nav links, user profile dropdown
- Sidebar (dashboard): Sticky, w-64 on desktop, collapsible on tablet/mobile with icons and labels
- Breadcrumbs: text-sm with separator icons for deep navigation

### Interactive Elements

**Quiz Components**:
- Multiple choice: Large clickable cards with radio/checkbox indicators
- True/False: Toggle-style buttons with clear visual states
- Feedback modals: Rounded-2xl overlay with checkmark/x icons, explanation text
- Score display: Large numerical display with celebratory elements

**Learning Modules**:
- Module header: Large title, duration estimate, difficulty badge, progress bar
- Content sections: Tabbed interface or accordion for topics
- Video player: Embedded with custom controls, playback speed options
- Code snippets: Syntax-highlighted blocks with copy button

**Knowledge Base**:
- Search bar: Prominent, rounded-full input with icon, w-full max-w-2xl
- Category grid: Icon-based cards (2-3 columns) with hover effects
- Article cards: Image thumbnail, title, excerpt, read time

## Images

**Hero Section**: 
Full-width hero (h-96 to h-screen on desktop) with an abstract, warm-toned illustration depicting cybersecurity concepts (shield, lock, network nodes) in a friendly, non-technical style. Overlaid gradient from warm orange to amber. Central CTA buttons with backdrop-blur-md backgrounds.

**Supporting Images**:
- Course thumbnails: Icon-based illustrations (shield for network security, envelope for phishing, key for passwords) with gradient backgrounds
- Dashboard illustrations: Small spot illustrations for empty states, achievement unlocks
- Knowledge base: Header images for articles using abstract security-themed graphics
- Achievement badges: SVG icons with warm metallic gradients (gold, copper, bronze)

## Key Page Structures

**Landing Page** (5-7 sections):
1. Hero with value proposition, two CTAs (Start Learning, View Courses)
2. Feature showcase (3-column grid): Interactive modules, Progress tracking, Real-world scenarios
3. Course categories (4-card grid with icons and descriptions)
4. Social proof (2-column: testimonial carousel + stats)
5. "How it works" (3-step process with illustrations)
6. CTA section with trial offer
7. Footer with quick links, newsletter signup, trust badges

**Dashboard** (Multi-section layout):
- Welcome header with user name, streak counter
- Quick stats (4-card row): Courses completed, Hours learned, Current streak, Achievements
- "Continue Learning" section (horizontal scrollable cards)
- Recommended courses (3-column grid)
- Leaderboard sidebar (optional, gamification)

**Course Module Page**:
- Fixed header with course title, progress bar
- Sidebar navigation (lesson list with completion checkmarks)
- Main content area (video/text/interactive elements)
- Bottom navigation (Previous/Next lesson buttons)

**Quiz Interface**:
- Progress indicator at top (Question 3 of 10)
- Question display (large, clear text)
- Answer options (full-width cards, stacked)
- Submit button, timer indicator
- Results screen with score, breakdown, retry option

## Navigation & Structure

**Hierarchy**:
- Global nav: Home, Courses, My Learning, Knowledge Base, Profile
- Dashboard subnav: Overview, In Progress, Completed, Achievements
- Persistent footer with support links and contact

This design creates an inviting, game-like learning environment that reduces cybersecurity anxiety while maintaining professional credibility through clear information architecture and progress systems.