import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "Best Sellers", url: "#" },
        { text: "Offers & Deals", url: "#" },
        { text: "Contact Us", url: "#" },
        { text: "FAQs", url: "#" },
      ],
    },
    {
      title: "Need Help?",
      links: [
        { text: "Delivery Information", url: "#" },
        { text: "Return & Refund Policy", url: "#" },
        { text: "Payment Methods", url: "#" },
        { text: "Track your Order", url: "#" },
        { text: "Contact Us", url: "#" },
      ],
    },
    {
      title: "Follow Me",
      links: [
        { text: "Instagram", url: "https://www.instagram.com/gourab_sr4/" },
        { text: "X", url: "https://x.com/ExplorerGourab" },
        { text: "Facebook", url: "https://facebook.com/gourabsr4" },
        { text: "Github", url: "https://github.com/gourabofficial" },
        { text: "Linkedin", url: "https://www.linkedin.com/in/gourab-ganguly/" },
      ],
    },
  ];

  return (
    <div className="w-full bg-primary/10 mt-16">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
          {/* Logo and Description */}
          <div>
            <img
              className="w-34 md:w-32"
              src={assets.logo_3}
              alt="dummyLogoColored"
            />
            <p className="max-w-[410px] mt-6">
              Welcome to our grocery store! We offer a wide range of fresh
              produce, quality products, and unbeatable deals to make your
              shopping experience delightful. Shop with us and enjoy the best
              service.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            {linkSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.url.startsWith("http") ? (
                        // External links
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition"
                        >
                          {link.text}
                        </a>
                      ) : (
                        // Internal links
                        <Link
                          to={link.url}
                          className="hover:underline transition"
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        
        <p className="py-4 text-center text-sm md:text-base text-gray-500">
          Copyright {new Date().getFullYear() } © Grocery Store. All Right Reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
