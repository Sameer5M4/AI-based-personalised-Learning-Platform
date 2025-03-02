export default function AuthImage({ imageUrl, altText }) {
    return (
      <div className="hidden lg:flex w-1/2 h-[550px] bg-gray-100 rounded-xl">
        <img src={imageUrl} alt={altText} className="object-cover rounded-xl" />
      </div>
    );
  }
   