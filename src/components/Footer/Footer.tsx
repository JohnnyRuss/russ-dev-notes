type FooterT = {
  className?: string;
};

const Footer: React.FC<FooterT> = ({ className }) => {
  return (
    <footer
      className={`pt-4 sm:pt-12 pb-4 px-2 md:px-12 text-gray-tint text-sm flex items-center justify-between gap-2 ${className}`}
    >
      <p className="flex items-center">
        <span className="text-2xl">&copy;</span>
        <span>All Rights Reserved 2024 / Joni Rusieshvili</span>
      </p>

      <p>
        <a
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          href="https://joni-rusieshvili-personal-portfolio.vercel.app"
          className="underline"
        >
          Personal Portfolio
        </a>
      </p>
    </footer>
  );
};

export default Footer;
