const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 mx-auto pt-8 px-5 h-5/6 max-w-xs text-gray-800 dark:text-gray-100">
        <h1 className="font-serif font-bold text-2xl">About US</h1>
        <p className="text-justify">
          At CashFlow, we believe in the power of financial clarity. Our app is
          designed to give you a simple yet powerful way to manage your
          expenses. With intuitive features that allow you to categorize, track,
          and visualize your spending by date or category, CashFlow makes
          budgeting easier than ever. Empower yourself to make smarter financial
          decisions and gain insights into your spending habits with just a few
          taps.
        </p>
        <h1 className="font-serif font-bold text-2xl pt-8">Contact Us</h1>
        <p>cash@flow.com</p>
      </div>
    </>
  );
};

export default About;
