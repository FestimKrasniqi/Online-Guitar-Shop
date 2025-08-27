
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./Footer.css";

export default function Footer() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="logo">VibeStrings</h2>
          <p>{t.footerDescription}</p>
        </div>

        <div className="footer-links">
          <a href="/">{t.brands}</a>
          <a href="#">{t.about}</a>
          <a href="#">{t.contact}</a>
        </div>

        <div className="footer-right">
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          <div className="language-switcher">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="al">Shqip</option>
            </select>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 VibeStrings. All rights reserved.</p>
      </div>
    </footer>
  );
}
