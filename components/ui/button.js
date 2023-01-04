import Link from 'next/link';

export default function Button(props) {
  if (props.link) {
    return (
      <Link
        className="relative inline-block px-5 py-2 overflow-hidden font-medium text-purple-500 bg-purple-100 rounded group"
        href={props.link}
      >
        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
        <span className="relative group-hover:text-white">
          {props.children}
        </span>
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className="relative inline-block px-5 py-2 overflow-hidden font-medium text-purple-700 bg-purple-100 rounded group"
    >
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
      <span className="relative group-hover:text-white"> {props.children}</span>{' '}
    </button>
  );
}
