// Reusable size picker (S, M, L, XL)
export default function SizeSelector({ value, onChange, sizes=["S","M","L","XL"] }){
  return (
    <div className="chips" role="group" aria-label="Select size">
      {sizes.map(sz=>(
        <button
          key={sz}
          className={`chip ${value===sz?"active":""}`}
          type="button"
          onClick={()=>onChange(sz)}
        >{sz}</button>
      ))}
    </div>
  );
}