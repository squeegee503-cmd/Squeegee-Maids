const items = [
  {
    img: 'https://images.pexels.com/photos/3802528/pexels-photo-3802528.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Exterior Detail',
    tag: 'Hand Wash',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    img: 'https://images.pexels.com/photos/3831391/pexels-photo-3831391.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Interior Detail',
    tag: 'Deep Clean',
    span: '',
  },
  {
    img: 'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Ceramic Coating',
    tag: 'Protection',
    span: '',
  },
  {
    img: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Paint Correction',
    tag: 'Gloss',
    span: '',
  },
  {
    img: 'https://images.pexels.com/photos/5870297/pexels-photo-5870297.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Showroom Finish',
    tag: 'Full Detail',
    span: '',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-pink-500">Portfolio</span>
          <h2 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">THE GALLERY</h2>
          <p className="mt-4 text-lg text-ink-500">
            A look at recent detailing projects we&apos;ve delivered across the Portland metro area.
          </p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl ${item.span}`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block rounded-full bg-pink-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {item.tag}
                </span>
                <h3 className="mt-2 font-display text-2xl tracking-wide text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
