const EmptyBlogFigure: React.FC = () => {
  return (
    <figure className="w-[85%] mx-auto h-[75svh] flex justify-center items-center">
      <img
        src="/assets/blog.webp"
        alt=""
        className="object-contain w-full xl:w-1/2"
      />
    </figure>
  );
};

export default EmptyBlogFigure;
