'use client';

import React from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={styles.copyright}>
            © {currentYear} <span>SkyCast</span>. Built with Next.js & Redux.
          </p>
        </div>

        <div className={styles.links}>
          <a
            href="https://github.com/AARON-FOX/weather-and-city-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>

          <div className={styles.divider} />

          <div className={styles.socials}>
            <a
              href="https://linkedin.com/in/artem-vikuliev/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://t.me/artem_job_front_end"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
            >
              <Send size={20} />
            </a>
            <a href="mailto:vikulievartem675@gmail.com" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
