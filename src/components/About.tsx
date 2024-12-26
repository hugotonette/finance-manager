const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 mx-auto pt-8 px-8 h-5/6 max-w-lg text-gray-800 dark:text-gray-100">
        <h1 className="font-serif font-bold text-2xl">About US</h1>
        <span className="text-center space-y-2">
          <p>At CashFlow, we believe in the power of financial clarity.</p>
          <p>
            Our app is designed to give you a simple yet powerful way to manage
            your expenses. With intuitive features that allow you to categorize,
            track, and visualize your spending by date or category, CashFlow
            makes budgeting easier than ever.
          </p>
          <p>
            Empower yourself to make smarter financial decisions and gain
            insights into your spending habits with just a few taps.
          </p>
        </span>
        <h1 className="font-serif font-bold text-2xl pt-8">Contact Us</h1>
        <p>cash@flow.com</p>
      </div>
    </>
  );
};

export default About;
