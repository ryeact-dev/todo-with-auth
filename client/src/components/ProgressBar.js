const ProgressBar = ({ progress }) => {
  const colors = ["#1b5a8d", "#1fa553", "#b43333", "#d4b500", "#6d1b8d"];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
      <div className='w-[150px] h-[14px] bg-slate-300 overflow-hidden my-[10px] rounded-full'>
        <div
          className='h-[14px]'
          style={{ width: `${progress}%`, backgroundColor: randomColor }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
