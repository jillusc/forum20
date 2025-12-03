# forum20

<B>forum20</B> is a social image-sharing app where visitors can explore, share and discuss 20th century artworks and enrich their knowledge of this vast, diverse and culturally significant era via a clean, responsive interface. The design aesthetic takes cues from modern gallery spaces: a light, minimalistic layout that keeps the focus on the images whilst offering familiar social-media features.

<img src="README%20images/main-image.jpg" width="800px">
<br>
The live app can be viewed here: <a href="https://unique-torrone-a1d6bb.netlify.app/">forum20</a>

## Overview

When the user arrives on the home page, forum20 displays a continuous feed of the newest posts submitted by members. Posts contain an image, a title and optional details such as artist name and year. Clicking a post opens a full view, showing the description and comment thread beneath it, offering users an easy way to explore and interact with the community. <br>
Once a visitor creates an account, users can access a range of social features: adding posts, commenting, liking, bookmarking, managing profiles and following other users. A personalised Feed page shows content exclusively from followed users, and the Activity page provides a quick way to review recent interactions.<br>
Navigation is fast and seamless because all routing is handled client-side.

The app includes the following areas:

- the Home page (stream of most recently added posts)
- a full post view with a comments section
- the Add Post page for uploading content
- user Profile pages
- the Feed page (stream of posts from followed users)
- the user's Activity page
- login, signup and account-management pages.

## Functionality

### Home page

The homepage loads all member posts newest first using infinite scroll: as the user reaches the bottom of the screen, more posts load automatically, allowing uninterrupted browsing without pagination.
A global search bar sits at the top of the layout, returning matching posts and profiles without requiring a page change. Results appear instantly and maintain the same clean layout as the main feed.
<br><br>
<img src="README%20images/home-page.jpg" width="800px">

### Post View

Clicking a post opens an enlarged layout focused on the individual artwork. The image sits beneath the post title, followed by content text and optional artist/year details. Underneath the post, the comments section shows ongoing conversation in a neatly structured thread. Users can like the post, bookmark it for later reference, and leave comments. All actions update immediately for a smooth experience.
<br><br>
<img src="README%20images/post-page.jpg" width="800px">

### Add Post Page

The Add Post page provides a simple form for uploading content to the app. Users can post an image, enter a title and content text, and add optional details. A checkbox allows posts to be marked as visible only to followers, offering a basic privacy option. On successful submission, the post is published instantly and displayed in the individual post view.

### Feed Page

As an alternative stream of content to that of the homepage, Feed is curated based on the user's connections, showing posts exclusively from profiles the user follows. This allows for a focused browsing experience with direct access to new, relevant content. The layout matches the Home feed complete with search bar and infinite scrolling.

### Activity Page

In the form of a grid of mini posts, the Activity page aggregates the user's past interactions: the likes and comments they have submitted and the posts they have bookmarked. The different categories are organised into tabs for convenience of navigation, and each item links straight back to its original post. Editing and removing/deleting actions remain available wherever appropriate.
<br><br>
<img src="README%20images/activity-page.jpg" width="800px">

### Profile Page

The Profile page is a personalised space for users to manage their account and their sitewide identity: they can easily update their profile image, username and bio; change their password, and view, edit and delete their submitted posts. The layout keeps content organised and accessible.
<br><br>
<img src="README%20images/profile-page.jpg" width="800px">

## Features

### Social platform experience

forum20 offers a complete set of features similar to a lightweight but fully interactive social network, typical of a standard React app:

- create, like and bookmark posts
- write comments and join discussions
- edit and delete own content and profile details
- follow and unfollow other users
- view a dedicated feed
- infinite scrolling for uninterrupted browsing
- instant client-side navigation.

### User accounts and profiles

Users can register, log in and stay logged in via secure token-based authentication. Each member has a profile that presents account-management options and displays their avatar, stats and optional bio, as well as their submitted posts.

### Responsive layout

The interface is built on Chakra UI's design system and adapts cleanly from mobile to larger screens. On mobiles, the header collapses into a burger menu and the sidebar switches to a simpler layout; the spacing adjusts and elements remain clear and accessible.

### Design

The visual design takes inspiration from a minimalist-style art gallery where works are exhibited against plain, white walls.

- a predominantly white base with soft charcoal text keeps the focus on the images and invites engagement
- accent colours in deep wine and gentle peach provide warmth and offset each other whilst maintaining the sense of sophistication key to the app's theme
- a single, modern typeface with rounded edges (Quicksand) maintains a cohesive look sitewide
- hover effects and transitions are subtle, keeping interactions smooth and understated
- the monochrome logo was designed to reflect the essence of modern art being defined by a number of styles and movements.

Loading skeletons show while posts and profiles are being fetched, providing visual cues that enhance user experience.

## Technical details

- built with React and TypeScript
- bundled with Vite
- styled with Chakra UI
- navigation handled with React Router
- HTTP requests made with Axios
- state managed using React hooks
- infinite scrolling handled through client-side event tracking.

This frontend is a modern rebuild of my original full-stack project. It connects to the existing Django REST API and Postgres database, and images continue to be served through Cloudinary. The backend and the database are both hosted on Render.

## Improvements

Displaying the enlarged post view as a modal rather than on a new page would align more with contemporary UI patterns, and avoid it looking somewhat lost amongst the whitespace on large screens.

Adding the the standard 'forgotten password' option, along with the ability for users to delete their account, would bring the app's user-management features in line with common expectations.

Extending uploads to include other file types (e.g. documents, video, audio) would significantly expand the scope of forum20, enabling users to share not only images but articles, exhibition news and reviews, book recommendations, podcasts and the like.

## Testing

forum20 was tested in Chrome, Firefox, Edge and Safari browsers. All core interactions behave as expected: posts load correctly, infinite scrolling triggers at the right points, likes update instantly, comments appear after submission and all forms validate as intended. The layout was checked at a variety of screen widths to confirm spacing, alignment and card behaviour remained consistent, and on mobile screens the sidebar reduces and repositions as intended.
HTML and CSS pass W3C validation. Lighthouse and axe DevTools were used to assess accessibility and performance.

## Deployment

The frontend is deployed through Netlify. Each push to the main branch triggers a redeploy, keeping the live site up to date. Build optimisation and asset delivery are handled automatically by Netlify, so the repository remains clean and focused on the source code.

## Credits

- UI components are powered by Chakra UI
- the font is provided by Google Fonts
- icons are from React Icons and Font Awesome
- general troubleshooting support from ChatGPT.
