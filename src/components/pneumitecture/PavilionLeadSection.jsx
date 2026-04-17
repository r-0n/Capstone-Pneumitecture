export default function PavilionLeadSection() {
  return (
    <section
      id="pavilion-lead"
      className="relative scroll-mt-24 border-b border-neutral-200 bg-white text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1400px] min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <header className="flex flex-col justify-between gap-8 border-b border-neutral-200 pb-10 md:flex-row md:items-start md:gap-12">
          <div className="max-w-3xl">
            <h1 className="font-sans text-[clamp(1rem,2.4vw,1.35rem)] font-semibold uppercase leading-[1.15] tracking-[0.02em] text-black">
              Pneumitecture
            </h1>
            <p className="mt-3 max-w-2xl font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-neutral-500 md:text-[11px]">
              Capstone Project: Soft Pneumatic Installation 
            </p>
          </div>
          <div className="flex shrink-0 items-start gap-4 md:flex-col md:items-end">
            
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-14 md:mt-14 md:grid-cols-12 md:gap-x-8 md:gap-y-12 lg:gap-x-12">
          <div className="md:col-span-6 lg:col-span-6">
            <div className="space-y-5 text-justify font-sans text-[13px] font-normal leading-[1.75] text-neutral-600 md:text-[14px] md:leading-[1.8] lg:text-left">
              <p>
                Pneumitecture is a responsive architectural installation composed
                of inflatable thermoplastic polyurethane (TPU) cells arranged within a modular grid.
                Through pneumatic actuation, the installation is designed to generate coordinated
                patterns of inflation and deflation, transforming the architectural surface into a
                dynamic system capable of movement and spatial expression.
              </p>
              <p>
                Rather than functioning as a static structure, the installation investigates how
                architecture can behave more like a living organism—expanding, contracting, and
                shifting over time. By orchestrating airflow through a network of solenoid valves,
                the system produces rhythmic spatial transformations that resemble breathing or
                pulsing behaviors.
              </p>
              <p>
                The project aims to explore how responsive environments can emerge from the
                integration of soft robotics, physical computing, and computational design tools.
                Through these technologies, the installation reimagines architecture as an active
                and performative medium that evolves in response to programmed temporal patterns.
              </p>
              <p>
                The design process involved both physical prototyping and computational simulation.
                Initial prototypes were developed to test pneumatic actuation using a small set of
                TPU cells. These tests informed the development of a digital simulation system used
                to explore spatial choreography and actuation sequences across a larger grid of
                cells.
              </p>
              <p>
                Ultimately, the project investigates how distributed pneumatic systems can generate
                expressive spatial behaviors and how motion can become a core element of
                architectural design.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <div className="space-y-8 font-sans text-[13px] md:text-[14px]">
              <div>
                <p className="font-semibold text-black">Team</p>
                <p className="mt-1.5 leading-relaxed text-neutral-600">
                  Aaron Wajah
                  <br />
                  Mariam Al Magboul
                </p>
              </div>
              <div>
                <p className="font-semibold text-black">Advisors</p>
                <p className="mt-1.5 leading-relaxed text-neutral-600">
                  Aya Riad
                  <br />
                  Aaron Sherwood
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-4">
            <div className="space-y-8 font-sans text-[13px] md:text-[14px]">
              <div>
                <p className="font-semibold text-black">Fabrication</p>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  Heat sealing
                  <br />
                  TPU fabric
                  <br />
                  Silicone Sealing
                  <br />
                  Aluminium rods
                  <br />
                  Carpentary
                  <br />
                  Air Pump
                </p>
              </div>
              <div>
                <p className="font-semibold text-black">Software</p>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  Arduino
                  <br />
                  Rhino + Grasshopper
                </p>
                <div className="mt-4 aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 shadow-sm md:-ml-10 lg:-ml-60">
                  <iframe
                    src="https://drive.google.com/file/d/1WeAxBJEg7rBfVf8Zh_8egIQhuaDbYUiG/preview"
                    title="Pneumitecture software video"
                    className="h-full w-full border-0"
                    allow="autoplay"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
