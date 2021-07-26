
import styles from './Footer.module.css';

const Footer = () => {
  return (
      <div className={styles.footer_container}>
        <p>Copyright @ 2021 Unwined Inc. All rights reserved.</p>
        <p>Privacy Policy</p>
        <a href='https://github.com/nicopierson'>
          <i className='fab fa-github'></i>
        </a>
        <a href='https://www.linkedin.com/in/nico-pierson/'>
          <i className='fab fa-linkedin'></i>
        </a>
        <p>Terms of Use</p>
        <p>United States</p>
      </div>
  );
};

export default Footer;