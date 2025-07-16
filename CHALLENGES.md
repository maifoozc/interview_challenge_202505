Your task is to understand the codebase and complete the tasks.

**Getting Started with the Challenge**

**Step 1: Repository Setup**

1. Fork this repository to your GitHub account
2. Make your forked repository **private**
3. Add the following collaborators to your private repository, only after you are ready to share the solution with us:
   - GitHub username: `rohitshetty`
   - GitHub username: `sachinbat`
4. Clone your forked repository locally
5. Follow the setup instructions in `README.md` to get the project running on your machine

**Step 2: Work on the Challenges**

1. **Fix Known Issues**

   - Address all 4 bug reports in order
   - Document your findings and solutions for each fix
   - Test thoroughly to ensure the fixes work as expected

2. **Implement New Features**
   - Build the "Favorite Notes" feature
   - Write up a detailed technical design for the "Comprehensive Search" feature

**Step 3: Code Quality & Version Control**

- Make frequent, meaningful commits
- Each commit message should:
  - Be clear and concise
  - Explain the purpose of the changes
  - Follow git commit message best practices
- Keep commits focused and atomic (one logical change per commit)

**Step 4: Submission**

1. Ensure all your code is pushed to your private repository
2. Record a walkthrough video (using Loom):
   - Explain your understanding of the codebase
   - Walk through each bug fix you implemented
   - Demonstrate the new features you added
   - Showing your face is optional but recommended for better communication
   - Keep it concise but thorough

**Step 5: Final Submission**

Submit your answer to the google form you have been sent on your email:
Make sure to

1. Fill all required fields
2. Link to your private GitHub repository (don't forget to add us to the repo with view access)
3. Link to your Loom walkthrough video
4. Any additional notes or documentation you think would be helpful

Additionally, you can reply to the email (Please use REPLY ALL feature) with confirmation that you have submitted the form.

## Known Issues (To Be Fixed)

### 1. User Feedback Bug Report

We've received some user complaints that their notes aren't all showing up - for example, someone mentioned they had around 100 notes, but could only access a small handful on the interface.

It's unclear whether this is a backend or frontend issue (or both), so you'll need to dig into it and identify the root cause.

Once you've fixed the problem, take a pass at improving the overall usability of that page - it currently feels confusing.

### 2. UI Glitch After Note Creation

There's a weird behavior happening with the "Create Note" button. After a user creates a note and then immediately tries to create another one, the new note form seems to blink or disappear almost instantly - like it opens and closes right away.

This isn't consistent with how it should work. You should be able to create multiple notes one after the other without having to reload the page or jump through hoops.

Look into what might be causing this - is it a timing thing? State not resetting? Something with focus or rendering?

Fix it so that the flow feels smooth and users can create notes continuously without issues.

### 3. Wrong Timestamp on New Notes

A few users noticed something odd: when they create a note, the timestamp shown on the card says "Yesterday" - even though they just made it.

That's definitely not expected. The note was created today, so it shouldn't be labeled as "Yesterday."

Can you figure out what's going wrong here and fix it? It could be a timezone thing, or maybe some formatting issue. Once it's fixed, double-check that newly created notes reflect the correct relative time (e.g., "Just now", "5 minutes ago", etc.).

### 4. We've received a heads-up that there might be a security vulnerability (or unintended access path) in how the note detail view is implemented.

There aren't any specific repro steps, but the concern is that users might be able to view or access notes they shouldn't be able to - for example, by manipulating the URL or API calls.

Your task:
Investigate how note access control is currently handled.
Identify whether there's indeed a security issue (e.g. unauthorized access, missing ownership checks, etc.).
Patch it so that users can only view their own notes.

If relevant, apply the same fix pattern to any related views.

## Feature Requirements (To Be Implemented)

These features are requested but not yet implemented:

### 1. Feature Request – Favorite Notes

Some users have asked for a way to quickly mark their important notes - kind of like a "favorite" or "star" feature.

- Each note should be "star-able".
- Toggling the star should update the note.
- Add visual indication (e.g. star icon) for starred notes.
- Modify the list view so that **starred notes appear first**.

Make assumptions, if any missing details, and document that in your response.

### 2. Product Thinking – Comprehensive Search (Out of Scope to Implement)

Let's say we wanted to create a search notes feature - something that feels fast, accurate, and helpful even for users with thousands of notes.

If we were to build a comprehensive search experience, how would you approach it? Don't worry about writing code - instead, walk us through how you'd design the feature end-to-end (both from a product and technical perspective).

Bonus: any ideas for making search feel smart or delightful for users?

Write this like you're laying out a plan for your team. Diagrams or bullet points are fine - no need to be overly formal.
