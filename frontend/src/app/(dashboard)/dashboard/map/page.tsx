export default function Map() {
  return (
    <div className="size-full p-6">
      <div className="h-[300px] w-full overflow-hidden rounded-3xl bg-secondary border-2 border-secondary">
        <iframe
          src={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004883842!2d77.04417347155065!3d28.52725273882469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1710504987437!5m2!1sen!2sin"
          }
          width="1200"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <div className="mt-6 flex items-end gap-2">
        <h2 className="font-heading text-6xl">London</h2>
        <p className="mb-1 font-heading text-3xl">, England</p>
      </div>
    </div>
  )
}
