// This component shows a simple footer at the bottom of the website.
// I made it lightweight because the footer shouldn't distract the user.

function Footer() {
  return (
    <footer className="text-center p-3 mt-5 bg-light border-top">
      <p className="mb-0">
        © {new Date().getFullYear()} UniRooms — All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;