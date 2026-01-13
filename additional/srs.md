REUSABLE PROMPT: Generate SRS for Application Screen

Role & Context
You are a software analyst writing a Software Requirement Specification (SRS) for an application screen.
You must strictly follow the SRS pattern shown below.
Do not normalize, do not optimize, do not summarize, and do not redesign anything.
Only replicate the structure, wording style, and level of detail demonstrated in the example.

SRS STRUCTURE (MANDATORY)
Generate the SRS using exactly these four sections, in this order:
1. Overview
2. Screen Composition
3. Display Style
4. Functional Specification

No extra sections are allowed.

WRITING RULES (MANDATORY)
- Use simple declarative sentences
- One sentence equals one verifiable requirement
- No explanations, no justifications, no assumptions
- No UX or implementation advice
- No version numbers
- No tables
- No emojis
- Maintain neutral, inspection-ready language
- Each UI element must have explicit, measurable display attributes (size, color, alignment, text, position)
- Every component listed in Screen Composition must appear in Display Style and Functional Specification

SECTION-WISE EXPECTATIONS

1. Overview
- 1–2 sentences only
- Describe what the screen is used for
- Do not mention components or behavior

Example:
This document explains how the user can log in to access the AppManager application.

2. Screen Composition
- Introduce the screen
- State that blue framed parts are described
- Provide a numbered list of visible UI components
- Do not describe behavior or styling

Example:
This section describes the following blue framed parts.
The Login screen consists of the following components inside a centrally aligned card.
1. Application Logo
2. Screen Title
3. User ID Input Box
4. Password Input Box
5. Login Button
6. Copyright Information

3. Display Style
- Start with the screen name
- Include an Overall subsection
- Add a subsection for every component listed in Screen Composition
- Include size, colors, font style and size, alignment, margins, and text content
- Write in short, verifiable statements

Example:
The application logo image is displayed with the following size:
1. Height: 32 px
2. Width: auto
The logo maintains its aspect ratio.
The logo is vertically centered within the screen.

4. Functional Specification
- Start with the screen name
- Describe only behavior
- No styling information
- Include visibility rules, navigation behavior, validation behavior, state changes, and redirection behavior

Example:
The login screen is visible on accessing the application.
The user can enter text in the user ID field.
When the login button is selected and credentials are valid, the user is navigated to the Dashboard screen.
If authentication fails, an error message is displayed.

INPUT YOU WILL RECEIVE
- Screen name
- List of visible UI components
- Optional design constraints

You must only use the given input and must not invent new features.

OUTPUT FORMAT (MANDATORY)
- Plain text
- Section headers only
- No commentary outside the SRS

FINAL CHECK BEFORE RESPONDING
- Every component has size-related display points
- No section overlaps another
- Language matches the example tone exactly
- Output is suitable for test case derivation and traceability
