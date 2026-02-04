function AwardsSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-2">

          <CommonTitle
            align="center"
            pill={false}
            title='Our'
            gradientText='Awards & Recognitions'
            subtitle='These recognitions reflect our commitment to quality, innovation,
            and long‑term partnerships with our clients.'
          />
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
          <Image
            src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (1).png"
            alt="award1"
            width={150}
            height={80}
          />
          <Image
            src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (2).png"
            alt="award2"
            width={150}
            height={80}
          />
          <Image
            src="/images/award/Black And Gold Modern Award Ceremony Instagram Post (4).png"
            alt="award3"
            width={150}
            height={80}
          />
          <Image
            src="/images/award/Goodfirms award-softkingo.png"
            alt="award4"
            width={150}
            height={80}
          />
          <Image
            src="/images/award/techbeheb.png"
            alt="award4"
            width={150}
            height={80}
          />
        </div>
      </div>
    </section>
  );
}