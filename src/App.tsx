import Navbar from './components/Navbar'

const galleryImages = [
  { id: 1011, alt: 'Mountain road' },
  { id: 1015, alt: 'Forest stream' },
  { id: 1025, alt: 'Puppy portrait' },
  { id: 1043, alt: 'City skyline at night' },
  { id: 1059, alt: 'Lake at sunset' },
  { id: 1074, alt: 'Snowy peaks' },
]

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        <section
          id="home"
          className="flex flex-col items-center gap-10 md:flex-row md:text-left"
        >
          <img
            className="aspect-[4/3] w-full max-w-sm rounded-xl object-cover shadow-lg md:w-80"
            src="https://picsum.photos/id/1005/800/600"
            alt="Portrait placeholder"
            width={800}
            height={600}
          />
          <div className="text-center md:text-left">
            <h1 className="mb-3 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
              Hi, I'm Daniel
            </h1>
            <p className="max-w-md leading-relaxed">
              Welcome to my portfolio. I'm learning React + TypeScript by
              building this site from scratch.
            </p>
          </div>
        </section>

        <section id="gallery">
          <h2 className="mb-5 text-2xl font-medium text-neutral-900 dark:text-neutral-100">
            Some images
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {galleryImages.map((img) => (
              <img
                key={img.id}
                src={`https://picsum.photos/id/${img.id}/400/300`}
                alt={img.alt}
                width={400}
                height={300}
                loading="lazy"
                className="h-50 w-full rounded-lg object-cover transition-transform duration-200 hover:-translate-y-1"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
