# UI/UX Refactor Prompt: Base Voting Mini App

You are a Senior Frontend Engineer and UI/UX Designer specializing in **Mobile-First Web3 Applications**.

## Objective
Refactor the current Next.js application to look like a polished, native "Base Mini App". 
The logic (Wagmi, OnchainKit functionality) MUST remain untouched. Your goal is purely styling and layout enhancement using **Tailwind CSS** and **Shadcn UI**.

## Design System & Theme
- **Primary Color:** Base Blue (`bg-blue-600` / `#0052FF`) for primary actions.
- **Background:** Light Gray (`bg-gray-50`) for the app background to make white cards pop.
- **Typography:** Clean Sans-Serif (Inter or System).
- **Radius:** Heavy rounding (`rounded-2xl` or `rounded-3xl`) to match the "Crypto Mobile" aesthetic.
- **Spacing:** Generous padding to account for "fat finger" tapping on mobile devices.

## Specific Component Instructions

### 1. Global Layout (`app/layout.tsx` / `page.tsx`)
- **Background:** Ensure the entire page has `min-h-screen bg-gray-50`.
- **Container:** Limit the content width to `max-w-md` (mobile width) and center it (`mx-auto`).
- **Typography:** Apply `antialiased text-gray-900`.

### 2. Navbar (`components/Navbar.tsx`)
- Make it **Sticky** at the top (`sticky top-0 z-50`).
- Apply a **Glassmorphism** effect (`bg-white/80 backdrop-blur-md border-b border-gray-200`).
- **Logo:** Use a bold font for "VOTE APP". Make "VOTE" Blue (`text-blue-600`) and "APP" Black.
- **Wallet:** Ensure the OnchainKit wallet component is aligned to the right.

### 3. Create Poll Card (`components/CreatePoll.tsx`)
- Wrap the form in a **Shadcn Card** with `shadow-sm border-gray-200`.
- **Inputs:**
  - Use `bg-gray-50 border-gray-200 focus:ring-blue-600` for input fields.
  - Add a subtle transition on focus.
- **Button:**
  - The `<TransactionButton />` should look like a primary CTA.
  - Style: `w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95`.

### 4. Poll Card (`components/PollCard.tsx`)
This is the most important component. It needs to look interactive.
- **Card Container:** White background, `rounded-2xl`, `shadow-sm`, `border border-gray-100`.
- **Header:**
  - Title: `font-bold text-lg leading-tight`.
  - Creator Tag: A small pill badge (`text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full`).
- **Description:** `text-gray-500 text-sm mt-2`.
- **Results Visualization:**
  - Instead of just text, use a **Progress Bar**.
  - Example: A gray bar (`h-2 bg-gray-100 rounded-full`) with a colored overlay based on %.
- **Voting Buttons:**
  - Use a Grid Layout (`grid grid-cols-2 gap-3`).
  - **Yes Button:** White background with Green border/text (`border-green-500 text-green-600 hover:bg-green-50`).
  - **No Button:** White background with Red border/text (`border-red-500 text-red-600 hover:bg-red-50`).
  - **Active State:** When clicked/loading, show a spinner or opacity change.

## 5. Empty States & Loading
- If the poll list is empty, show a centered "No active polls" state with a muted icon (use `lucide-react`).
- Add a "Skeleton" loader effect while data is fetching.

## Execution
Please rewrite the `components/Navbar.tsx`, `components/CreatePoll.tsx`, and `components/PollCard.tsx` code with these styles applied. Keep all `OnchainKit` logic intact.