export default function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  AdjecentElement,
  inputTagRef,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-bold text-[#213458] px-2">
        {name}
      </label>
      <div
        className={`flex flex-row items-center gap-1 rounded-md border-2 overflow-hidden group ${
          error
            ? typeof error === "object" && error.length
              ? "border-red-300 focus-within:border-red-300"
              : "border-red-300 focus-within:border-red-300"
            : "border-slate-300 focus-within:border-[#213458]"
        }`}
      >
        <input
          className={`w-full text-lg  py-2 px-3 outline-none`}
          ref={inputTagRef}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></input>
        {AdjecentElement && AdjecentElement}
      </div>
      {error &&
        (typeof error === "object" && error.length ? (
          <>
            {error.map((e, i) => (
              <span
                key={i}
                className="bg-red-50 text-red-500 text-sm px-2 py-1 rounded-md"
              >
                {e}
              </span>
            ))}
          </>
        ) : (
          <span className="bg-red-50 text-red-500 text-sm px-2 py-1 rounded-md">
            {error}
          </span>
        ))}
    </div>
  );
}
