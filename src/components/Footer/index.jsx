import React from 'react';
import s from './style.module.css';
import { Link } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <h1>Contacts</h1>
        <div className={s.contacts}>
          <div className={s.contacts_item}>
            <div className={s.background}>
              <h2>Phone</h2>
              <a className={s.phone} href="tel:++7 (499) 350-66-04">
                +7 (499) 350-66-04
              </a>
            </div>
            <div className={s.background}>
              <h2>Address</h2>
              <Link
                className={s.link}
                target="_blank"
                to="https://www.google.com/search?q=ithub"
              >
                Mira prospekt, 119-332, Pavilion Cifra-1, Cifra-2
              </Link>
            </div>
          </div>

          <div className={s.contacts_addres}>
              <div className={s.background}>
                <h2>Socials</h2>
                <div className={s.soc_networks}>
                  <Link
                    className={s.icon}
                    to={'https://t.me/ithubnews'}
                    target="_blank"
                  >
                    <TelegramIcon sx={{ fontSize: 50, color: 'black' }} />
                  </Link>
                  <Link
                    className={s.icon}
                    to={'https://api.whatsapp.com/send/?phone=79855583470&text&type=phone_number&app_absent=0'}
                    target="_blank"
                  >
                    <WhatsAppIcon sx={{ fontSize: 50, color: 'black' }} />
                  </Link>
                </div>
              </div>

            <div className={s.background}>
              <div className={s.schedule}>
                <p>
                  {' '}
                  <h2>Working Hours:</h2> <span>24 hours a day</span>
                </p>
              </div>
            </div>
            
          </div>
        </div>
        <div className={s.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.1604999727714!2d37.6314142886553!3d55.83545298178839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b537ec1726f173%3A0x889fc9c892bac981!2z0KLQtdGF0L3QvtCz0YDQsNC0!5e0!3m2!1sru!2sru!4v1706165137838!5m2!1sru!2sru"
            title="tel_ran"
            width="100%"
            height="425px"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
